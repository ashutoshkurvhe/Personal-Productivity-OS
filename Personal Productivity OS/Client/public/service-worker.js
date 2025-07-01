// public/service-worker.js

self.addEventListener("push", (event) => {
  const data = event.data.json();
  console.log("[Service Worker] Push received:", data);

  const options = {
    body: data.body,
    icon: "/icon.png", // optional
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});
