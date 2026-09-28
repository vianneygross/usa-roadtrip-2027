// Données de l'itinéraire — Roadtrip Côte Ouest USA, 6 au 23 mai 2027
// driveHours = temps de route estimé depuis l'étape précédente (en heures, hors pauses)
const TRIP = {
  title: "Roadtrip Côte Ouest USA",
  subtitle: "6 → 22 mai 2027 · 17 jours",
  totalDays: 17,
  steps: [
    {
      id: 1,
      dates: "6 mai",
      dayLabel: "J1",
      title: "Los Angeles",
      desc: "Arrivée & repos à Santa Monica. Point de départ du roadtrip.",
      coords: [34.0089, -118.4965],
      driveHours: null,
      driveLabel: "Arrivée",
      hotel: { checkin: "6 mai", checkout: "7 mai", nights: 1 }
    },
    {
      id: 2,
      dates: "7 mai",
      dayLabel: "J2",
      title: "Las Vegas + Valley of Fire",
      desc: "Détour par le Valley of Fire State Park (roches rouges) avant Las Vegas.",
      coords: [36.1699, -115.1398],
      driveHours: 4,
      driveLabel: "≈ 4h",
      hotel: { checkin: "7 mai", checkout: "8 mai", nights: 1 }
    },
    {
      id: 3,
      dates: "8 mai",
      dayLabel: "J3",
      title: "Page, AZ (Horseshoe Bend)",
      desc: "Le fameux méandre du Colorado en forme de fer à cheval.",
      coords: [36.9147, -111.4558],
      driveHours: 4.5,
      driveLabel: "≈ 4h30",
      hotel: { checkin: "8 mai", checkout: "9 mai", nights: 1 }
    },
    {
      id: 4,
      dates: "9 mai",
      dayLabel: "J4",
      title: "Antelope Canyon → Monument Valley",
      desc: "Visite d'Antelope Canyon le matin, puis route vers Monument Valley.",
      coords: [36.9980, -110.0980],
      driveHours: 2,
      driveLabel: "≈ 2h",
      hotel: { checkin: "9 mai", checkout: "10 mai", nights: 1 }
    },
    {
      id: 5,
      dates: "10-11 mai",
      dayLabel: "J5-6",
      title: "Grand Canyon",
      desc: "Découverte du South Rim du Grand Canyon (2 nuits pour profiter du lever/coucher de soleil et des rim trails).",
      coords: [36.0544, -112.1401],
      driveHours: 2.5,
      driveLabel: "≈ 2h30",
      hotel: { checkin: "10 mai", checkout: "12 mai", nights: 2 }
    },
    {
      id: 6,
      dates: "12 mai",
      dayLabel: "J7",
      title: "Joshua Tree National Park",
      desc: "Étape pour couper la route vers Santa Barbara, via la mythique Route 66 : Williams, Seligman, Kingman.",
      coords: [33.8734, -115.9010],
      driveHours: 6,
      driveLabel: "≈ 6h",
      hotel: { checkin: "12 mai", checkout: "13 mai", nights: 1 },
      waypoints: [
        { name: "Williams", coords: [35.2494, -112.1901] },
        { name: "Seligman", coords: [35.3256, -112.8757] },
        { name: "Kingman", coords: [35.1894, -114.0530] }
      ]
    },
    {
      id: 7,
      dates: "13 mai",
      dayLabel: "J8",
      title: "Santa Barbara",
      desc: "Halte californienne en bord de mer.",
      coords: [34.4208, -119.6982],
      driveHours: 3.75,
      driveLabel: "≈ 3h30-4h",
      hotel: { checkin: "13 mai", checkout: "14 mai", nights: 1 }
    },
    {
      id: 8,
      dates: "14-15 mai",
      dayLabel: "J9-10",
      title: "Big Sur",
      desc: "Côte spectaculaire le long de la Highway 1.",
      coords: [36.2704, -121.8081],
      driveHours: 3.5,
      driveLabel: "≈ 3h30",
      hotel: { checkin: "14 mai", checkout: "16 mai", nights: 2 }
    },
    {
      id: 9,
      dates: "16-18 mai",
      dayLabel: "J11-13",
      title: "San Francisco",
      desc: "Golden Gate, quartiers emblématiques, baie de SF.",
      coords: [37.7749, -122.4194],
      driveHours: 3,
      driveLabel: "≈ 3h",
      hotel: { checkin: "16 mai", checkout: "19 mai", nights: 3 }
    },
    {
      id: 10,
      dates: "19-22 mai",
      dayLabel: "J14-17",
      title: "Los Angeles (retour)",
      desc: "Retour à Los Angeles, fin du roadtrip le 22 au soir.",
      coords: [34.0522, -118.2437],
      driveHours: 5.5,
      driveLabel: "≈ 5h30",
      hotel: { checkin: "19 mai", checkout: "22 mai", nights: 3 }
    }
  ]
};
