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
4. Open Firebase Console, then go to Project settings -> General -> Your apps -> Web app.
5. Copy the Web SDK config into `firebase-config.js`.
   - Keep `projectId` as `mandoos-store`.
   - Fill the missing `apiKey`, `messagingSenderId`, and `appId`.
   - Do not use the old leaked Google API key unless you rotated and restricted it.
   - Do not paste a service account JSON file into the website.
6. Publish Firestore rules based on `firestore.rules.example`.
7. Create the first admin account in Firebase Authentication:
   - Email: `admin@tayya.om`
   - Or replace this email in both `firebase-config.js` and `firestore.rules.example` with your real admin email.
8. Open `admin.html`, sign in with that first admin, then use the "المسؤولون والصلاحيات" section to grant Admin access to other users.

Optional: you can also give the admin user a custom claim:

```js
await admin.auth().setCustomUserClaims(uid, { admin: true });
```

`firebaseAdminEmails` in `firebase-config.js` helps the interface identify bootstrap admin emails. Real write protection comes from Firestore Rules through one of these:

- `request.auth.token.admin == true`
- an admin document at `admins/{uid}`
- the bootstrap email in `firestore.rules.example`

Never upload a Firebase service account JSON file to GitHub Pages or the public repository. Use service account keys only on a private server or local admin script.

Product document example:

```json
{
  "name": "الكَمِيم العماني",
  "price": 5,
  "image": "https://example.com/product.jpg",
  "category": "الكميم"
}
```
