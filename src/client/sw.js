const CACHE = 'cache';
const requstToApiPattern = /\/api\//;
const requestToWebpackPattern = /webpack/;

const isNotRequestToApi = (event) => !event.request.url.match(requstToApiPattern);
const isNotRequestToWebpack = (event) => !event.request.url.match(requestToWebpackPattern);

function fromNetwork(request) {
  return new Promise((fulfill, reject) => {
    fetch(request).then((response) => {
      fulfill(response);
    }, reject);
  });
}

function fromCache(request) {
  return caches
    .open(CACHE)
    .then((cache) => cache.match(request).then((matching) => matching || fromNetwork(request)));
}

function update(request) {
  return caches
    .open(CACHE)
    .then((cache) => fetch(request).then((response) => cache.put(request, response)));
}

self.addEventListener('fetch', (event) => {
  if (isNotRequestToApi(event) && isNotRequestToWebpack(event)) {
    event.respondWith(fromCache(event.request));
    event.waitUntil(update(event.request));
  }
});
