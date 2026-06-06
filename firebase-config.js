export const firebaseConfig = {
  apiKey: "AIzaSyBMDwwgiZ1i7jgysd3ez3Pnn7DgT80LGd8",
  authDomain: "mandoos-store.firebaseapp.com",
  projectId: "mandoos-store",
  storageBucket: "mandoos-store.firebasestorage.app",
  messagingSenderId: "572507274540",
  appId: "1:572507274540:web:180969443265858c5c0089"
};

// الحسابات المصرح لها بصلاحية المدير
export const firebaseAdminEmails = [
  "admin@tayya.om"
];

// تهيئة Firebase
if (typeof firebase !== "undefined" && firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
