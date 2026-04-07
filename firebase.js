// ============================================================
//   TRADE EMPIRE — firebase.js
//   Handles: Login, Signup, Google Auth, Firestore Save
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
         signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut
       } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, serverTimestamp
       } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ===== CONFIG =====
const firebaseConfig = {
  apiKey:            "AIzaSyCK_dJrBNWNboBA5l7oQoTnlFelUAHehwc",
  authDomain:        "trade-empire-5b6a7.firebaseapp.com",
  projectId:         "trade-empire-5b6a7",
  storageBucket:     "trade-empire-5b6a7.firebasestorage.app",
  messagingSenderId: "371225382041",
  appId:             "1:371225382041:web:2080befddc4eb5d107bc08",
  measurementId:     "G-5RXL29JWTB"
};

// ===== INIT =====
const app      = initializeApp(firebaseConfig);
const auth     = getAuth(app);
const db       = getFirestore(app);
const provider = new GoogleAuthProvider();

// ============================================================
//   HELPER — User data Firestore main save karo
// ============================================================
async function saveUserToFirestore(user, extraData = {}) {
  const userRef = doc(db, "users", user.uid);

  // Agar user pehle se exist karta hai toh dobara overwrite mat karo
  const snap = await getDoc(userRef);
  if (snap.exists()) return;

  await setDoc(userRef, {
    uid:         user.uid,
    name:        user.displayName  || extraData.name || "N/A",
    email:       user.email,
    photoURL:    user.photoURL     || "",
    provider:    extraData.provider || "email",
    createdAt:   serverTimestamp(),
    lastLogin:   serverTimestamp(),
  });
}

// ============================================================
//   HELPER — Last login update karo
// ============================================================
async function updateLastLogin(uid) {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, { lastLogin: serverTimestamp() }, { merge: true });
}

// ============================================================
//   1. SIGNUP — Email & Password
// ============================================================
async function signupWithEmail(name, email, password) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user   = result.user;

    await saveUserToFirestore(user, { name, provider: "email" });

    showMessage("Account ban gaya! Welcome to Trade Empire 🎉", "success");
    setTimeout(() => window.location.href = "../index.html", 1500);

  } catch (err) {
    showMessage(firebaseError(err.code), "error");
  }
}

// ============================================================
//   2. LOGIN — Email & Password
// ============================================================
async function loginWithEmail(email, password) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await updateLastLogin(result.user.uid);

    showMessage("Login successful! Welcome back 👋", "success");
    setTimeout(() => window.location.href = "../index.html", 1500);

  } catch (err) {
    showMessage(firebaseError(err.code), "error");
  }
}

// ============================================================
//   3. GOOGLE AUTH — Login & Signup dono
// ============================================================
async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user   = result.user;

    await saveUserToFirestore(user, { provider: "google" });
    await updateLastLogin(user.uid);

    showMessage("Google se login ho gaya! 🎉", "success");
    setTimeout(() => window.location.href = "../index.html", 1500);

  } catch (err) {
    showMessage(firebaseError(err.code), "error");
  }
}

// ============================================================
//   4. LOGOUT
// ============================================================
async function logout() {
  await signOut(auth);
  window.location.href = "../Login Page/login.html";
}

// ============================================================
//   5. AUTH STATE — User logged in hai ya nahi check karo
//   Is function ko kisi bhi page pe call karo
// ============================================================
function checkAuthState(callbackLoggedIn, callbackLoggedOut) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      callbackLoggedIn(user);
    } else {
      if (callbackLoggedOut) callbackLoggedOut();
    }
  });
}

// ============================================================
//   HELPER — Firebase error codes ko Urdu/English mein
// ============================================================
function firebaseError(code) {
  const errors = {
    "auth/email-already-in-use":    "Yeh email pehle se register hai.",
    "auth/invalid-email":           "Email format galat hai.",
    "auth/weak-password":           "Password kam az kam 6 characters ka hona chahiye.",
    "auth/user-not-found":          "Yeh email registered nahi hai.",
    "auth/wrong-password":          "Password galat hai.",
    "auth/invalid-credential":      "Email ya password galat hai.",
    "auth/popup-closed-by-user":    "Google popup band ho gaya, dobara try karo.",
    "auth/network-request-failed":  "Internet connection check karo.",
    "auth/too-many-requests":       "Bahut zyada attempts. Thodi der baad try karo.",
  };
  return errors[code] || "Kuch masla aa gaya, dobara try karo.";
}

// ============================================================
//   HELPER — Message show karo (success / error)
//   Yeh ek toast/alert style message show karta hai
// ============================================================
function showMessage(msg, type = "success") {
  // Agar pehle se koi message hai toh hatao
  const old = document.getElementById("te-toast");
  if (old) old.remove();

  const toast = document.createElement("div");
  toast.id = "te-toast";
  toast.innerText = msg;
  toast.style.cssText = `
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
    background: ${type === "success" ? "#42c279" : "#e74c3c"};
    color: #fff; padding: 14px 28px; border-radius: 30px;
    font-family: 'DM Sans', sans-serif; font-size: .95rem; font-weight: 600;
    box-shadow: 0 8px 30px rgba(0,0,0,.2); z-index: 9999;
    animation: fadeInUp .3s ease;
  `;

  // Animation style inject karo agar nahi hai
  if (!document.getElementById("te-toast-style")) {
    const style = document.createElement("style");
    style.id = "te-toast-style";
    style.innerHTML = `
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateX(-50%) translateY(20px); }
        to   { opacity: 1; transform: translateX(-50%) translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// ============================================================
//   EXPORTS — Dono pages se yeh functions call honge
// ============================================================
export { signupWithEmail, loginWithEmail, loginWithGoogle, logout, checkAuthState };