const CACHE_NAME = 'wave-v1';
const ASSETS = [
  './',
  './index.html',
  './assets/js/tailwindcss.js',
  './assets/css/fontawesome.css',
  './assets/webfonts/fa-solid-900.woff2',
  './assets/webfonts/fa-regular-400.woff2',
  './assets/webfonts/fa-brands-400.woff2'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request).catch(() => {
        // Optional: Return offline page if needed
      });
    })
  );
});