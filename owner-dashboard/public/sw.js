const cacheName = 'assets-v2.3'


const pathsToCache = [
    '/restaurant/admin/orders/view',                            // Path for order dashboard
    '/static/bootstrap-icons-4d4572ef.woff',
    '/static/bootstrap-icons-bacd70af.woff2',
    '/static/index-03a4c9db.js',
    '/static/index-88e3c07b.css',
    '/static/favicon.ico',
    '/static/manifest.json',
]

const addCache = async () => {
    console.log("Adding cache")
    const cache = await caches.open(cacheName)
    cache.addAll(pathsToCache)
}

const respondWithFun = async (event) => {
    
        const cache = await caches.open(cacheName)
        const response = await cache.match(event.request)

        if (response) {
            console.log("fetchingLocally  ", event.request.url)
            return response    
        }

        else {
            console.log("fetchingRemotely  ", event.request.url)
            return fetch(event.request)
        }

}

self.addEventListener("install", (event) => {
    event.waitUntil(addCache())
})

self.addEventListener("fetch", async (event) => {
    event.respondWith(respondWithFun(event))  
})