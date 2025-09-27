// ================= FIREBASE SETUP =================
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } 
  from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } 
  from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// 🔥 Paste mo dito yung config snippet na kinuha mo sa Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyAB2s5en5rGGarYUl6HwlYASMzyDjg4QOw"",
  authDomain: "classmatehub-baps.firebaseapp.com",
  projectId: "classmatehub-baps",
  storageBucket: "classmatehub-baps.firebasestorage.app",
  messagingSenderId: "308203350949",
  appId: "1:308203350949:web:55e12866cbbbd0b623d64c"
  measurementId: "G-RPRZXWJB1J"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ================= AUTH =================
window.register = function () {
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => alert("Registration successful!"))
    .catch((err) => alert(err.message));
};

window.login = function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Login success!");
      window.location.href = "home.html";
    })
    .catch((err) => alert(err.message));
};

window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
};

// ================= POSTS =================
const postsRef = collection(db, "posts");

window.postAnnouncement = function () {
  const text = document.getElementById("postText").value;
  if (!text.trim()) return;
  addDoc(postsRef, {
    text: text,
    createdAt: new Date()
  });
  document.getElementById("postText").value = "";
};

function loadPosts() {
  const q = query(postsRef, orderBy("createdAt", "desc"));
  onSnapshot(q, (snapshot) => {
    const container = document.getElementById("posts");

