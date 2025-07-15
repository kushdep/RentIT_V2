import axios from "axios";
import toast from 'react-hot-toast'
import { useActionState } from "react";
import GoogleSignIn from "./GoogleSignIn";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function LoginPage() {
  const [formState, formFn] = useActionState(action, {
    email: "",
    errors: [],
  });
  const navigate = useNavigate();

  async function action(currentState, formData) {
    try {
      const email = formData.get("email");
      const password = formData.get("password");

      const body = {
        email,
        password,
      };

      console.log(body);
      try {
        const response = await axios.post("http://localhost:3000/login", body);
        if (response.status === 200) {
          localStorage.setItem("token", response.data);
          toast.success('Logged In')
          navigate("/rent-locs");
        }
      } catch (error) {
        let err = [];
        if (error?.response?.status === 400) {
          err.push(error?.response?.data?.message);
          return {
            ...currentState,
            email,
            errors: err,
          };
        }
        if(error?.response?.status===401){
          err.push(error?.response?.data?.message)
          return {
            ...currentState,
            errors:err
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form action={formFn}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" defaultValue={formState.email}/>
        <label htmlFor="password">password</label>
        <input type="password" name="password" id="password" />
        <button type="submit">Log In</button>
        {formState.errors && formState.errors.map(e=><li>{e}</li>)}
      </form>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <GoogleSignIn />
      </GoogleOAuthProvider>
      <Link to="/signup">create new user</Link>
    </>
  );
}
