// ================= FIREBASE SETUP =================
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } 
  from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } 
  from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Replace this config with your Firebase project config
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
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
    container.innerHTML = "";
    snapshot.forEach((doc) => {
      const data = doc.data();
      container.innerHTML += `<p>📢 ${data.text}</p>`;
    });
  });
}
if (document.getElementById("posts")) loadPosts();

// ================= CHAT =================
const chatRef = collection(db, "chat");

window.sendMessage = function () {
  const text = document.getElementById("chatText").value;
  if (!text.trim()) return;
  addDoc(chatRef, {
    text: text,
    createdAt: new Date()
  });
  document.getElementById("chatText").value = "";
};

function loadChat() {
  const q = query(chatRef, orderBy("createdAt", "asc"));
  onSnapshot(q, (snapshot) => {
    const container = document.getElementById("chatMessages");
    container.innerHTML = "";
    snapshot.forEach((doc) => {
      const data = doc.data();
      container.innerHTML += `<p>💬 ${data.text}</p>`;
    });
  });
}
if (document.getElementById("chatMessages")) loadChat();
