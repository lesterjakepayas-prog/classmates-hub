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

// Firebase config
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

// Send Message
async function sendMessage() {
  const receiver = document.getElementById("receiver-email").value;
  const message = document.getElementById("message-content").value;

  if (receiver.trim() === "" || message.trim() === "") {
    return alert("Please enter receiver email and message!");
  }

  try {
    await addDoc(collection(db, "messages"), {
      sender: auth.currentUser.email,
      receiver: receiver,
      message: message,
      timestamp: serverTimestamp()
    });
    document.getElementById("message-content").value = "";
  } catch (error) {
    console.error("Error sending message:", error);
    alert(error.message);
  }
}
window.sendMessage = sendMessage;

// Show Messages (real-time)
const messagesDiv = document.getElementById("messages");
const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
onSnapshot(q, (snapshot) => {
  messagesDiv.innerHTML = "";
  snapshot.forEach((doc) => {
    const msg = doc.data();
    const div = document.createElement("div");
    div.classList.add("message-item");
    div.innerHTML = `
      <p><strong>${msg.sender} ➝ ${msg.receiver}</strong></p>
      <p>${msg.message}</p>
      <small>${msg.timestamp?.toDate().toLocaleString() || ""}</small>
      <hr>
    `;
    messagesDiv.appendChild(div);
  });
});

// Logout
function logout() {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
}
window.logout = logout;

// Protect chat page
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
  }
});
