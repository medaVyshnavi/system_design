// cache names
const CACHE_KEY = "ServiceWorkers/v2";

// add all the files to the cache
const FILES_LIST = [
  "./index.html",
  "./download.jpeg",
  "./index.css",
  "./script.js",
];

// on page load this is executed
self.addEventListener("install", (e) => {
  // installation will wait until ↓ is completed
  e.waitUntil(
    caches.open(CACHE_KEY).then((cache) => {
      // .open creates tables within the cache
      cache.addAll(FILES_LIST);
    })
  );
  
});

self.addEventListener("activate", (e) => {
  // clean up, remove all the previous cache 
  // caches.keys gives the list of caches in the cache storage
  e.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_KEY) {
            return caches.delete(key)
          }
        })
      )
    })
  )
});

self.addEventListener("fetch", (e) => {
  // offline experience
  // whenever the file is requested
  // 1. fetch from the network, update the cache
  // 2. when no network , use cache as fallback

  e.respondWith(
    fetch(e.request)
      .then((res) => { // on successfull network request
        // update the cache
        const clonedData = res.clone()
        caches.open(CACHE_KEY).then(cache => {
          cache.put(e.request, clonedData);
        })
        console.log("returning from network")
        return res
      })
      .catch(() => { // on network failure, check if data is present if yes return that
        console.log("returning from cache");
        return caches.match(e.request).then((file) => file)
    })
  )
})

// self.addEventListener("fetch", (e) => {
//   e.respondWith(
//     caches.match(e.request)
//       .then(response => {
//         return response || fetch(e.request)
//       })
//     )
// }
// )