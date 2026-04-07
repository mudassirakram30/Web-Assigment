// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCK_dJrBNWNboBA5l7oQoTnlFelUAHehwc",
  authDomain: "trade-empire-5b6a7.firebaseapp.com",
  projectId: "trade-empire-5b6a7",
  storageBucket: "trade-empire-5b6a7.firebasestorage.app",
  messagingSenderId: "371225382041",
  appId: "1:371225382041:web:2080befddc4eb5d107bc08",
  measurementId: "G-5RXL29JWTB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// Google Sign-In Function
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("User Info:", user);
      alert(`Hello ${user.displayName}! You are logged in.`);
      // Optional: save user to Firestore
      // import { doc, setDoc } from "firebase/firestore";
      // setDoc(doc(db, "users", user.uid), {
      //   name: user.displayName,
      //   email: user.email,
      //   photoURL: user.photoURL
      // });
    })
    .catch((error) => {
      console.error("Error during sign-in:", error);
      alert("Failed to sign in with Google.");
    });
};