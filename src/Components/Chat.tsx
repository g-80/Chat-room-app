import { auth, firestore, serverTimestamp } from "../firebase/config";
import { useCollectionData } from "react-firebase-hooks/firestore";
import React, { useEffect, useRef, useState } from "react";

const Chat: React.FC = () => {
  const currentUser = auth.currentUser!;

  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limitToLast(25);
  const [messages, loading, error] = useCollectionData(query);

  const autoScrollSpan = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    autoScrollSpan.current!.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [formValue, setFormValue] = useState("");
  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    await messagesRef.add({
      text: formValue,
      createdAt: serverTimestamp(),
      uid: currentUser.uid,
      displayName: currentUser.displayName,
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
                  <span>{message.displayName}</span>
                  <div>
                    <p>{message.text}</p>
                  </div>
                  <span>
                    {new Date(message.createdAt * 1000).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))}
          </div>
          <span ref={autoScrollSpan}></span>
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
