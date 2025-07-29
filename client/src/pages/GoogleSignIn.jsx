import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/auth-slice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function GoogleSignIn() {
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
      <button className="btn btn-dark fw-semibold w-100 mt-2"  onClick={googleLogin}>
        SignIn with Google
      </button>
    </>
  );
}
