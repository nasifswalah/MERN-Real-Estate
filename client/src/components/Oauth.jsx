import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js";
import { useDispatch } from "react-redux";
import { signinSuccess } from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";

export default function Oauth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      console.log(result);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ name: result.user.displayName, email: result.user.email, photo: result.user.photoURL})
      })
      const data = await res.json();
      dispatch(signinSuccess(data));
      navigate('/');
    } catch (error) {
        console.log("Could not sign in with google", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="bg-red-700 text-white p-3 rounded-lg  hover:opacity-95"
    >
      Continue with google
    </button>
  );
}
