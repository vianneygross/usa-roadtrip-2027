(function () {
  const steps = TRIP.steps;

  document.getElementById("trip-subtitle").textContent = TRIP.subtitle;

  // --- Stats header ---
  const totalDrive = steps.reduce((sum, s) => sum + (s.driveHours || 0), 0);
  const h = Math.floor(totalDrive);
  const m = Math.round((totalDrive - h) * 60);
  const totalDriveLabel = m > 0 ? `≈ ${h}h${m.toString().padStart(2, "0")}` : `≈ ${h}h`;

  document.getElementById("header-stats").innerHTML = `
    <span class="stat-pill">📍 ${steps.length} étapes</span>
    <span class="stat-pill">🚗 ${totalDriveLabel} de route</span>
    <span class="stat-pill">🗓️ ${TRIP.totalDays} jours</span>
  `;

  // --- Map init ---
  const map = L.map("map", { scrollWheelZoom: true }).setView([37, -116], 5);

  L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
    maxZoom: 19,
    attribution: "Tiles &copy; Esri &mdash; Source: Esri, HERE, Garmin, USGS, Intermap"
  }).addTo(map);

  const markers = [];
  const latlngsForBounds = [];

  function numberedIcon(n) {
    return L.divIcon({
      className: "",
      html: `<div class="marker-num">${n}</div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -14]
    });
  }

  function waypointIcon() {
    return L.divIcon({
      className: "",
      html: `<div class="waypoint-dot"></div>`,
      iconSize: [10, 10],
      iconAnchor: [5, 5]
    });
  }

  // Ordre des points pour le tracé réel (inclut les arrêts Route 66)
  const routeCoords = [];
  steps.forEach((step) => {
    if (step.waypoints) {
      step.waypoints.forEach((wp) => routeCoords.push(wp.coords));
    }
    routeCoords.push(step.coords);
  });

  // Trace le vrai itinéraire routier via OSRM (service de démo public, gratuit, sans clé API)
  // Repli en ligne droite pointillée si une portion échoue.
  async function drawRoadRoute() {
    for (let i = 0; i < routeCoords.length - 1; i++) {
      const start = routeCoords[i];
      const end = routeCoords[i + 1];
      const fallback = () =>
        L.polyline([start, end], {
          color: "#ff7a45",
          weight: 3,
          dashArray: "8 6",
          opacity: 0.6
        }).addTo(map);

      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`;
        const res = await fetch(url);
        const json = await res.json();
        if (json.code === "Ok" && json.routes && json.routes[0]) {
          const latlngs = json.routes[0].geometry.coordinates.map((c) => [c[1], c[0]]);
          L.polyline(latlngs, { color: "#ff7a45", weight: 4, opacity: 0.85 }).addTo(map);
        } else {
          fallback();
        }
      } catch (e) {
        fallback();
      }
    }
  }

  drawRoadRoute();

  function hotelLabel(step) {
    if (!step.hotel) return "";
    const n = step.hotel.nights;
    const nightsText = n === 1 ? "1 nuit" : `${n} nuits`;
    return `🏨 Nuits du ${step.hotel.checkin} au ${step.hotel.checkout} (${nightsText})`;
  }

  steps.forEach((step, idx) => {
    const marker = L.marker(step.coords, { icon: numberedIcon(idx + 1) }).addTo(map);
    marker.bindPopup(`
      <div class="popup-date">${step.dates}</div>
      <div class="popup-title">${step.title}</div>
      <div class="popup-desc">${step.desc}</div>
      ${step.driveLabel ? `<div class="popup-desc" style="margin-top:6px;">🚗 ${step.driveLabel} depuis l'étape précédente</div>` : ""}
      ${step.hotel ? `<div class="popup-desc" style="margin-top:4px;">${hotelLabel(step)}</div>` : ""}
    `);
    markers.push(marker);
    latlngsForBounds.push(step.coords);

    // Route 66 waypoints (small dots), if any
    if (step.waypoints) {
      step.waypoints.forEach((wp) => {
        const wm = L.marker(wp.coords, { icon: waypointIcon() }).addTo(map);
        wm.bindPopup(`<div class="popup-title">${wp.name}</div><div class="popup-desc">Arrêt Route 66</div>`);
        latlngsForBounds.push(wp.coords);
      });
    }
  });

  map.fitBounds(L.latLngBounds(latlngsForBounds), { padding: [40, 40] });
  setTimeout(() => map.invalidateSize(), 200);

  // --- Timeline sidebar ---
  const timelineEl = document.getElementById("timeline");
  let html = "";

  steps.forEach((step, idx) => {
    if (idx > 0) {
      html += `
        <div class="step-connector">
          <span class="drive-badge">🚗 ${step.driveLabel}</span>
        </div>
      `;
    }
    html += `
      <div class="step-card" data-idx="${idx}">
        <div class="step-card-top">
          <div class="step-badge">${idx + 1}</div>
          <div class="step-titles">
            <div class="step-date">${step.dates} · ${step.dayLabel}</div>
            <div class="step-title">${step.title}</div>
          </div>
        </div>
        <p class="step-desc">${step.desc}</p>
        ${step.hotel ? `<p class="step-hotel">${hotelLabel(step)}</p>` : ""}
      </div>
    `;
  });

  timelineEl.innerHTML = html;

  const cards = Array.from(timelineEl.querySelectorAll(".step-card"));

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const idx = parseInt(card.dataset.idx, 10);
      cards.forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
      map.flyTo(steps[idx].coords, 8, { duration: 0.8 });
      markers[idx].openPopup();
    });
  });

  // Sync map marker click -> highlight card
  markers.forEach((marker, idx) => {
    marker.on("click", (e) => {
      if (e.originalEvent) e.originalEvent.stopPropagation();
      cards.forEach((c) => c.classList.remove("active"));
      cards[idx].classList.add("active");
      openDrawer();
      cards[idx].scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  // --- Tiroir dépliable (footer) ---
  const drawer = document.getElementById("timeline-drawer");
  const drawerToggle = document.getElementById("drawer-toggle");

  function openDrawer() {
    drawer.classList.add("expanded");
    drawerToggle.setAttribute("aria-expanded", "true");
  }

  function closeDrawer() {
    drawer.classList.remove("expanded");
    drawerToggle.setAttribute("aria-expanded", "false");
  }

  drawerToggle.addEventListener("click", () => {
    if (drawer.classList.contains("expanded")) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  // Ferme le tiroir si on clique ailleurs (ex: sur la carte)
  document.addEventListener("click", (e) => {
    if (drawer.classList.contains("expanded") && !drawer.contains(e.target)) {
      closeDrawer();
    }
  });
})();
