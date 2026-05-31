/* ============================================
   FIREBASE-CONFIG.JS — Firebase initialization
   ============================================ */

const firebaseConfig = {
  apiKey: "AIzaSyB9xRLecm9Dle8kZeWGeA6WhWzxavO549Y",
  authDomain: "motanka-store-1d9e9.firebaseapp.com",
  projectId: "motanka-store-1d9e9",
  storageBucket: "motanka-store-1d9e9.firebasestorage.app",
  messagingSenderId: "675749830401",
  appId: "1:675749830401:web:226c35f7beb5972d184500",
  measurementId: "G-WTYMMREMN7",
};

firebase.initializeApp(firebaseConfig);

// Expose global db and auth instances (compat SDK)
const db = firebase.firestore();
const auth = firebase.auth();
