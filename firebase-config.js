export const firebaseConfig = {
  apiKey: "API_KEY_FROM_FIREBASE",
  authDomain: "mandoos-store.firebaseapp.com",
  projectId: "mandoos-store",
  storageBucket: "mandoos-store.firebasestorage.app",
  messagingSenderId: "572507274540",
  appId: "1:572507274540:web:180969443265858c5c0089"
};

export const firebaseAdminEmails = [
  "admin@tayya.om"
];

if (typeof firebase !== "undefined" && firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
