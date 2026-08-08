/* Offline resilience.
 *
 * The point is simple: once the guide has been opened with a signal, the
 * itinerary, history, coordinates and checklist must stay readable in the
 * Setrachos gorge and across the Paphos Forest, where coverage is patchy.
 *
 *   HTML        -> network first, cache fallback (so updates land)
 *   Static/CDN  -> cache first (fast, and works with no signal)
 *   Map tiles   -> never cached; they are not ours to store, and the guide
 *                  is designed to be useful without them.
 */

const VERSION = 'marathasa-v1';
const CORE = [
  './',
  'index.html',
  'css/styles.css',
  'js/data.js',
  'js/app.js',
  'js/map.js',
  'js/sun.js',
  'manifest.webmanifest',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(VERSION).then(function (cache) {
      // Cache core files individually so one CDN failure cannot abort the install.
      return Promise.all(CORE.map(function (url) {
        return cache.add(new Request(url, { mode: url.startsWith('http') ? 'cors' : 'same-origin' }))
          .catch(function () { /* non-fatal */ });
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        return k === VERSION ? null : caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (event) {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Never cache map tiles or anything from Google.
  if (/tile\.openstreetmap\.org|tile\./.test(url.hostname) || /google\./.test(url.hostname)) {
    return;
  }

  // HTML: network first so the guide can be updated, cache as backup.
  const isHTML = req.mode === 'navigate' ||
                 (req.headers.get('accept') || '').indexOf('text/html') >= 0;

  if (isHTML) {
    event.respondWith(
      fetch(req)
        .then(function (res) {
          const copy = res.clone();
          caches.open(VERSION).then(function (c) { c.put(req, copy); }).catch(function () {});
          return res;
        })
        .catch(function () {
          return caches.match(req).then(function (hit) {
            return hit || caches.match('index.html');
          });
        })
    );
    return;
  }

  // Everything else: cache first, then network (and cache the result).
  event.respondWith(
    caches.match(req).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        if (res && (res.status === 200 || res.type === 'opaque')) {
          const copy = res.clone();
          caches.open(VERSION).then(function (c) { c.put(req, copy); }).catch(function () {});
        }
        return res;
      }).catch(function () { return hit; });
    })
  );
});
