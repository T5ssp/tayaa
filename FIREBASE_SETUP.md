# Firebase setup for TAYYA

1. Create a Firebase project and enable Firestore.
2. Enable Authentication providers:
   - Email/Password
   - Google
   - Facebook, if you have a Facebook app configured
   - Phone, with the domain added to Firebase authorized domains
3. Add these authorized domains in Firebase Authentication:
   - `localhost`
   - `t5ssp.github.io`
4. Copy `firebase-config.example.js` into `firebase-config.js`, then fill your Firebase web app config.
5. Publish Firestore rules based on `firestore.rules.example`.
6. Give the admin user a custom claim:

```js
await admin.auth().setCustomUserClaims(uid, { admin: true });
```

`firebaseAdminEmails` in `firebase-config.js` only helps the interface show the admin panel. Real write protection must come from Firestore Rules and the `admin` custom claim.

Product document example:

```json
{
  "name": "الكَمِيم العماني",
  "price": 5,
  "image": "https://example.com/product.jpg",
  "category": "الكميم"
}
```
