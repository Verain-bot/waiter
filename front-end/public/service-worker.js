const cacheName = 'assets-v2.3'

const pathsToCache = [
    '/',
    '/static/js/bundle.js',
    '/static/media/placeholderRestaurant.d9bbbd70346fdfa9ddcf.jpeg',
    '/static/media/placeholderMenuItem.d9bbbd70346fdfa9ddcf.jpeg',
    '/static/media/bootstrap-icons.6d63d0501e5ed7b79dab.woff2',
    '/manifest.json',
    '/index.html',
    '/logo192.png',
    '/favicon.ico'
]

const addCache =async ()=>{
    const cache = await caches.open(cacheName)
    cache.addAll(pathsToCache)
}

const respondWithFun = async (event)=>{
        
    if(event.request.url.startsWith(self.location.origin))
    {
        const cache = await caches.open(cacheName)
        const response = await cache.match(event.request)

        //check if request host is same as current host

        if(response){
            console.log("fetchingLocally  ", event.request.url)
            return response    
        }
        try{
            console.log('fetching', event.request.url)
            return await fetch(event.request)
        }
        catch{
            const x = await cache.match('/')
            if (x)
                return x
        }
    }
    else{
        return fetch(event.request)
    }
}


self.addEventListener("install",(event)=>{
    event.waitUntil(addCache())
})

self.addEventListener("fetch",async (event)=>{
      event.respondWith(respondWithFun(event))  
})