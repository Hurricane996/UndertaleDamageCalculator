if('serviceWorker' in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/js/sw.js").then(
            registration => console.log(`Successfully registered service worker ${registration}`), 
            err => console.log(`Failed to register service worker: ${err}`)
        );
    })
}