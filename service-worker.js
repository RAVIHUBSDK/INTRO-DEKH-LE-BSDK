const CACHE_NAME = 'ravi-king-profile-v5';
const CORE_FILES = ['./', './index.html', './manifest.webmanifest', './ravi-profile.png', './ravi-profile-192.png', './ravi-profile-512.png'];
const OFFLINE_DESTINATIONS = new Set(['script', 'style', 'image', 'font']);
self.addEventListener('install', event => {
  event.waitUntil((async () => { const cache=await caches.open(CACHE_NAME); const urls=CORE_FILES.map(path=>new URL(path,self.registration.scope).href); await cache.addAll(urls); await self.skipWaiting(); })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => { const keys=await caches.keys(); await Promise.all(keys.filter(key=>key.startsWith('ravi-king-profile-')&&key!==CACHE_NAME).map(key=>caches.delete(key))); await self.clients.claim(); })());
});
self.addEventListener('fetch', event => {
  const request=event.request;
  if(request.method!=='GET') return;
  const url=new URL(request.url);
  // Do not cache counter/engagement APIs or any personal submissions.
  if(url.hostname.includes('counterapi.dev') || url.pathname.includes('/engagement')) return;
  const sameOrigin=url.origin===self.location.origin;
  const staticAsset=OFFLINE_DESTINATIONS.has(request.destination);
  const pageNavigation=request.mode==='navigate';
  if(!sameOrigin && !staticAsset) return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE_NAME);
    try {
      const fresh=await fetch(request);
      if(fresh && (fresh.ok || fresh.type==='opaque')) cache.put(request,fresh.clone()).catch(()=>{});
      return fresh;
    } catch(error) {
      const saved=await cache.match(request);
      if(saved) return saved;
      if(pageNavigation) { const shell=await cache.match(new URL('./index.html',self.registration.scope).href); if(shell) return shell; }
      return Response.error();
    }
  })());
});
