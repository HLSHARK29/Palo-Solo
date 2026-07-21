// Aumentamos la versión a v2 para invalidar la caché anterior en los navegadores
const CACHE_NAME = 'palo-solo-v2'; 

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json?v=2', // Referencia actualizada con el parámetro ?v=2
  './assets/icon-192x192.png?v=2', // Referencia actualizada con el parámetro ?v=2
  './assets/icon-512x512.png?v=2', // Referencia actualizada con el parámetro ?v=2
  'https://cdn.jsdelivr.net/npm/chart.js'
];

// Instalación: Cachear archivos esenciales
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activación: Limpiar cachés antiguos
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch: Estrategia Stale-While-Revalidate
self.addEventListener('fetch', (e) => {
  // Ignorar las peticiones a Firestore (Firebase) para evitar errores
  if (e.request.url.includes('firestore.googleapis.com')) {
    return;
  }

  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      const fetchPromise = fetch(e.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(e.request, networkResponse.clone());
          return networkResponse;
        });
      });
      return cachedResponse || fetchPromise;
    })
  );
});