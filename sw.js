async function cachefile(){
    let cachedata= await caches.open("filesrec")
    cachedata.addAll([
        "/index.html",
        "/style.css",
        "/script.js",
        "/serviceworker.webmanifest",
        "/arun.png",
        "/mypic.png",
        "/20220625_083616.mp4",
        "/20220625_083106.mp4"
        

    ])

}
self.addEventListener("install",(e)=>{
    e.waitUntil(cachefile())
})
self.addEventListener("fetch",(e)=>{
     e.respondWith(caches.match(e.request))
})