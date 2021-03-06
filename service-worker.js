// ServiceWorker処理：https://developers.google.com/web/fundamentals/primers/service-workers/?hl=ja

// キャッシュ名とキャッシュファイルの指定
var CACHE_NAME = 'tweet-pad-caches';
var urlsToCache = [
    'https://fonts.googleapis.com/css?family=Assistant:300|Montserrat',
    'https://code.jquery.com/jquery-3.2.1.min.js',
    '/tweet-pad/',
    '/tweet-pad/index.html',
    '/tweet-pad/css/style.css',
    '/tweet-pad/js/script.js',
    '/tweet-pad/fonts/feathericon.eot',
    '/tweet-pad/fonts/feathericon.svg',
    '/tweet-pad/fonts/feathericon.ttf',
    '/tweet-pad/fonts/feathericon.woff',
    '/tweet-pad/fonts/feathericon.woff2',
    '/tweet-pad/android-chrome-192x192.png',
    '/tweet-pad/android-chrome-256x256.png',
    '/tweet-pad/apple-touch-icon.png',
    '/tweet-pad/favicon-16x16.png',
    '/tweet-pad/favicon-32x32.png',
    '/tweet-pad/favicon.ico',
    '/tweet-pad/mstile-150x150.png',
    '/tweet-pad/safari-pinned-tab.svg'
];

// インストール処理
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                return response ? response : fetch(event.request);
            })
    );
});
