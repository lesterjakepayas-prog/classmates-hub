// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getAuth, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  orderBy, 
  onSnapshot 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Firebase config (gamitin yung totoong config mo)
const firebaseConfig = {
  apiKey: "AIzaSyAB2s5en5rGGarYUl6HwlYASMzyDjg4QOw",
  authDomain: "classmatehub-baps.firebaseapp.com",
  projectId: "classmatehub-baps",
  storageBucket: "classmatehub-baps.firebasestorage.app",
  messagingSenderId: "308203350949",
  appId: "1:308203350949:web:55e12866cbbbd0b623d64c",
  measurementId: "G-RPRZXWJB1J"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Post function
async function createPost() {
  const content = document.getElementById("post-content").value;
  if (content.trim() === "") return alert("Write something first!");

  try {
    await addDoc(collection(db, "posts"), {
      author: auth.currentUser.email,
      content: content,
      timestamp: serverTimestamp()
    });
    document.getElementById("post-content").value = "";
  } catch (error) {
    console.error("Error posting:", error);
    alert(error.message);
  }
}
window.createPost = createPost;

// Show posts in real-time
const postsDiv = document.getElementById("posts");
const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
onSnapshot(q, (snapshot) => {
  postsDiv.innerHTML = "";
  snapshot.forEach((doc) => {
    const post = doc.data();
    const div = document.createElement("div");
    div.classList.add("post-item");
    div.innerHTML = `
      <p><strong>${post.author}</strong></p>
      <p>${post.content}</p>
      <small>${post.timestamp?.toDate().toLocaleString() || ""}</small>
      <hr>
    `;
    postsDiv.appendChild(div);
  });
});

// Logout function
function logout() {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
}
window.logout = logout;

// Protect feed page (redirect if not logged in)
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
  }
});
