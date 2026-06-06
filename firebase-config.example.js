export const firebaseConfig = {
  apiKey: "PASTE_MANDOOS_STORE_WEB_API_KEY",
  authDomain: "mandoos-store.firebaseapp.com",
  projectId: "mandoos-store",
  storageBucket: "mandoos-store.firebasestorage.app",
  messagingSenderId: "PASTE_MANDOOS_STORE_SENDER_ID",
  appId: "PASTE_MANDOOS_STORE_APP_ID"
};

export const firebaseAdminEmails = [
  "admin@tayya.om"
];

if (typeof firebase !== "undefined" && firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
