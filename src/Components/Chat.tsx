import { auth, firestore, serverTimestamp } from "../firebase/config";
import { useCollectionData } from "react-firebase-hooks/firestore";
import React, { useState } from "react";

const Chat: React.FC = () => {
  const currentUser = auth.currentUser!;

  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);
  const [messages, loading, error] = useCollectionData(query);

  //   console.log(messages);

  const [formValue, setFormValue] = useState("");
  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    await messagesRef.add({
      text: formValue,
      createdAt: serverTimestamp(),
      uid: currentUser.uid,
    });
    setFormValue("");
  }

  return (
    <>
      <header className="App-header">
        <button onClick={() => auth.signOut()}>Sign out</button>
        <p>{currentUser.displayName}</p>
        <div>
          <img alt="user profile" src={currentUser.photoURL!}></img>
        </div>
      </header>
      <main>
        <section>
          <div>
            {error && <p>There was something wrong. Please try again.</p>}
            {messages && messages.length === 0 && (
              <p>Send the first message!</p>
            )}
            {messages &&
              messages.map((message) => (
                <div key={message.id}>
                  <div>
                    <p>{message.text}</p>
                  </div>
                  <p>
                    {new Date(message.createdAt * 1000).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              ))}
          </div>
        </section>
        <section>
          <form onSubmit={sendMessage}>
            <input
              type="text"
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
            ></input>
            <button
              type="submit"
              disabled={!formValue || formValue.trim() === ""}
            >
              Send
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default Chat;
