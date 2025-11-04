// ==========================
// Service Worker: App Shell + Dynamic Cache (SWR + fallback imagens)
// ==========================

// --- CONFIGURAÇÃO ---
const DEBUG = true;

const APP_SHELL_CACHE = "portfolio-appshell-v3";
const DYNAMIC_CACHE = "portfolio-dynamic-v2";
const MAX_DYNAMIC_ITEMS = 50; // limite de itens dinâmico
const FALLBACK_IMAGE = "/img/offline.png"; // imagem placeholder

const urlsToCache = [
  "/",
  "/index.html",
  "/components/styles/style-min.css",
  "/components/styles/responsivo.css",
  "/components/styles/efeitos.css",
  "/components/styles/variables.css",
  "/components/scripts/script.js",
  "/components/scripts/particles.min.js",
  "/img/foto-perfil_400x400.webp",
  "/img/project-1-P-atualizada.webp",
  "/img/project-2-P-atualizada.webp",
  "/img/project-3-P-atualizada.webp",
  "/img/project-4-P-atualizada.webp",
  "/img/project-1-M.webp",
  "/img/project-2-M.webp",
  "/img/project-3-M.webp",
  "/img/project-4-M.webp",
  "/icons/css3.svg",
  "/icons/facebok.svg",
  "/icons/git.svg",
  "/icons/github.svg",
  "/icons/google-plus-g.svg",
  "/icons/html5.svg",
  "/icons/instagram.svg",
  "/icons/js.svg",
  "/icons/linkkedin-in.svg",
  "/icons/twitter.svg",
  "/icons/whatsapp.svg",
  "/favicons/favicon-16x16.png",
  "/favicons/favicon-32-v1.png",
  "/favicons/favicon-48-v1.png",
  "/favicons/favicon.ico",
  FALLBACK_IMAGE // placeholder sempre no app shell
];

// --- HELPERS DE LOG ---
function swLog(...args) { if (DEBUG) console.log("[SW]", ...args); }
function swWarn(...args) { if (DEBUG) console.warn("[SW]", ...args); }

// Limita o tamanho do cache dinâmico
async function limitCacheSize(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  let keys = await cache.keys();
  while (keys.length > maxItems) {
    const requestToDelete = keys.shift();
    await cache.delete(requestToDelete);
    swLog(`🗑 Removido do cache (${cacheName}): ${requestToDelete.url}`);
  }
}

// ==========================
// INSTALL: cache do app shell
// ==========================
self.addEventListener("install", (event) => {
  swLog("Install");
  event.waitUntil(
    caches.open(APP_SHELL_CACHE).then((cache) => {
      swLog("Caching app shell (Promise.allSettled)");
      return Promise.allSettled(
        urlsToCache.map((url) =>
          cache.add(url)
            .then(() => ({ url, status: "fulfilled" }))
            .catch((err) => ({ url, status: "rejected", reason: err }))
        )
      ).then((results) => {
        const ok = results.filter(r => r.status === "fulfilled").length;
        const fail = results.filter(r => r.status === "rejected").length;
        swLog(`📦 App shell cache finalizado: ${ok} sucesso(s), ${fail} falha(s).`);
      });
    }).then(() => self.skipWaiting())
  );
});

// ==========================
// ACTIVATE: limpa caches antigos
// ==========================
self.addEventListener("activate", (event) => {
  swLog("Activate");
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== APP_SHELL_CACHE && name !== DYNAMIC_CACHE) {
            swLog("Deleting old cache:", name);
            return caches.delete(name);
          }
        })
      )
    )
  );
  return self.clients.claim();
});

// ==========================
// FETCH: network-first (HTML) / SWR para recursos / fallback imagens
// ==========================
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const request = event.request;
  const acceptHeader = request.headers.get("accept") || "";

  // --- NAVIGATION (HTML) -> network-first ---
  if (request.mode === "navigate" || acceptHeader.includes("text/html")) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, copy);
              swLog(`🆕 (nav) Adicionado ao cache dinâmico: ${request.url}`);
              limitCacheSize(DYNAMIC_CACHE, MAX_DYNAMIC_ITEMS);
            });
          }
          return networkResponse;
        })
        .catch(() => caches.match("/index.html"))
    );
    return;
  }

  // --- SWR + fallback imagens ---
  event.respondWith(
    caches.match(request).then((cachedResp) => {
      if (cachedResp) {
        // Stale-while-revalidate: busca atualização em paralelo
        fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(DYNAMIC_CACHE).then((cache) => {
                cache.put(request, networkResponse.clone());
                swLog(`🆕 SWR atualização: ${request.url}`);
                limitCacheSize(DYNAMIC_CACHE, MAX_DYNAMIC_ITEMS);
              });
            }
          })
          .catch(() => { }); // ignora falhas em background
        return cachedResp;
      }

      // Se não existe no cache, busca rede
      return fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, responseClone);
              swLog(`🆕 Adicionado dinamicamente: ${request.url}`);
              limitCacheSize(DYNAMIC_CACHE, MAX_DYNAMIC_ITEMS);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // fallback para imagens
          if (request.destination === "image") {
            return caches.match(FALLBACK_IMAGE);
          }
          return caches.match("/index.html");
        })
    })
  );
});
