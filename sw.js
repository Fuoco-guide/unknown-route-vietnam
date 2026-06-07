const CACHE = 'tur-vietnam-v2';
const BASE = '/unknown-route-vietnam';

self.addEventListener('install', e => {
  e.waitUntil(
    fetch(BASE + '/img-list.json')
      .then(r => r.json())
      .then(imgs => caches.open(CACHE).then(c =>
        c.addAll([BASE + '/', BASE + '/index.html', BASE + '/sw.js', ...imgs])
      ))
      .catch(() => caches.open(CACHE).then(c => c.add(BASE + '/index.html')))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached =>
      cached || fetch(e.request).then(res => {
        if (res.ok && e.request.method === 'GET') {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => cached)
    )
  );
});
