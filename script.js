// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Your Firebase config (ilagay mo dito yung totoong values mula sa Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyAB2s5en5rGGarYUl6HwlYASMzyDjg4QOw",
  authDomain: "classmatehub-baps.firebaseapp.com",
  projectId: "classmatehub-baps",
  storageBucket: "classmatehub-baps.firebasestorage.app",
  messagingSenderId: "308203350949",
  appId: "1:308203350949:web:55e12866cbbbd0b623d64c"
  measurementId: "G-RPRZXWJB1J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Register
function register() {
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      document.getElementById("auth-status").innerText = "Registered as " + userCredential.user.email;
    })
    .catch(error => {
      document.getElementById("auth-status").innerText = "Error: " + error.message;
    });
}
window.register = register;

// Login
function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      document.getElementById("auth-status").innerText = "Logged in as " + userCredential.user.email;
    })
    .catch(error => {
      document.getElementById("auth-status").innerText = "Error: " + error.message;
    });
}
window.login = login;

// Google Login
function googleLogin() {
  signInWithPopup(auth, provider)
    .then(result => {
      document.getElementById("auth-status").innerText = "Google login: " + result.user.email;
    })
    .catch(error => {
      document.getElementById("auth-status").innerText = "Error: " + error.message;
    });
}
window.googleLogin = googleLogin;

// Logout
function logout() {
  signOut(auth).then(() => {
    document.getElementById("auth-status").innerText = "Logged out successfully.";
    document.getElementById("logout-box").style.display = "none";
  }).catch(error => {
    document.getElementById("auth-status").innerText = "Error: " + error.message;
  });
}
window.logout = logout;

// Auth state listener
onAuthStateChanged(auth, user => {
  if (user) {
    document.getElementById("auth-status").innerText = "Logged in: " + user.email;
    document.getElementById("logout-box").style.display = "block";
  } else {
    document.getElementById("auth-status").innerText = "Not logged in";
    document.getElementById("logout-box").style.display = "none";
  }
});

