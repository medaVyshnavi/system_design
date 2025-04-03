// 0. Check if the service workers is supported by the browser
if (navigator.serviceWorker) {
  // 1. Register the service worker
  // pass the file of service worker that must be registered
  navigator.serviceWorker.register("./sw.js")
    .then(res => console.log("succefull"))
    .catch(err => console.log("error"))
}


