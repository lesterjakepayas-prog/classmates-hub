// 🔥 Firebase Config (already filled in for you)
const firebaseConfig = {
  apiKey: "AIzaSyA-EXAMPLE-KEY-HERE",
  authDomain: "classmates-hub.firebaseapp.com",
  projectId: "classmates-hub",
  storageBucket: "classmates-hub.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123def456"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// LOGIN
function login() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, pass)
    .then(() => window.location.href = "home.html")
    .catch(e => alert(e.message));
}

// REGISTER
function register() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, pass)
    .then(() => alert("Registered! Now login."))
    .catch(e => alert(e.message));
}

// LOGOUT
function logout() {
  auth.signOut().then(() => window.location.href = "index.html");
}

// POSTS
function createPost() {
  const text = document.getElementById("postInput").value;
  db.collection("posts").add({
    text,
    time: Date.now()
  });
  document.getElementById("postInput").value = "";
}

db.collection("posts").orderBy("time","desc").onSnapshot(snapshot => {
  let html = "";
  snapshot.forEach(doc => html += `<p>${doc.data().text}</p>`);
  document.getElementById("posts").innerHTML = html;
});

// CHAT
function sendChat() {
  const text = document.getElementById("chatInput").value;
  db.collection("chat").add({
    text,
    time: Date.now()
  });
  document.getElementById("chatInput").value = "";
}

db.collection("chat").orderBy("time").onSnapshot(snapshot => {
  let html = "";
  snapshot.forEach(doc => html += `<p>${doc.data().text}</p>`);
  document.getElementById("chatBox").innerHTML = html;
});
