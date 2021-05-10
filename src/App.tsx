import React from "react";
import { auth, firestore, serverTimestamp } from "./firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

import SignIn from "./Components/SignIn";
import Chat from "./Components/Chat";

import "./App.css";

function App() {
  const [user, loading, error] = useAuthState(auth);
  return <div className="App">{user ? <Chat /> : <SignIn />}</div>;
}

export default App;
