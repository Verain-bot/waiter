const cacheName = 'assets-v2.3'

const pathsToCache = [
    '/',
    '/static/js/bundle.js',
    '/static/media/bootstrap-icons.6d63d0501e5ed7b79dab.woff2',
    '/media/placeholderMenuItem.png',
    '/media/placeholderRestaurant.svg',
    '/logo.svg',
    '/index.html',
    '/favicon.ico',
    '/icon/1024.png',
    '/icon/512.png',
    '/icon/1080.png',
    '/icon/256.png',
    '/icon/192.png',
    '/icon/180.png',
    '/icon/152.png',
    '/static/media/logo.e7f24427f4309072a133c7e4ca36cedd.svg',
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