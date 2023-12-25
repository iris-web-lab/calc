// Choose a cache name
const cacheName = 'cache-v5';
const version = 5;
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
];

// When the service worker is installing, open the cache and add the precache resources to it
//self.addEventListener('install', (event) => {
//  console.log('Service worker install event!');
//  event.waitUntil(
//    caches.then((cache) => {cache.addAll(precacheResources)})
//  );
//});


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
        cacheNames.filter((cacheName) => cacheName !== cacheName)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', (event) => {
  if (event.request.url.startsWith('https://www.google-analytics.com')) {
    return;
  }
  if (event.request.url.startsWith('https://www.googletagmanager.com')) {
    return;
  }
  console.log('Fetch intercepted for:', event.request.url);
  console.log(event.request);


event.respondWith(
    caches.open(cacheName).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {

          cache.put(event.request, response.clone());
          return response;

        });
      });
    })
  );

  
/*  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    }).catch((error) => {
      console.log("It seems something went wrong.", error);

    }),
  ); */
});
