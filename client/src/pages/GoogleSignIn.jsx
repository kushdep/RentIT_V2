import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function GoogleSignIn() {
    const navigate = useNavigate()
  async function responseGoogle(authResult) {
    try {
      console.log("1");
      if (authResult["code"]) {
          console.log("2");
          const response = await axios.get(`http://localhost:3000/google?code=${authResult.code}`)
          console.log("3");
          console.log(response);
        const token = response.data;
        localStorage.setItem("token",token);
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
