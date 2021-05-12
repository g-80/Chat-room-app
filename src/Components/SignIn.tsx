import { signInWithGoogle } from "../firebase/config";
import icon from "../assets/icon.png";

const SignIn: React.FC = () => {
  return (
    <div className="flex-column sign-in-container">
      <div>
        <img alt="chat icon" src={icon}></img>
      </div>
      <h1 className="sign-in-heading">Chat room app</h1>
      <button onClick={signInWithGoogle} className="primary-btn">
        Sign in
      </button>
    </div>
  );
};

export default SignIn;
