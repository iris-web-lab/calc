// Choose a cache name
const version = 15;
const cacheName = 'cache-v' + version;

// List the files to precache
const precacheResources = [
  '/',
  '/index.html',
  '/script.js',
  '/style.css',
  '/OpenSans-Regular.woff',
  '/favicon.ico',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512-maskable.png',
  '/back.svg',
  'https://unpkg.com/mathjs@12.3.0/lib/browser/math.js',
];

addEventListener("install", (event) => {
  const preCache = async () => {
    const cache = await caches.open(cacheName);

    console.log(precacheResources);

    return cache.addAll(precacheResources);
  };
  event.waitUntil(preCache());
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activate event!');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== cacheName)
          .map((name) => caches.delete(name))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Ignore requests to Google Analytics and Google Tag Manager
  if (event.request.url.includes('google-analytics.com') || event.request.url.includes('googletagmanager.com')) {
    return;
  }

  console.log('Fetch intercepted for:', event.request.url);

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // If the requested resource is in the cache, return it
      if (cachedResponse) {
        console.log('Cache hit:', event.request.url);
        return cachedResponse;
      }

      // Otherwise, fetch the resource from the network
      return fetch(event.request).then((networkResponse) => {
        // Check if the response is valid
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          console.log('Fetch failed:', event.request.url);
          return networkResponse;
        }

        // Clone the response to store in the cache and return the original response
        const responseToCache = networkResponse.clone();

        // Open a cache and store the fetched resource for future use
        caches.open(cacheName).then((cache) => {
          console.log('Cache miss - storing:', event.request.url);
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      });
    })
  );
});
