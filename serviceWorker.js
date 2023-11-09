const staticCalc = "calculator-v1"
const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticCalc).then(cache => {
      cache.addAll(assets)
    })
  )
})
