// Choose a cache name
const cacheName = 'cache-v1';
// List the files to precache
const precacheResources = [
  '/',
  '/app/',
  '/app/assets',
  '/app/index.html',
  '/app/script.js',
  'app/style.css',
  'app/assets/OpenSans.ttf',
 /* '/favicon.ico',
  '/manifest.json', */
];

// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener('install', (event) => {
  console.log('Service worker install event!');

  //for (var i=0; i< precacheResources.length;i++){
  event.waitUntil(
    caches.open(cacheName)
      .then(
        (cache) => cache.addAll(precacheResources)
      )
  );
  //}

});

self.addEventListener('activate', (event) => {
  console.log('Service worker activate event!');
});

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', (event) => {
  console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    }),
  );
});
