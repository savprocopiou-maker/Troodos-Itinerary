/* Marathasa Valley & Kykkos Day Trip — application logic.
   Vanilla JS, no framework, no build step. */

(function () {
  'use strict';

  const STORAGE_KEY = 'marathasa.kykkos.v1';

  /* ------------------------------------------------------------- STATE */

  const defaultState = {
    stops: {},          // stopId -> 'pending' | 'here' | 'done'
    checks: {},         // checklist id -> true
    essentialsOnly: false,
    late: false,
    walkMode: 'short'
  };

  let state = load();

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return Object.assign({}, defaultState);
      const parsed = JSON.parse(raw);
      return Object.assign({}, defaultState, parsed, {
        stops: parsed.stops || {},
        checks: parsed.checks || {}
      });
    } catch (e) {
      return Object.assign({}, defaultState);
    }
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* private mode / quota — the page still works */ }
  }

  /* ------------------------------------------------------------ HELPERS */

  const $  = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.prototype.slice.call((root || document).querySelectorAll(sel));

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* Google Maps deep link.
     Verified coordinates route by lat/lng; anything approximate or unlocated
     routes by a place search on the exact official name. */
  function mapsUrl(item) {
    const base = 'https://www.google.com/maps/dir/?api=1&destination=';
    if (item.coords && !item.coordsApprox) {
      return base + item.coords[0] + ',' + item.coords[1];
    }
    const q = item.navQuery || item.name || '';
    return base + encodeURIComponent(q);
  }

  const ICONS = {
    church:   '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v6M9.5 4.5h5"/><path d="M12 8 5 13v8h14v-8z"/><path d="M10 21v-4a2 2 0 0 1 4 0v4"/></svg>',
    parking:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M9.5 17V7.5h3.2a2.9 2.9 0 0 1 0 5.8H9.5"/></svg>',
    historic: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V10M19 21V10M9 21v-6h6v6"/><path d="M12 3 3 8h18z"/></svg>',
    water:    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3s6 6.5 6 10.5a6 6 0 0 1-12 0C6 9.5 12 3 12 3z"/></svg>',
    viewpoint:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="2.6"/></svg>',
    food:     '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3v8a2.5 2.5 0 0 0 5 0V3M8.5 11v10"/><path d="M17 3c-1.5 1.5-2 3.5-2 5.5V13h3.5V3z"/><path d="M16.8 13v8"/></svg>',
    optional: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></svg>',
    walk:     '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="13" cy="4" r="1.8"/><path d="M11 21l1.5-6L9 12.5 10 8l3.5 1.5L16 12"/><path d="M9 12.5 7 21M16 12l2 3"/></svg>',
    clock:    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
    car:      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13.5 4.8 8A2 2 0 0 1 6.7 6.6h10.6A2 2 0 0 1 19.2 8L21 13.5"/><path d="M3 13.5h18V18H3z"/><circle cx="7" cy="18" r="1.4"/><circle cx="17" cy="18" r="1.4"/></svg>',
    peak:     '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20 10 6l4 7 2.5-3L21 20z"/></svg>',
    sun:      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    phone:    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M11 18.5h2"/></svg>',
    eye:      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="2.6"/></svg>',
    chev:     '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
    warn:     '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 2 20h20z"/><path d="M12 9v5M12 17h.01"/></svg>',
    info:     '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5h.01"/></svg>'
  };

  function icoFor(cat) {
    return ICONS[cat] || ICONS.historic;
  }
  function icoClass(cat) {
    if (cat === 'parking') return ' sight__ico--parking';
    if (cat === 'water') return ' sight__ico--water';
    if (cat === 'food') return ' sight__ico--food';
    if (cat === 'viewpoint') return ' sight__ico--view';
    if (cat === 'optional') return ' sight__ico--optional';
    return '';
  }

  /* Flatten every sight for lookup / map use. */
  const ALL_SIGHTS = [];
  GUIDE.stops.forEach(function (stop) {
    (stop.sights || []).forEach(function (s) {
      ALL_SIGHTS.push(Object.assign({}, s, { _stopId: stop.id, _stopName: stop.name, _stopNum: stop.num }));
    });
  });
  function sightById(id) {
    for (let i = 0; i < ALL_SIGHTS.length; i++) if (ALL_SIGHTS[i].id === id) return ALL_SIGHTS[i];
    return null;
  }

  /* ------------------------------------------------------- NAV BUTTONS */

  function navButtons(sight, opts) {
    opts = opts || {};
    if (sight.isNote) return '';
    const label = sight.navVerb || 'Open in Google Maps';
    let html = '<div class="btn-row" style="margin-top:12px">';
    html += '<a class="btn btn--nav" href="' + esc(mapsUrl(sight)) + '" target="_blank" rel="noopener" ' +
            'aria-label="' + esc(label + ': ' + sight.name) + '">' +
            '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s7-6.4 7-11a7 7 0 1 0-14 0c0 4.6 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>' +
            esc(label) + '</a>';
    if (opts.itineraryLink) {
      html += '<button class="btn btn--ghost" type="button" data-goto-sight="' + esc(sight.id) + '">View in itinerary</button>';
    }
    html += '</div>';
    return html;
  }

  /* -------------------------------------------------- SIGHT CARD RENDER */

  function renderSight(sight, ctx) {
    ctx = ctx || {};
    const dimmed = state.late && (sight.optional || sight.skipIfLate) ? ' is-dimmed' : '';
    const missCls = sight.doNotMiss ? ' sight--miss' : '';

    let tags = '';
    if (sight.doNotMiss) tags += '<span class="badge badge--miss">Do not miss</span>';
    if (sight.optional) tags += '<span class="badge badge--optional">Optional</span>';
    if (sight.coordsApprox && !sight.isNote) tags += '<span class="badge badge--approx">Approx pin</span>';
    if (sight.duration && sight.duration !== '—') tags += '<span class="badge badge--time">' + esc(sight.duration) + '</span>';

    let h = '<article class="sight' + missCls + dimmed + '" id="sight-' + esc(sight.id) + '">';

    /* Head */
    h += '<div class="sight__head">';
    h += '<div class="sight__ico' + icoClass(sight.category) + '" aria-hidden="true">' + icoFor(sight.category) + '</div>';
    h += '<div class="sight__main">';
    h += '<h3 class="sight__name">' + esc(sight.name) + '</h3>';
    if (tags) h += '<div class="sight__tags">' + tags + '</div>';
    h += '<div class="sight__quick">' + sight.quick + '</div>';
    h += '</div></div>';

    /* Body */
    let body = '';

    if (sight.warn) {
      body += '<div class="notice notice--warn"><div class="notice__title">' + ICONS.warn + 'Note</div>' + sight.warn + '</div>';
    }
    if (sight.access) {
      body += '<div class="notice notice--' + (sight.access.tone || 'info') + '">' +
              '<div class="notice__title">' + ICONS.info + esc(sight.access.title) + '</div>' + sight.access.body + '</div>';
    }

    if (sight.lookFor && sight.lookFor.length) {
      body += '<div class="lookfor"><div class="lookfor__title">' + ICONS.eye + 'What to look for</div><ul>';
      sight.lookFor.forEach(function (l) { body += '<li>' + l + '</li>'; });
      body += '</ul></div>';
    }

    if (sight.practical && sight.practical.length) {
      body += '<div class="pracrows">';
      sight.practical.forEach(function (p) {
        body += '<div class="pracrow"><b>' + esc(p.label) + '</b><span>' + esc(p.value) + '</span></div>';
      });
      body += '</div>';
    }

    /* Lunch options */
    if (sight.options && sight.options.length) {
      sight.options.forEach(function (o) {
        body += '<div class="opt' + (o.recommended ? ' opt--rec' : '') + '">';
        body += '<div class="opt__top"><span class="opt__name">' + esc(o.name) + '</span>' +
                '<span class="opt__price">' + esc(o.price) + '</span>' +
                (o.recommended ? '<span class="badge badge--miss">Recommended</span>' : '') + '</div>';
        body += '<div class="opt__desc">' + esc(o.desc) + '</div>';
        body += '<a class="btn btn--nav btn--sm" href="' +
                esc('https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(o.navQuery)) +
                '" target="_blank" rel="noopener">Open in Google Maps</a>';
        body += '</div>';
      });
    }

    if (body) h += '<div class="sight__body">' + body + navButtons(sight) + '</div>';
    else if (!sight.isNote) h += '<div class="sight__body">' + navButtons(sight) + '</div>';

    /* Expandable history */
    const hasDeep = sight.story || (sight.facts && sight.facts.length) || sight.didYouKnow ||
                    sight.legend || sight.whyItMatters || (sight.people && sight.people.length) ||
                    sight.nature || sight.museumIn20 || sight.viewGuide || sight.responsible ||
                    (sight.etiquette && sight.etiquette.length);

    if (hasDeep && !ctx.noAccordion) {
      const pid = 'acc-' + sight.id;
      h += '<div class="acc">';
      h += '<button class="acc__btn" type="button" aria-expanded="false" aria-controls="' + pid + '">' +
           '<span>Tell me more</span><span class="acc__chev" aria-hidden="true">' + ICONS.chev + '</span></button>';
      h += '<div class="acc__panel" id="' + pid + '" hidden>' + deepContent(sight) + '</div>';
      h += '</div>';
    }

    h += '</article>';
    return h;
  }

  function deepContent(sight) {
    let d = '';

    if (sight.story) d += '<h4>The story</h4><div class="prose">' + sight.story + '</div>';

    if (sight.viewGuide) {
      d += '<h4>Look around you</h4>';
      sight.viewGuide.forEach(function (v) {
        d += '<div class="person"><div class="person__name">' + esc(v.dir) + '</div>' +
             '<div class="person__text">' + v.text + '</div></div>';
      });
    }

    if (sight.nature) {
      d += '<h4>' + esc(sight.nature.title) + '</h4><ul class="factlist">';
      sight.nature.items.forEach(function (i) { d += '<li>' + esc(i) + '</li>'; });
      d += '</ul>';
    }

    if (sight.museumIn20) {
      d += '<h4>' + esc(sight.museumIn20.title) + '</h4><ul class="factlist">';
      sight.museumIn20.items.forEach(function (i) { d += '<li>' + esc(i) + '</li>'; });
      d += '</ul>';
    }

    if (sight.facts && sight.facts.length) {
      d += '<h4>Interesting facts</h4><ul class="factlist">';
      sight.facts.forEach(function (f) { d += '<li>' + esc(f) + '</li>'; });
      d += '</ul>';
    }

    if (sight.people && sight.people.length) {
      d += '<h4>People connected to this place</h4>';
      sight.people.forEach(function (p) {
        d += '<div class="person"><div class="person__name">' + esc(p.name) + '</div>' +
             '<div class="person__text">' + esc(p.text) + '</div></div>';
      });
    }

    if (sight.didYouKnow) {
      d += '<div class="pullout pullout--know"><div class="pullout__label">Did you know?</div>' +
           esc(sight.didYouKnow) + '</div>';
    }

    if (sight.legend) {
      d += '<div class="pullout pullout--legend"><div class="pullout__label">Local legend / tradition</div>' +
           esc(sight.legend) + '</div>';
    }

    if (sight.responsible) {
      d += '<h4>' + esc(sight.responsible.title) + '</h4><ul class="factlist">';
      sight.responsible.items.forEach(function (i) { d += '<li>' + esc(i) + '</li>'; });
      d += '</ul>';
    }

    if (sight.etiquette && sight.etiquette.length) {
      d += '<h4>Etiquette</h4><ul class="factlist">';
      sight.etiquette.forEach(function (i) { d += '<li>' + esc(i) + '</li>'; });
      d += '</ul>';
    }

    if (sight.whyItMatters) {
      d += '<div class="pullout pullout--matters"><div class="pullout__label">Why it matters to Cyprus</div>' +
           esc(sight.whyItMatters) + '</div>';
    }

    return d;
  }

  function visibleSights(stop) {
    return (stop.sights || []).filter(function (s) {
      if (state.essentialsOnly) return !!s.essential;
      return true;
    });
  }

  /* ------------------------------------------------------------- HERO */

  function renderHero() {
    $('#heroIntro').innerHTML = esc(GUIDE.meta.intro);

    $('#heroStats').innerHTML = GUIDE.meta.stats.map(function (s) {
      return '<div class="stat"><span class="stat__ico" aria-hidden="true">' + icoFor(s.icon) + '</span>' +
             '<div><div class="stat__label">' + esc(s.label) + '</div>' +
             '<div class="stat__value">' + esc(s.value) + '</div></div></div>';
    }).join('');

    $('#heroPills').innerHTML = GUIDE.meta.highlights.map(function (h) {
      return '<span class="pill">' + esc(h) + '</span>';
    }).join('');
  }

  /* --------------------------------------------------------- TIMELINE */

  function renderTimeline() {
    const root = $('#timeline');
    let h = '';

    GUIDE.stops.forEach(function (stop) {
      const isDrive = stop.kind === 'drive';
      const st = state.stops[stop.id] || 'pending';
      const hidden = state.essentialsOnly && stop.optional;
      if (hidden) return;

      let markerCls = 'tl-marker' + (isDrive ? ' tl-marker--drive' : '');
      if (!isDrive && st === 'done') markerCls += ' tl-marker--done';
      if (!isDrive && st === 'here') markerCls += ' tl-marker--here';

      h += '<div class="tl-item tl-block" id="stop-' + esc(stop.id) + '">';
      h += '<div class="' + markerCls + '" aria-hidden="true">' +
           (isDrive ? ICONS.car : (st === 'done' ? '✓' : esc(stop.num))) + '</div>';

      h += '<div class="tl-time">' + esc(stop.arrive || '') +
           (stop.depart ? ' – ' + esc(stop.depart) : '') +
           (stop.duration ? ' · ' + esc(stop.duration) : '') + '</div>';

      h += '<h3 class="tl-name' + (isDrive ? ' tl-name--drive' : '') + '">' + esc(stop.name) +
           (stop.optional ? ' <span class="badge badge--optional">Optional</span>' : '') + '</h3>';

      if (stop.subtitle) h += '<div class="tl-sub">' + esc(stop.subtitle) + '</div>';

      if (stop.summary) h += '<p style="font-size:14.5px;color:var(--ink-mid);margin-bottom:11px">' + esc(stop.summary) + '</p>';

      if (stop.driveFacts) {
        h += '<div class="drive-facts">';
        stop.driveFacts.forEach(function (f) {
          h += '<div><b>' + esc(f.label) + '</b>' + esc(f.value) + '</div>';
        });
        h += '</div>';
      }

      if (stop.notice) {
        h += '<div class="notice notice--' + esc(stop.notice.tone) + '">' +
             '<div class="notice__title">' + (stop.notice.tone === 'warn' ? ICONS.warn : ICONS.info) +
             esc(stop.notice.title) + '</div>' + stop.notice.body + '</div>';
      }

      if (stop.body) h += '<p style="font-size:14.5px;color:var(--ink-mid);margin-bottom:11px">' + esc(stop.body) + '</p>';

      if (stop.tips && stop.tips.length) {
        h += '<div class="lookfor"><div class="lookfor__title">Good to know</div><ul>';
        stop.tips.forEach(function (t) { h += '<li>' + t + '</li>'; });
        h += '</ul></div>';
      }

      /* Stop state control */
      if (!isDrive) {
        h += '<div class="statepick" role="group" aria-label="Progress at ' + esc(stop.name) + '">';
        [['pending', 'Not started'], ['here', 'Here now'], ['done', 'Complete']].forEach(function (o) {
          h += '<button type="button" data-stop="' + esc(stop.id) + '" data-state="' + o[0] + '" aria-pressed="' +
               (st === o[0] ? 'true' : 'false') + '">' + o[1] + '</button>';
        });
        h += '</div>';
      }

      /* Sights */
      const sights = visibleSights(stop);
      if (sights.length) {
        h += '<div style="margin-top:12px">';
        sights.forEach(function (s) { h += renderSight(s); });
        h += '</div>';
      }

      /* Walking route */
      if (stop.walkRoute) h += renderWalkRoute(stop.walkRoute);

      h += '</div>';
    });

    root.innerHTML = h;
  }

  function renderWalkRoute(wr) {
    let h = '<div class="card" style="margin-top:16px"><div style="padding:15px">';
    h += '<h3 style="font-family:var(--font-serif);font-size:19px;margin-bottom:6px">' + esc(wr.title) + '</h3>';
    h += '<p style="font-size:14px;color:var(--ink-mid);margin-bottom:14px">' + esc(wr.intro) + '</p>';

    h += '<div class="modeswitch" role="group" aria-label="Walk length">';
    wr.modes.forEach(function (m) {
      h += '<button type="button" data-walkmode="' + esc(m.id) + '" aria-pressed="' +
           (state.walkMode === m.id ? 'true' : 'false') + '">' + esc(m.name) +
           '<br><span style="font-weight:500;font-size:11.5px;opacity:.75">' + esc(m.time) + '</span></button>';
    });
    h += '</div>';

    const mode = wr.modes.filter(function (m) { return m.id === state.walkMode; })[0] || wr.modes[0];
    h += '<p style="font-size:13.5px;color:var(--ink-mid);margin-bottom:14px">' +
         '<strong>' + esc(mode.distance) + '</strong> · ' + esc(mode.desc) + '</p>';

    wr.steps.forEach(function (s) {
      const hide = s.fullOnly && state.walkMode !== 'full';
      h += '<div class="walkstep' + (hide ? ' is-hidden' : '') + '">';
      h += '<div class="walkstep__n" aria-hidden="true">' + s.n + '</div>';
      h += '<div class="walkstep__body">';
      h += '<div class="walkstep__name">' + esc(s.name) + '</div>';
      h += '<div class="walkstep__note">' + esc(s.note) + '</div>';
      h += '<div class="walkmeta">';
      if (s.distance && s.distance !== '—') h += '<span>' + esc(s.distance) + '</span>';
      if (s.time) h += '<span>' + esc(s.time) + '</span>';
      if (s.grade && s.grade !== '—') h += '<span>' + esc(s.grade) + '</span>';
      if (s.shade) h += '<span>Shade: ' + esc(s.shade) + '</span>';
      if (s.surface && s.surface !== '—') h += '<span>' + esc(s.surface) + '</span>';
      h += '</div>';
      if (s.sightId) {
        const sg = sightById(s.sightId);
        if (sg && !sg.isNote) {
          h += '<div style="margin-top:9px"><a class="btn btn--nav btn--sm" href="' + esc(mapsUrl(sg)) +
               '" target="_blank" rel="noopener">' + esc(sg.navVerb || 'Open in Google Maps') + '</a></div>';
        }
      }
      h += '</div></div>';
    });

    h += '</div></div>';
    return h;
  }

  /* --------------------------------------------------------- PRACTICAL */

  function renderPractical() {
    $('#practical').innerHTML = GUIDE.practical.map(function (p, i) {
      const pid = 'prac-' + i;
      return '<div class="card"><div class="acc" style="border-top:0">' +
        '<button class="acc__btn" type="button" aria-expanded="false" aria-controls="' + pid + '">' +
        '<span style="display:flex;align-items:center;gap:9px">' +
        '<span style="color:var(--forest-mid)" aria-hidden="true">' + icoFor(p.icon) + '</span>' +
        esc(p.title) + '</span>' +
        '<span class="acc__chev" aria-hidden="true">' + ICONS.chev + '</span></button>' +
        '<div class="acc__panel" id="' + pid + '" hidden><ul class="factlist">' +
        p.items.map(function (i2) { return '<li>' + esc(i2) + '</li>'; }).join('') +
        '</ul></div></div></div>';
    }).join('');

    $('#sourcesNote').textContent = GUIDE.sourcesNote;
    $('#sources').innerHTML = GUIDE.sources.map(function (s) {
      return '<div class="source"><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' +
             esc(s.name) + '</a><span>' + esc(s.note) + '</span></div>';
    }).join('');
  }

  /* -------------------------------------------------------------- NOW */

  function currentStop() {
    const stops = GUIDE.stops.filter(function (s) { return s.kind === 'stop'; });
    const here = stops.filter(function (s) { return state.stops[s.id] === 'here'; })[0];
    if (here) return here;
    const next = stops.filter(function (s) { return state.stops[s.id] !== 'done'; })[0];
    return next || stops[stops.length - 1];
  }

  function renderNow() {
    const stop = currentStop();
    const stops = GUIDE.stops.filter(function (s) { return s.kind === 'stop'; });
    const idx = stops.indexOf(stop);
    const nextStop = stops[idx + 1];
    const st = state.stops[stop.id] || 'pending';
    const done = stops.filter(function (s) { return state.stops[s.id] === 'done'; }).length;

    let h = '';

    /* Current stop hero */
    h += '<div class="now-card">';
    h += '<div class="now-card__label">' + (st === 'here' ? 'You are here' : 'Next stop') + ' · Stop ' +
         esc(stop.num) + ' of ' + stops.length + '</div>';
    h += '<h2 class="now-card__name">' + esc(stop.name) + '</h2>';
    if (stop.subtitle) h += '<p class="now-card__sub">' + esc(stop.subtitle) + '</p>';
    h += '<div class="now-card__meta">';
    if (stop.arrive) h += '<span>Arrive ' + esc(stop.arrive) + '</span>';
    if (stop.duration) h += '<span>Stay ' + esc(stop.duration) + '</span>';
    if (stop.elevation) h += '<span>' + esc(stop.elevation) + '</span>';
    h += '</div>';
    h += '<div class="btn-row">';
    h += '<a class="btn btn--nav" href="' + esc(mapsUrl(stop)) + '" target="_blank" rel="noopener">Navigate to ' + esc(stop.name) + '</a>';
    if (st !== 'done') {
      h += '<button class="btn btn--ghost" type="button" data-stop="' + esc(stop.id) + '" data-state="done">Mark stop complete</button>';
    } else {
      h += '<button class="btn btn--ghost" type="button" data-stop="' + esc(stop.id) + '" data-state="here">Reopen this stop</button>';
    }
    h += '</div></div>';

    /* Sunset */
    h += renderSunPanel();

    /* What to see now */
    const sights = visibleSights(stop).filter(function (s) { return !s.isNote && s.category !== 'parking'; });
    if (sights.length) {
      h += '<div class="section" style="margin-top:22px"><div class="section__head">' +
           '<h2 class="section__title">What to see here</h2>' +
           '<span class="section__hint">' + sights.length + ' sights</span></div>';
      sights.forEach(function (s) { h += renderSight(s); });
      h += '</div>';
    }

    /* Next up */
    if (nextStop) {
      h += '<div class="nextup" style="margin-top:20px">';
      h += '<div class="nextup__label">Next up</div>';
      h += '<div class="nextup__name">' + esc(nextStop.name) + '</div>';
      h += '<div class="nextup__sub">' + esc(nextStop.subtitle || nextStop.summary || '') + '</div>';
      h += '<a class="btn btn--nav" href="' + esc(mapsUrl(nextStop)) + '" target="_blank" rel="noopener">Drive to ' + esc(nextStop.name) + '</a>';
      h += '</div>';
    } else {
      h += '<div class="nextup" style="margin-top:20px"><div class="nextup__label">Next up</div>' +
           '<div class="nextup__name">Home to Polis</div>' +
           '<div class="nextup__sub">Back through the Paphos Forest via Stavros tis Psokas and Lysos. Allow 1 h 20 m – 1 h 45 m.</div>' +
           '<a class="btn btn--nav" href="https://www.google.com/maps/dir/?api=1&destination=35.03333,32.43333" target="_blank" rel="noopener">Drive to Polis</a></div>';
    }

    h += '<p style="font-size:12.5px;color:var(--ink-soft);margin-top:18px;text-align:center">' +
         esc(done + ' of ' + stops.length + ' stops complete') + '</p>';

    $('#nowContent').innerHTML = h;
  }

  function renderSunPanel() {
    try {
      const t = Sun.times(new Date(), 34.9839, 32.7411);
      if (!t) return '';
      const now = new Date();
      const setStr = Sun.fmt(t.sunset);
      const riseStr = Sun.fmt(t.sunrise);
      const msLeft = t.sunset.getTime() - now.getTime();
      let tail;
      if (msLeft > 0) {
        const hrs = Math.floor(msLeft / 3600000);
        const mins = Math.floor((msLeft % 3600000) / 60000);
        tail = hrs > 0 ? (hrs + ' h ' + mins + ' m of daylight left') : (mins + ' m of daylight left');
      } else {
        tail = 'The sun has set — take the mountain roads slowly.';
      }
      const warn = msLeft > 0 && msLeft < 5400000;
      return '<div class="notice notice--' + (warn ? 'warn' : 'info') + '" style="margin-bottom:0">' +
             '<div class="notice__title">' + ICONS.sun + 'Daylight at Kykkos</div>' +
             'Sunrise ' + esc(riseStr) + ' · Sunset <strong>' + esc(setStr) + '</strong> — ' + esc(tail) + '</div>';
    } catch (e) { return ''; }
  }

  /* ------------------------------------------------------------ LEARN */

  function renderLearn() {
    const groups = GUIDE.stops.filter(function (s) { return s.kind === 'stop'; });

    $('#learnNav').innerHTML = groups.map(function (g) {
      return '<a href="#learn-' + esc(g.id) + '">' + esc(g.name) + '</a>';
    }).join('');

    $('#learnContent').innerHTML = groups.map(function (g) {
      const sights = (g.sights || []).filter(function (s) {
        return s.story || s.facts || s.didYouKnow || s.legend || s.whyItMatters || s.people;
      });
      let h = '<section class="learn-group" id="learn-' + esc(g.id) + '">';
      h += '<h2 class="learn-group__title">' + esc(g.name) + '</h2>';
      h += '<p class="learn-group__sub">' + esc(g.subtitle || '') + '</p>';
      sights.forEach(function (s) {
        h += '<div class="card"><div style="padding:15px 15px 4px">' +
             '<h3 style="font-family:var(--font-serif);font-size:18.5px;margin-bottom:7px">' + esc(s.name) + '</h3>' +
             '<div style="font-size:14.5px;color:var(--ink-mid);line-height:1.55">' + s.quick + '</div></div>' +
             '<div class="acc">' +
             '<button class="acc__btn" type="button" aria-expanded="false" aria-controls="learnacc-' + esc(s.id) + '">' +
             '<span>Read the full story</span><span class="acc__chev" aria-hidden="true">' + ICONS.chev + '</span></button>' +
             '<div class="acc__panel" id="learnacc-' + esc(s.id) + '" hidden>' + deepContent(s) + '</div></div></div>';
      });
      h += '</section>';
      return h;
    }).join('');
  }

  /* -------------------------------------------------------- CHECKLIST */

  function renderChecklist() {
    const items = GUIDE.checklist;
    $('#checklist').innerHTML = items.map(function (it) {
      const on = !!state.checks[it.id];
      return '<label class="checkitem' + (on ? ' is-done' : '') + '">' +
        '<input type="checkbox" data-check="' + esc(it.id) + '"' + (on ? ' checked' : '') + '>' +
        '<span class="checkitem__main">' +
        '<span class="checkitem__label">' + esc(it.label) + '</span>' +
        '<span class="checkitem__stop">' + esc(it.stop) + (it.essential ? ' · Essential' : ' · Optional') + '</span>' +
        '</span></label>';
    }).join('');
    updateChecklistCount();
  }

  function updateChecklistCount() {
    const ess = GUIDE.checklist.filter(function (i) { return i.essential; });
    const doneEss = ess.filter(function (i) { return state.checks[i.id]; }).length;
    const allDone = GUIDE.checklist.filter(function (i) { return state.checks[i.id]; }).length;
    $('#clCount').textContent = doneEss + ' of ' + ess.length;
    $('#clText').innerHTML = 'essential sights visited<br><span style="color:var(--ink-soft)">' +
      allDone + ' of ' + GUIDE.checklist.length + ' including optional</span>';
    updateTopProgress();
  }

  function updateTopProgress() {
    const ess = GUIDE.checklist.filter(function (i) { return i.essential; });
    const doneEss = ess.filter(function (i) { return state.checks[i.id]; }).length;
    const pct = ess.length ? Math.round((doneEss / ess.length) * 100) : 0;
    $('#topProgressFill').style.width = pct + '%';
    $('#topProgress').setAttribute('aria-valuenow', String(pct));
    const stops = GUIDE.stops.filter(function (s) { return s.kind === 'stop'; });
    const doneStops = stops.filter(function (s) { return state.stops[s.id] === 'done'; }).length;
    $('#topMeta').textContent = doneEss + '/' + ess.length + ' sights · ' + doneStops + '/' + stops.length + ' stops';
  }

  /* ------------------------------------------------------------- VIEWS */

  function showView(name, opts) {
    opts = opts || {};
    $$('.view').forEach(function (v) { v.classList.remove('is-active'); });
    $$('.tab').forEach(function (t) { t.setAttribute('aria-selected', 'false'); });

    const view = $('#view-' + name);
    const tab = $('#tab-' + name);
    if (view) view.classList.add('is-active');
    if (tab) tab.setAttribute('aria-selected', 'true');

    const titles = {
      itinerary: 'Marathasa & Kykkos',
      map: 'Route map',
      now: 'Now',
      learn: 'Learn',
      checklist: 'Checklist'
    };
    $('#topTitle').textContent = titles[name] || 'Marathasa & Kykkos';

    if (name === 'map' && window.RouteMap) window.RouteMap.refresh();
    if (name === 'now') renderNow();

    if (!opts.keepScroll) window.scrollTo(0, 0);
    try { history.replaceState(null, '', '#' + name); } catch (e) {}
  }

  /* ------------------------------------------------------------ EVENTS */

  function bind() {
    /* Tabs */
    $$('.tab').forEach(function (t) {
      t.addEventListener('click', function () { showView(t.dataset.view); });
    });

    /* Accordions + stop state + walk mode + goto (delegated) */
    document.addEventListener('click', function (e) {
      const accBtn = e.target.closest('.acc__btn');
      if (accBtn) {
        const panel = document.getElementById(accBtn.getAttribute('aria-controls'));
        const open = accBtn.getAttribute('aria-expanded') === 'true';
        accBtn.setAttribute('aria-expanded', open ? 'false' : 'true');
        if (panel) panel.hidden = open;
        return;
      }

      const stateBtn = e.target.closest('[data-stop][data-state]');
      if (stateBtn) {
        const id = stateBtn.dataset.stop;
        const val = stateBtn.dataset.state;
        state.stops[id] = (state.stops[id] === val && val !== 'done') ? 'pending' : val;
        /* Only one stop can be "here" */
        if (state.stops[id] === 'here') {
          Object.keys(state.stops).forEach(function (k) {
            if (k !== id && state.stops[k] === 'here') state.stops[k] = 'pending';
          });
        }
        save();
        renderTimeline();
        renderNow();
        updateTopProgress();
        return;
      }

      const wm = e.target.closest('[data-walkmode]');
      if (wm) {
        state.walkMode = wm.dataset.walkmode;
        save();
        renderTimeline();
        return;
      }

      const goto = e.target.closest('[data-goto-sight]');
      if (goto) {
        gotoSight(goto.dataset.gotoSight);
        return;
      }
    });

    /* Checklist */
    document.addEventListener('change', function (e) {
      const cb = e.target.closest('[data-check]');
      if (!cb) return;
      const id = cb.dataset.check;
      if (cb.checked) state.checks[id] = true; else delete state.checks[id];
      save();
      const label = cb.closest('.checkitem');
      if (label) label.classList.toggle('is-done', cb.checked);
      updateChecklistCount();
    });

    /* Toggles */
    const tgE = $('#tgEssentials');
    const tgL = $('#tgLate');

    tgE.setAttribute('aria-pressed', String(state.essentialsOnly));
    tgL.setAttribute('aria-pressed', String(state.late));

    tgE.addEventListener('click', function () {
      state.essentialsOnly = !state.essentialsOnly;
      tgE.setAttribute('aria-pressed', String(state.essentialsOnly));
      save();
      renderTimeline();
      renderNow();
      if (window.RouteMap) window.RouteMap.refresh(true);
    });

    tgL.addEventListener('click', function () {
      state.late = !state.late;
      tgL.setAttribute('aria-pressed', String(state.late));
      save();
      renderLateNote();
      renderTimeline();
      renderNow();
    });

    $('#startDay').addEventListener('click', function () { showView('now'); });

    $('#clReset').addEventListener('click', function () {
      if (!window.confirm('Clear all completed stops and checked sights?')) return;
      state.checks = {};
      state.stops = {};
      save();
      renderChecklist();
      renderTimeline();
      renderNow();
      updateTopProgress();
    });

    /* Deep-link on load */
    const hash = (location.hash || '').replace('#', '');
    if (['map', 'itinerary', 'now', 'learn', 'checklist'].indexOf(hash) >= 0) showView(hash);
  }

  function gotoSight(id) {
    showView('itinerary', { keepScroll: true });
    setTimeout(function () {
      const el = document.getElementById('sight-' + id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.style.transition = 'box-shadow .4s';
        el.style.boxShadow = '0 0 0 3px rgba(168,85,47,.45)';
        setTimeout(function () { el.style.boxShadow = ''; }, 1800);
      }
    }, 60);
  }

  function renderLateNote() {
    const el = $('#lateNote');
    if (!state.late) { el.innerHTML = ''; return; }
    el.innerHTML = '<div class="notice notice--warn" style="margin-top:9px">' +
      '<div class="notice__title">' + ICONS.warn + 'Running late — what to drop</div>' +
      '<ul style="margin:6px 0 0;padding-left:1.1em;font-size:13.5px">' +
      '<li>Skip the <strong>Baths of Rigena trail</strong> at Moutoullas (saves 35 min).</li>' +
      '<li>Take the <strong>short river walk</strong> at Kalopanayiotis, not the full one (saves 30 min).</li>' +
      '<li>Skip the <strong>Kykkos Museum</strong> (saves 30 min).</li>' +
      '<li>Skip <strong>Stavros tis Psokas</strong> on the way home (saves 30 min).</li>' +
      '<li>Eat at <strong>Pantheon</strong> rather than a long lunch (saves 20 min).</li>' +
      '</ul><p style="margin:9px 0 0;font-size:13.5px"><strong>Never drop:</strong> the two UNESCO ' +
      'churches, the bridge and springs, Kykkos, and Throni. That is the day.</p></div>';
  }

  /* -------------------------------------------------------------- INIT */

  function init() {
    renderHero();
    renderLateNote();
    renderTimeline();
    renderPractical();
    renderLearn();
    renderChecklist();
    renderNow();
    bind();
    updateTopProgress();
  }

  /* Expose for map.js */
  window.GuideApp = {
    mapsUrl: mapsUrl,
    gotoSight: gotoSight,
    allSights: ALL_SIGHTS,
    getState: function () { return state; },
    showView: showView
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
