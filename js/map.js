/* Interactive route map (Leaflet + OpenStreetMap).
 *
 * Pins with verified coordinates are placed exactly. Pins flagged
 * coordsApprox are given a small deterministic offset around their parent
 * location purely so they do not stack on top of one another — they are
 * badged "approx" in the popup, and their Navigate button always uses a
 * Google Maps place search on the official name rather than the pin position.
 */

window.RouteMap = (function () {
  'use strict';

  let map = null;
  let layer = null;
  let built = false;
  let activeFilter = 'all';

  const FILTERS = [
    { id: 'all',      label: 'All' },
    { id: 'miss',     label: 'Do not miss' },
    { id: 'church',   label: 'Churches' },
    { id: 'historic', label: 'History' },
    { id: 'walk',     label: 'Walk & water' },
    { id: 'parking',  label: 'Parking' },
    { id: 'food',     label: 'Food' },
    { id: 'viewpoint',label: 'Views' }
  ];

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* Build the list of things to plot. */
  function points() {
    const out = [];
    const state = window.GuideApp.getState();

    /* Start */
    out.push({
      id: '_polis',
      name: 'Polis Chrysochous',
      cat: 'start',
      label: 'S',
      coords: GUIDE.meta.startCoords,
      desc: 'Where the day begins and ends.',
      duration: 'Depart ' + GUIDE.meta.departure,
      navQuery: 'Polis Chrysochous, Cyprus'
    });

    GUIDE.stops.forEach(function (stop) {
      if (stop.kind !== 'stop') return;
      if (state.essentialsOnly && stop.optional) return;

      /* If a sight sits on exactly the stop's own coordinates, promote it to
         be the numbered pin rather than stacking two markers in one spot. */
      let promoted = null;
      if (stop.coords && !stop.coordsApprox) {
        promoted = (stop.sights || []).filter(function (s) {
          return !s.isNote && s.coords && !s.coordsApprox &&
                 s.coords[0] === stop.coords[0] && s.coords[1] === stop.coords[1] &&
                 (!state.essentialsOnly || s.essential);
        })[0] || null;
      }

      if (promoted) {
        out.push({
          id: promoted.id,
          name: promoted.name,
          cat: 'destination',
          label: String(stop.num),
          coords: promoted.coords,
          approx: false,
          desc: shortDesc(promoted),
          matters: promoted.whyItMatters,
          duration: promoted.duration && promoted.duration !== '—' ? promoted.duration : null,
          doNotMiss: !!promoted.doNotMiss,
          navVerb: promoted.navVerb,
          navQuery: promoted.navQuery,
          rawCoords: promoted.coords
        });
      } else if (stop.coords) {
        out.push({
          id: stop.id,
          name: stop.name,
          cat: 'destination',
          label: String(stop.num),
          coords: stop.coords,
          approx: !!stop.coordsApprox,
          desc: stop.subtitle || stop.summary,
          matters: null,
          duration: stop.duration ? 'Stay ' + stop.duration : null,
          navQuery: stop.navQuery || (stop.sights && stop.sights[0] ? (stop.sights[0].navQuery || stop.name) : stop.name),
          coordsApprox: !!stop.coordsApprox,
          rawCoords: stop.coords,
          isStop: true
        });
      }

      /* Individual sights */
      const offsets = {};
      (stop.sights || []).forEach(function (s) {
        if (s.isNote || !s.coords) return;
        if (promoted && s.id === promoted.id) return;
        if (state.essentialsOnly && !s.essential) return;

        let coords = s.coords;
        if (s.coordsApprox) {
          /* Deterministic fan-out so co-located approx pins stay legible. */
          const key = s.coords.join(',');
          offsets[key] = (offsets[key] || 0) + 1;
          const n = offsets[key];
          const angle = (n * 62) * Math.PI / 180;
          const r = 0.0016 + n * 0.0004;          // ~180–330 m
          coords = [
            s.coords[0] + r * Math.cos(angle),
            s.coords[1] + r * Math.sin(angle) * 1.22
          ];
        }

        out.push({
          id: s.id,
          name: s.name,
          cat: s.category,
          label: '',
          coords: coords,
          approx: !!s.coordsApprox,
          desc: shortDesc(s),
          matters: s.whyItMatters,
          duration: s.duration && s.duration !== '—' ? s.duration : null,
          doNotMiss: !!s.doNotMiss,
          navVerb: s.navVerb,
          navQuery: s.navQuery,
          rawCoords: s.coords,
          coordsApprox: s.coordsApprox
        });
      });
    });

    return out;
  }

  /* First sentence of the quick view, tags stripped. */
  function shortDesc(s) {
    const plain = String(s.quick || '').replace(/<[^>]+>/g, '');
    const m = plain.match(/^[^.!?]+[.!?]/);
    return (m ? m[0] : plain.slice(0, 150)).trim();
  }

  function markerHtml(p) {
    const cls = 'mk mk--' + (p.cat === 'destination' || p.cat === 'start' ? p.cat : catClass(p.cat));
    return '<div class="' + cls + '"><span>' + esc(p.label || dot(p.cat)) + '</span></div>';
  }

  function catClass(cat) {
    if (['church', 'parking', 'historic', 'water', 'viewpoint', 'food', 'optional'].indexOf(cat) >= 0) return cat;
    return 'historic';
  }

  function dot(cat) {
    const map = {
      church: '✝', parking: 'P', historic: '⌂', water: '≈',
      viewpoint: '◉', food: '🍴', optional: '?'
    };
    return map[cat] || '•';
  }

  function matches(p) {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'miss') return !!p.doNotMiss;
    if (activeFilter === 'walk') return p.cat === 'water' || p.cat === 'walk';
    if (activeFilter === 'historic') return p.cat === 'historic' || p.cat === 'destination';
    return p.cat === activeFilter;
  }

  function popupHtml(p) {
    const navItem = {
      coords: p.rawCoords || p.coords,
      coordsApprox: p.coordsApprox || p.approx,
      navQuery: p.navQuery,
      name: p.name
    };
    let h = '<div class="pop__name">' + esc(p.name) + '</div>';
    if (p.approx) h += '<div style="margin-bottom:6px"><span class="badge badge--approx">Approx pin</span></div>';
    if (p.desc) h += '<div class="pop__desc">' + esc(p.desc) + '</div>';
    if (p.matters) {
      h += '<div class="pop__matters"><b>Why it matters</b>' + esc(truncate(p.matters, 165)) + '</div>';
    }
    if (p.duration) h += '<div class="pop__dur">⏱ ' + esc(p.duration) + '</div>';
    h += '<div class="pop__btns">';
    h += '<a class="btn btn--nav" href="' + esc(window.GuideApp.mapsUrl(navItem)) +
         '" target="_blank" rel="noopener">' + esc(p.navVerb || 'Open in Google Maps') + '</a>';
    if (!p.isStop && p.id.charAt(0) !== '_') {
      h += '<button class="btn btn--ghost" type="button" data-goto-sight="' + esc(p.id) + '">View in itinerary</button>';
    }
    h += '</div>';
    return h;
  }

  function truncate(s, n) {
    s = String(s);
    if (s.length <= n) return s;
    return s.slice(0, n).replace(/\s+\S*$/, '') + '…';
  }

  function renderFilters() {
    const bar = document.getElementById('mapFilters');
    if (!bar) return;
    bar.innerHTML = FILTERS.map(function (f) {
      return '<button class="chip" type="button" data-filter="' + f.id + '" aria-pressed="' +
             (activeFilter === f.id ? 'true' : 'false') + '">' + esc(f.label) + '</button>';
    }).join('');
    bar.addEventListener('click', function (e) {
      const b = e.target.closest('[data-filter]');
      if (!b) return;
      activeFilter = b.dataset.filter;
      Array.prototype.forEach.call(bar.querySelectorAll('.chip'), function (c) {
        c.setAttribute('aria-pressed', c.dataset.filter === activeFilter ? 'true' : 'false');
      });
      draw();
    });
  }

  function draw() {
    if (!map) return;
    if (layer) layer.clearLayers();
    else layer = L.layerGroup().addTo(map);

    const pts = points().filter(matches);
    const bounds = [];

    pts.forEach(function (p) {
      const icon = L.divIcon({
        html: markerHtml(p),
        className: '',
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -28]
      });
      L.marker(p.coords, { icon: icon, title: p.name, alt: p.name, riseOnHover: true })
        .bindPopup(popupHtml(p), { maxWidth: 260, autoPanPadding: [20, 20] })
        .addTo(layer);
      bounds.push(p.coords);
    });

    /* Indicative order line between the numbered stops */
    if (activeFilter === 'all') {
      const stopPts = [GUIDE.meta.startCoords].concat(
        GUIDE.stops.filter(function (s) { return s.kind === 'stop' && s.coords; })
                   .map(function (s) { return s.coords; })
      );
      stopPts.push(GUIDE.meta.startCoords);
      L.polyline(stopPts, {
        color: '#2F5B44', weight: 2, opacity: .38, dashArray: '5,7', interactive: false
      }).addTo(layer);
    }

    if (bounds.length) {
      try { map.fitBounds(bounds, { padding: [42, 42], maxZoom: 13 }); } catch (e) {}
    }
  }

  function build() {
    const el = document.getElementById('map');
    if (!el) return;

    if (typeof L === 'undefined') {
      el.style.height = 'auto';
      el.innerHTML = '<div class="map-fallback"><p><strong>The map could not load.</strong></p>' +
        '<p>This needs a data connection the first time. Everything else in this guide — the ' +
        'itinerary, the history and every Navigate button — works without it.</p>' +
        '<p style="margin-top:12px"><button class="btn btn--ghost btn--sm" type="button" ' +
        'onclick="window.GuideApp.showView(\'itinerary\')">Go to the itinerary</button></p></div>';
      return;
    }

    map = L.map(el, {
      center: [34.995, 32.73],
      zoom: 11,
      scrollWheelZoom: true,
      tap: true
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    renderFilters();
    draw();
    built = true;
  }

  function refresh(force) {
    if (!built) { build(); return; }
    if (force) draw();
    if (map) setTimeout(function () { map.invalidateSize(); }, 60);
  }

  return { refresh: refresh };
})();
