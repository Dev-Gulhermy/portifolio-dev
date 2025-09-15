
// Nome do cache (troque o número quando atualizar os arquivos)
const CACHE_NAME = "portfolio-cache-v1";

// Lista de arquivos para cachear (adicione novos se precisar)
const urlsToCache = [
  "/",
  "/index.html",
  "/estilos/main.css",
  "/estilos/responsivo.css",
  "/estilos/efeitos.css",
  "/estilos/cabecalho.css",
  "/estilos/variaveis.css",
  "/estilos/secoes.css",
  "/scripts/script.js",
  "/scripts/particles.min.js",
  "/img/foto-perfil.png",
  "/img/project-1-P-atualizada.png",
  "/img/project-2-P-atualizada.png",
  "/img/project-3-P-updated.png",
  "/img/project-4-P-updated.png",
];

// Instala e adiciona os arquivos ao cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker: Cache instalado");
      return cache.addAll(urlsToCache);
    })
  );
});

// Ativa e remove caches antigos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log("Service Worker: Limpando cache antigo", name);
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Intercepta requisições e serve do cache quando possível
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
