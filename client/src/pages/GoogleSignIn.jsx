import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function GoogleSignIn() {
  const navigate = useNavigate();
  async function responseGoogle(authResult) {
    try {
      if (authResult["code"]) {
        const response = await axios.get(
          `http://localhost:3000/google?code=${authResult.code}`
        );
        const token = response.data;
        localStorage.setItem("token", token);
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
      <button onClick={googleLogin}>Sign In with Google</button>
    </>
  );
}
