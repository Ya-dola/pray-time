// firebase-messaging-sw.js
// importScripts("../firebase-config.json");
// import { getMessaging } from "firebase/messaging";
// import { initializeApp } from "firebase/app";

importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js");

// firebase-messaging-sw.js
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing");
  event.waitUntil(
    fetch("/firebase-config.json")
      .then((response) => response.json())
      .then((firebaseConfig) => {
        console.log("firebaseConfig: ", firebaseConfig);
        const app = firebase.initializeApp(firebaseConfig);
        const messaging = firebase.messaging();
      }),
  );
});

//
// firebase.initializeApp({
//   apiKey: firebaseConfig.apiKey,
//   authDomain: firebaseConfig.authDomain,
//   projectId: firebaseConfig.projectId,
//   storageBucket: firebaseConfig.storageBucket,
//   messagingSenderId: firebaseConfig.messagingSenderId,
//   appId: firebaseConfig.appId,
// });
//
// const messaging = firebase.messaging();
