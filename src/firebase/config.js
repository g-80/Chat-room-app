import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-rk2y7JYpknYtoSw8CJjsZQ-V8N5ipDc",
  authDomain: "chat-room-app-309ff.firebaseapp.com",
  projectId: "chat-room-app-309ff",
  storageBucket: "chat-room-app-309ff.appspot.com",
  messagingSenderId: "190769485469",
  appId: "1:190769485469:web:49511a13f7ae9bb53de674",
  measurementId: "G-GKJSF1VDBD",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
}

const firestore = firebase.firestore();
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export { auth, signInWithGoogle, firestore, serverTimestamp };
