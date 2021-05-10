import { signInWithGoogle } from "../firebase/config";

const SignIn: React.FC = () => {
  return (
    <>
      <div>
        <img alt="chat icon"></img>
      </div>
      <h1>Chat room app</h1>
      <button onClick={signInWithGoogle}>Sign in</button>
    </>
  );
};

export default SignIn;
