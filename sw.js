importScripts('./node_modules/workbox-sw/build/importScripts/workbox-sw.prod.v2.1.3.js')

const staticAssets = [
  './',
  './app.js',
  './styles.css',
  './fallback.json',
  './images/fetch-dog.jpg'
];

const wb = new WorkboxSW();

wb.precache(staticAssets);
wb.router.registerRoute('https://newsapi.org/(.*)', wb.stratagies.networkFirst());
wb.router.registerRoute(/.*\.(png|jpg|jpeg|gif)/, wb.stratagies.cacheFirst({
  cacheName: 'news images',
  cacheExpiration: {maxEntries: 20, maxAgeSeconds: 12 * 60 * 60},
  cacheableResponse: { statuses: [0, 200] }
}));
