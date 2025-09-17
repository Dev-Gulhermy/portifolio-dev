const CACHE_NAME = "portfolio-cache-v2";
const urlsToCache = [
  "/",
  "/index.html",
  "/components/styles/main.css",
  "/components/styles/responsivo.css",
  "/components/styles/efeitos.css",
  "/components/styles/variables.css",
  "/components/styles/section.css",
  "/components/scripts/script.js",
  "/components/scripts/particles.min.js",
  "/img/foto-perfil.png",
  "/img/project-1-P-atualizada.png",
  "/img/project-2-P-atualizada.png",
  "/img/project-3-P-atualizada.png",
  "/img/project-4-P-atualizada.png",
  "/img/project-1-M.png",
  "/img/project-2-M.png",
  "/img/project-3-M.png",
  "/img/project-4-M.png"
];

// Instala o service worker e adiciona arquivos ao cache
self.addEventListener("install", (event) => {
  console.log("[ServiceWorker] Install");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log("[ServiceWorker] Caching app shell");
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});
/*
event.waitUntil(
  caches.open(CACHE_NAME).then((cache) => {
    return Promise.allSettled(
      urlsToCache.map((url) => cache.add(url))
    );
  })
);
*/

// Ativa o SW e limpa caches antigos
self.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] Activate");
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log("[ServiceWorker] Deleting old cache:", name);
            return caches.delete(name);
          }
        })
      )
    )
  );
  return self.clients.claim();
});

// Intercepta requisições
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        // Retorna do cache
        return response;
      }
      // Se não estiver no cache, busca na rede
      return fetch(event.request).then((networkResponse) => {
        // Atualiza cache dinamicamente
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    }).catch(() => {
      // Fallback caso não haja cache nem rede
      return caches.match("/index.html");
    })
  );
});