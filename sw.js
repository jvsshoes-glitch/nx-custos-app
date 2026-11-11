// Service worker do app de celular: sempre busca a versão nova na internet; sem internet, abre a última guardada.
// Os dados (Supabase) nunca ficam guardados aqui.
const CACHE = 'nx-custos-1.0.3-1794428041918'
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()))
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url)
  if (e.request.method !== 'GET' || url.origin !== location.origin) return
  e.respondWith(fetch(e.request).then((r) => {
    if (r.ok) { const copia = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copia)) }
    return r
  }).catch(() => caches.match(e.request).then((r) => r || caches.match('./'))))
})
