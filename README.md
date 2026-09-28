# 🇺🇸 Roadtrip Côte Ouest USA — 6 → 22 mai 2027

Carte interactive statique (HTML/CSS/JS, aucune dépendance de build) pour visualiser l'itinéraire du roadtrip étape par étape, avec temps de route entre chaque étape et nuits d'hôtel à réserver.

## Aperçu

- Carte plein écran (Leaflet + tuiles Esri, gratuit, sans clé API)
- Tracé du vrai itinéraire routier via [OSRM](https://project-osrm.org/) (service de démo public, gratuit)
- Tiroir dépliable en bas avec la timeline des 10 étapes (dates, description, temps de route, nuits d'hôtel)
- 100% statique, hébergeable n'importe où (GitHub Pages, Netlify, Vercel...)

## Fichiers

- `index.html` — page principale
- `style.css` — styles
- `script.js` — logique carte + timeline
- `data.js` — données de l'itinéraire (étapes, coordonnées, temps de route, nuits d'hôtel)
- `serve.ps1` — petit serveur local PowerShell pour prévisualiser sans Python/Node

## Héberger sur GitHub Pages

1. Aller dans **Settings → Pages** du repo
2. Source : **Deploy from a branch**, branche `main`, dossier `/ (root)`
3. La page sera disponible à `https://vianneygross.github.io/usa-roadtrip-2027/`

## Prévisualiser en local

```powershell
powershell -ExecutionPolicy Bypass -File serve.ps1 -Port 8731
```

Puis ouvrir `http://localhost:8731/index.html`.
