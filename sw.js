// Service worker: existe para cumplir el requisito técnico de "instalar" la app.
// A diferencia de la versión anterior, ahora fuerza a que CADA carga (incluso
// abriendo la app instalada desde el ícono) traiga la versión más nueva del
// servidor, sin quedarse pegado a una copia vieja en caché del navegador.
self.addEventListener('install', (e) => {
  self.skipWaiting();
});
self.addEventListener('activate', (e) => {
  self.clients.claim();
});
self.addEventListener('fetch', (e) => {
  // "reload" le dice al navegador: no uses tu caché HTTP, andá siempre a
  // buscar la versión actual al servidor. Así la app instalada se actualiza
  // sola, sin tener que desinstalar ni borrar datos del sitio a mano.
  e.respondWith(
    fetch(e.request, { cache: 'reload' }).catch(() => fetch(e.request))
  );
});
