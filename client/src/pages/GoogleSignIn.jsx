import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/auth-slice";
import { useDispatch } from "react-redux";

export default function GoogleSignIn({ref}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function responseGoogle(authResult) {
    try {
      if (authResult["code"]) {
        const response = await axios.get(
          `http://localhost:3000/google?code=${authResult.code}`
        );
        const token = response.data;
        localStorage.setItem("token", token);
        toast.success("Logged In");
        dispatch(authActions.loginSuccess({ token }));
        navigate("/rent-locs");
      } else {
        console.log("auth result ", authResult);
        throw new Error(authResult);
      }
    } catch (error) {
      console.log("Error while google Login ", error);
    }
  }
  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onerror: responseGoogle,
    flow: "auth-code",
  });

  return (
    <>
      <button
        onClick={()=>{
          ref.current.close()
          googleLogin()}}
        type="button"
        className="btn w-100 py-2 rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2"
        style={{
          background: "#fff",
          border: "1px solid #ddd",
          color: "#444",
          fontWeight: "500",
          transition: "0.2s",
        }}
      >
        <img
          src="/public/icons/google-logo.png"
          alt="Google"
          style={{ width: 20, height: 20 }}
        />
        Sign in with Google
      </button>
    </>
  );
}
