export async function subscribeUser() {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.error("Permission not granted for notifications");
      return;
    }

    const registration = await navigator.serviceWorker.register(
      "/service-worker.js"
    );
    console.log("Service Worker registered", registration);

    const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY; // Vite way to read env
    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey,
    });

    console.log("Subscription:", subscription);

    const response = await fetch("/api/notifications/webpush", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add your auth header if needed:
        // 'Authorization': 'Bearer YOUR-JWT',
      },
      body: JSON.stringify({
        subscription,
        title: "Hello!",
        body: "Your first push notification works 🚀",
      }),
    });

    const result = await response.json();
    console.log("Push response:", result);
  } catch (error) {
    console.error("Subscription failed:", error);
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}
