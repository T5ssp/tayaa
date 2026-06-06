export const firebaseConfig = {
  apiKey: "",
  authDomain: "mandoos-store.firebaseapp.com",
  projectId: "mandoos-store",
  storageBucket: "mandoos-store.firebasestorage.app",
  messagingSenderId: "",
  appId: ""
};

export const firebaseAdminEmails = [
  "admin@tayya.om"
];

if (typeof firebase !== "undefined" && firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
