import { firebaseAdminEmails, firebaseConfig } from "./firebase-config.js";

const FIREBASE_VERSION = "10.12.5";
const SDK = {
  app: `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-app.js`,
  auth: `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-auth.js`,
  firestore: `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-firestore.js`
};

let modules = null;
let app = null;
let auth = null;
let db = null;
let recaptchaVerifier = null;

export function isFirebaseConfigured() {
  return ["apiKey", "authDomain", "projectId", "storageBucket", "messagingSenderId", "appId"].every((key) => {
    const value = String(firebaseConfig?.[key] || "").trim();
    return value && !value.startsWith("PASTE_") && !value.startsWith("YOUR_");
  });
}

async function ensureFirebase() {
  if (!isFirebaseConfigured()) throw new Error("Firebase config is missing.");
  if (modules) return modules;

  const [appModule, authModule, firestoreModule] = await Promise.all([
    import(SDK.app),
    import(SDK.auth),
    import(SDK.firestore)
  ]);

  app = appModule.initializeApp(firebaseConfig);
  auth = authModule.getAuth(app);
  db = firestoreModule.getFirestore(app);
  auth.languageCode = "ar";
  modules = { appModule, authModule, firestoreModule };
  return modules;
}

export async function onAuthStateChange(callback) {
  const { authModule } = await ensureFirebase();
  return authModule.onAuthStateChanged(auth, async (user) => {
    callback(user ? await toProfile(user) : null);
  });
}

export async function signInWithGoogle() {
  const { authModule } = await ensureFirebase();
  const provider = new authModule.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  return signInWithProvider(provider);
}

export async function signInWithFacebook() {
  const { authModule } = await ensureFirebase();
  const provider = new authModule.FacebookAuthProvider();
  return signInWithProvider(provider);
}

export async function signInWithApple() {
  const { authModule } = await ensureFirebase();
  const provider = new authModule.OAuthProvider("apple.com");
  provider.addScope("email");
  provider.addScope("name");
  return signInWithProvider(provider);
}

export async function signInWithEmail(email, password) {
  const { authModule } = await ensureFirebase();
  const result = await authModule.signInWithEmailAndPassword(auth, email, password);
  return toProfile(result.user);
}

export async function registerWithEmail(email, password, name) {
  const { authModule } = await ensureFirebase();
  const result = await authModule.createUserWithEmailAndPassword(auth, email, password);
  if (name) await authModule.updateProfile(result.user, { displayName: name });
  const profile = await toProfile(result.user);
  await saveUserProfile({ ...profile, name: name || profile.name });
  return { ...profile, name: name || profile.name };
}

export async function resetPassword(email) {
  const { authModule } = await ensureFirebase();
  return authModule.sendPasswordResetEmail(auth, email, {
    url: `${window.location.origin}${window.location.pathname.replace(/[^/]+$/, "")}login.html`
  });
}

export async function sendPhoneCode(phone, containerId) {
  const { authModule } = await ensureFirebase();
  if (!recaptchaVerifier) {
    recaptchaVerifier = new authModule.RecaptchaVerifier(auth, containerId, {
      size: "normal"
    });
  }
  return authModule.signInWithPhoneNumber(auth, phone, recaptchaVerifier);
}

export async function confirmPhoneCode(confirmation, code) {
  const result = await confirmation.confirm(code);
  return toProfile(result.user);
}

export async function signOutUser() {
  const { authModule } = await ensureFirebase();
  return authModule.signOut(auth);
}

async function signInWithProvider(provider) {
  const { authModule } = await ensureFirebase();
  const result = await authModule.signInWithPopup(auth, provider);
  return toProfile(result.user);
}

export async function saveUserProfile(profile, extras = {}) {
  const { firestoreModule } = await ensureFirebase();
  const user = auth.currentUser;
  if (!user) return;
  const ref = firestoreModule.doc(db, "users", user.uid);
  await firestoreModule.setDoc(ref, {
    name: profile.name || user.displayName || "",
    email: profile.email || user.email || "",
    phone: profile.phone || user.phoneNumber || "",
    provider: profile.provider || user.providerData?.[0]?.providerId || "email",
    addresses: extras.addresses || profile.addresses || [],
    orders: extras.orders || profile.orders || [],
    updatedAt: firestoreModule.serverTimestamp()
  }, { merge: true });
}

export async function subscribeProducts(callback, onError) {
  const { firestoreModule } = await ensureFirebase();
  const ref = firestoreModule.collection(db, "products");
  return firestoreModule.onSnapshot(ref, (snapshot) => {
    const products = snapshot.docs
      .map((docSnap) => normalizeProduct(docSnap.id, docSnap.data()))
      .sort((a, b) => a.title.localeCompare(b.title, "ar"));
    callback(products);
  }, onError);
}

export async function subscribeUsers(callback, onError) {
  const { firestoreModule } = await ensureFirebase();
  const ref = firestoreModule.collection(db, "users");
  return firestoreModule.onSnapshot(ref, (snapshot) => {
    const users = snapshot.docs
      .map((docSnap) => ({ uid: docSnap.id, ...docSnap.data() }))
      .sort((a, b) => String(a.email || a.name || "").localeCompare(String(b.email || b.name || ""), "ar"));
    callback(users);
  }, onError);
}

