// Patch Live : fonctionne hors ligne. La page est toujours prise sur le réseau quand il y en a (mises à jour immédiates),
// sinon dans le cache ; les bibliothèques et polices sont gardées en cache.
const CACHE = "patch-live-f2d272e312";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.4.0/exceljs.min.js"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  if (/dropbox(api)?\.com$/.test(u.hostname)) return;
  if (e.request.mode === "navigate" || (u.origin === location.origin && /\/(index\.html)?$/.test(u.pathname))) {
    // cache "no-cache" : on redemande toujours la page au serveur, sans passer par le cache HTTP du navigateur (10 min sur GitHub Pages)
    e.respondWith(fetch(u.origin === location.origin ? u.href.split("#")[0] : e.request, { cache: "no-cache", credentials: "same-origin" }).then((r) => { if (r.ok) { const c = r.clone(); caches.open(CACHE).then((ca) => ca.put("./index.html", c)); } return r; }).catch(() => caches.match("./index.html")));
    return;
  }
  if (u.origin === location.origin || /cdnjs\.cloudflare\.com|fonts\.(googleapis|gstatic)\.com/.test(u.hostname)) {
    e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request).then((r) => { if (r.ok || r.type === "opaque") { const c = r.clone(); caches.open(CACHE).then((ca) => ca.put(e.request, c)); } return r; })));
  }
});
