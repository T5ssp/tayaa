// firebase-config.js
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE", // ضع هنا المفتاح الجديد من Firebase
  authDomain: "mandoos-store.firebaseapp.com",
  projectId: "mandoos-store",
  storageBucket: "mandoos-store.firebasestorage.app",
  messagingSenderId: "572507274540",
  appId: "1:572507274540:web:180969443265858c5c0089"
};

// حسابات المدير المصرح بها
export const firebaseAdminEmails = [
  "admin@tayya.om"
];

// تهيئة Firebase إذا لم يتم تهيئته مسبقاً
if (typeof firebase !== "undefined" && firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
