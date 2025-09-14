
self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] Install');
    self.skipWaiting(); // 즉시 활성화
  });
  
  self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activate');
  });
  
  self.addEventListener('fetch', (event) => {
    // 요청을 그대로 네트워크로 보냄 (기본 동작)
  });
  