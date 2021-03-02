

'use strict';

const CACHE_NAME = 'cache-v1';

const FILES_TO_CACHE = [

	'index.html',
	'src/css/estilos.css',
	'src/img/1.jpg',
	'src/img/2.jpg',
	'src/img/3.jpg',
	'src/img/4.jpg',
	'src/img/5.jpg',
	'src/img/6.jpg',
	'src/img/7.jpg',
	'src/img/8.jpg'

]

self.addEventListener('install', function(event){

	console.log('[ServiceWorker] Instalado');

	event.waitUntil(

		caches.open(CACHE_NAME).then(function(cache){

			console.log('[ServiceWorker] Pre-cacheando');

			return cache.addAll(FILES_TO_CACHE);

		})

	);

	self.skipWaiting();

});

self.addEventListener('activate', function(event){

	console.log('[ServiceWorker] Activado');

	event.waitUntil(

		caches.keys().then(function(cachesNames){

			return Promise.all(

				cachesNames.map(function(cacheName){

					if(CACHE_NAME.indexOf(cacheName) === -1){

						console.log('[ServiceWorker] Eliminando antigua cache', key);

						return caches.delete(cacheName);

					}

				})

			);

		})

	);

	self.clients.claim();

});

self.addEventListener('fetch', function(event){

	console.log('[ServiceWorker] Cacheado', event.request.url);

	event.respondWith(

		caches.match(event.request).then(function(response){

			if(response){

				return response;

			}

			return fetch(event.request);

		})

	);

});