export async function subscribeAdmins(callback, onError) {
  const { firestoreModule } = await ensureFirebase();
  const ref = firestoreModule.collection(db, "admins");
  return firestoreModule.onSnapshot(ref, (snapshot) => {
    const admins = snapshot.docs
      .map((docSnap) => ({ uid: docSnap.id, ...docSnap.data() }))
      .sort((a, b) => String(a.email || a.name || "").localeCompare(String(b.email || b.name || ""), "ar"));
    callback(admins);
  }, onError);
}

export async function subscribeOrders(callback, onError) {
  const { firestoreModule } = await ensureFirebase();
  const ref = firestoreModule.collection(db, "orders");
  return firestoreModule.onSnapshot(ref, (snapshot) => {
    const orders = snapshot.docs
      .map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }))
      .sort((a, b) => String(b.createdAt?.seconds || b.createdAt || "").localeCompare(String(a.createdAt?.seconds || a.createdAt || "")));
    callback(orders);
  }, onError);
}

export async function addProduct(product) {
  const { firestoreModule } = await ensureFirebase();
  const ref = firestoreModule.collection(db, "products");
  return firestoreModule.addDoc(ref, {
    ...cleanProduct(product),
    createdAt: firestoreModule.serverTimestamp(),
    updatedAt: firestoreModule.serverTimestamp()
  });
}

export async function updateProduct(id, product) {
  const { firestoreModule } = await ensureFirebase();
  const ref = firestoreModule.doc(db, "products", id);
  return firestoreModule.updateDoc(ref, {
    ...cleanProduct(product),
    updatedAt: firestoreModule.serverTimestamp()
  });
}

export async function deleteProduct(id) {
  const { firestoreModule } = await ensureFirebase();
  return firestoreModule.deleteDoc(firestoreModule.doc(db, "products", id));
}

export async function seedProducts(products) {
  const { firestoreModule } = await ensureFirebase();
  const batch = firestoreModule.writeBatch(db);
  products.forEach((product) => {
    const ref = firestoreModule.doc(db, "products", product.id);
    batch.set(ref, {
      ...cleanProduct(product),
      createdAt: firestoreModule.serverTimestamp(),
      updatedAt: firestoreModule.serverTimestamp()
    }, { merge: true });
  });
  return batch.commit();
}

export async function createOrder(order) {
  const { firestoreModule } = await ensureFirebase();
  const user = auth.currentUser;
  const ref = firestoreModule.collection(db, "orders");
  return firestoreModule.addDoc(ref, {
    ...order,
    userId: user?.uid || "",
    userEmail: user?.email || order.customer?.email || "",
    createdAt: firestoreModule.serverTimestamp(),
    updatedAt: firestoreModule.serverTimestamp()
  });
}

export async function grantAdmin(uid, data = {}) {
  const { firestoreModule } = await ensureFirebase();
  const current = auth.currentUser;
  if (!current) throw new Error("Admin login is required.");
  const ref = firestoreModule.doc(db, "admins", uid);
  return firestoreModule.setDoc(ref, {
    uid,
    name: String(data.name || "").trim(),
    email: String(data.email || "").trim(),
    grantedBy: current.uid,
    grantedByEmail: current.email || "",
    updatedAt: firestoreModule.serverTimestamp()
  }, { merge: true });
}

export async function revokeAdmin(uid) {
  const { firestoreModule } = await ensureFirebase();
  return firestoreModule.deleteDoc(firestoreModule.doc(db, "admins", uid));
}

async function toProfile(user) {
  const { firestoreModule } = await ensureFirebase();
  const token = await user.getIdTokenResult().catch(() => ({ claims: {} }));
  const savedSnap = await firestoreModule.getDoc(firestoreModule.doc(db, "users", user.uid)).catch(() => null);
  const adminSnap = await firestoreModule.getDoc(firestoreModule.doc(db, "admins", user.uid)).catch(() => null);
  const saved = savedSnap?.exists?.() ? savedSnap.data() : {};
  const email = user.email || saved.email || "";
  return {
    uid: user.uid,
    name: saved.name || user.displayName || email.split("@")[0] || user.phoneNumber || "عميل طَيّة",
    email,
    phone: user.phoneNumber || saved.phone || "",
    provider: user.providerData?.[0]?.providerId || saved.provider || "email",
    addresses: Array.isArray(saved.addresses) ? saved.addresses : [],
    orders: Array.isArray(saved.orders) ? saved.orders : [],
    isAdmin: token.claims?.admin === true || adminSnap?.exists?.() === true || firebaseAdminEmails.includes(email)
  };
}

function cleanProduct(product) {
  const name = String(product.name || product.title || "").trim();
  return {
    name,
    title: name,
    category: String(product.category || "العطور").trim(),
    price: Number(product.price || 0),
    image: String(product.image || "").trim(),
    badge: String(product.badge || "متوفر").trim(),
    description: String(product.description || "").trim(),
    material: String(product.material || "").trim(),
    color: String(product.color || "").trim(),
    stock: Number(product.stock || 0)
  };
}

function normalizeProduct(id, data) {
  const product = cleanProduct(data);
  return {
    id,
    ...product,
    title: product.title || "منتج بدون اسم",
    image: product.image || "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=85",
    description: product.description || "منتج مختار بعناية من متجر طَيّة.",
    material: product.material || "خامة مختارة",
    color: product.color || "متعدد",
    badge: product.badge || "متوفر"
  };
}
