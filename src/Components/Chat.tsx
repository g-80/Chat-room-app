import { auth } from "../firebase/config";
const Chat: React.FC = () => {
  return (
    <>
      <header className="App-header">
        <button onClick={() => auth.signOut()}>Sign out</button>
        <p>user</p>
        <div>
          <img alt="google profile"></img>
        </div>
      </header>
      <main>
        <section>
          <div></div>
        </section>
        <section>
          <form>
            <input type="text"></input>
            <button type="submit">Send</button>
          </form>
        </section>
      </main>
    </>
  );
};

export default Chat;
