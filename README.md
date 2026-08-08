# Marathasa Valley & Kykkos Day Trip

An interactive, mobile-first travel guide for a one-day road trip and walking
itinerary in the Troodos mountains of Cyprus:

**Polis → Moutoullas → Kalopanayiotis → Kykkos Monastery → Throni / Tomb of
Archbishop Makarios III → Paphos Forest → Polis**

It is designed to be used on an iPhone while actually travelling: glance at it,
see where you are, learn why the place matters, see what to look for, and tap
one button to navigate to the next location.

---

## What it does

| Section | Purpose |
|---|---|
| **Map** | Leaflet + OpenStreetMap. Numbered pins in itinerary order, categorised markers (parking, church, history, water, viewpoint, food, optional), filter chips, and popups with a Navigate button and a jump-to-itinerary link. |
| **Itinerary** | The full day hour by hour, with drive legs, parking, opening-hours warnings, a step-by-step Kalopanayiotis walking route (short/full modes), and layered history on every sight. |
| **Now** | The current stop, what to see here, computed daylight remaining, the next destination, and a one-tap Navigate button. |
| **Learn** | The editorial/history layer, organised by destination. |
| **Checklist** | Every essential sight, tickable, with progress. |

Other features:

- **Progressive disclosure** — a short "quick view" on every sight, with a
  *Tell me more* accordion holding the full story, interesting facts, people,
  legends and "why it matters".
- **Show essentials only** — collapses the day to the ten must-see sights.
- **Running late** — flags what can safely be dropped without losing the day.
- **Progress** — stops can be marked *Not started / Here now / Complete*;
  everything persists in `localStorage`.
- **Offline** — a service worker caches the app shell, so the itinerary,
  history, coordinates and checklist stay readable where signal drops (the
  Setrachos gorge and the Paphos Forest both have patchy coverage). Map tiles
  are deliberately not cached.
- **Sunset without an API key** — sunrise/sunset are computed in-browser with
  the standard solar position algorithm, so it works offline.

## Navigation links

Every meaningful destination has a large Google Maps button using the universal
URL scheme:

```
https://www.google.com/maps/dir/?api=1&destination=<LAT,LNG | place name>
```

Coordinates are used **only where they could be verified** against published
sources. Anywhere a precise coordinate could not be confirmed, the button falls
back to a Google Maps **place search on the exact official name**, and the map
pin is badged `approx` — its position is indicative only, but the Navigate
button still routes correctly. See *Sources & notes* in the app.

## Running locally

No build step, no dependencies, no API keys. Any static server works:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

or

```bash
npx serve .
```

Opening `index.html` directly via `file://` mostly works, but the service worker
and `localStorage` behave better over `http://`.

## Deploying

### Netlify — from Git

1. Push this repository to GitHub.
2. Log in to Netlify → **Add new site** → **Import an existing project**.
3. Choose **GitHub** and select this repository.
4. Build settings:
   - **Build command:** *(leave blank)*
   - **Publish directory:** `.`
5. **Deploy**.

`netlify.toml` already sets the publish directory and the headers that matter —
in particular `Cache-Control: no-store` on `sw.js`, so the service worker can
never pin a stale version onto a phone that has already visited.

### Netlify — from the CLI

```bash
npm i -g netlify-cli
netlify login
netlify deploy --prod
```

## Project structure

```
.
├── index.html              app shell, five views, bottom tab bar
├── css/
│   └── styles.css          design system; mobile-first, system fonts only
├── js/
│   ├── data.js             ALL guide content (stops, sights, history, sources)
│   ├── app.js              rendering, state, localStorage, progressive disclosure
│   ├── map.js              Leaflet map, markers, filters, popups
│   └── sun.js              sunrise/sunset, no network required
├── sw.js                   offline caching
├── manifest.webmanifest    installable to the iPhone home screen
└── netlify.toml            static deploy config
```

All content lives in `js/data.js`. To change a fact, a time, a coordinate or a
piece of history, edit that file — nothing else needs touching.

## Accessibility

Semantic landmarks, ARIA tabs/tabpanels, `aria-expanded` accordions, visible
focus rings, 44 px minimum touch targets, labelled buttons and links, and a
skip link. Colour contrast targets WCAG AA against the limestone background.

## Notes on accuracy

Opening hours, road conditions and site access in mountain Cyprus change without
notice. Times in the itinerary are a plan, not a guarantee. Legends and local
traditions are labelled as such and kept clearly separate from documented
history. Where sources disagreed, the text says so rather than silently picking
a number.

No secrets, tokens or API keys are used anywhere in this project.
