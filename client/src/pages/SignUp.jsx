import axios from "axios";
import { useActionState } from "react";
import { useNavigate } from "react-router-dom";
import { checkPassword } from "../utils/SignupValidations";

export default function SignUp() {
  const [formState, formFn] = useActionState(action, {
    email: "",
    otpSent: false,
    errors: null,
  });
  const navigate = useNavigate();

  async function action(currentState, formData) {
    try {
      let url = "http://localhost:3000";
      let body = {};
      let error = [];
      if (!currentState.otpSent) {
        url += "/send-otp";
        body = {
          email: formData.get("email"),
        };
        try {
          const response = await axios.post(url, body);
          if (response.status === 200) {
            const newData = {
              ...currentState,
              otpSent: true,
              email: formData.get("email"),
            };
            return newData;
          }
        } catch (err) {
          if (err?.response?.status === 400) {
            error.push(err?.response?.data?.message);
            const newData = {
              ...currentState,
              email: formData.get("email"),
              errors: error,
            };
            return newData;
          }
        }
      } else {
        url += "/signup";
        body = {
          username: formData.get("username"),
          email: formData.get("email"),
          otp: formData.get("otp"),
          password: formData.get("password"),
          confirmPassword: formData.get("confirm-password"),
        };
        const validation = checkPassword(body.password, body.confirmPassword);
        if (!validation?.length || !validation?.isEqual) {
          error.push(validation?.message);
          return {
            ...currentState,
            username: formData.get("username"),
            errors: error,
          };
        }
        try {
          const res = await axios.post(url, body);
          if (res.status === 201) {
            navigate("/rent-locs");
            return { ...currentState, body };
          }
        } catch (err) {
          if (err?.response?.status === 400) {
            error.push(err?.response?.data?.message);
            const newData = {
              ...currentState,
              username: formData.get("username"),
              email: formData.get("email"),
              errors: error,
            };
            return newData;
          }
          if (err?.response?.status === 403) {
            error.push(err?.response?.data?.message);
            const newData = {
              ...currentState,
              username: formData.get("username"),
              otp: formData.get("otp"),
              email: formData.get("email"),
              errors: error,
            };
            return newData;
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
        <label htmlFor="email">email</label>
        <input
          type="email"
          name="email"
          id="email"
          defaultValue={formState?.email}
        />
        {formState?.otpSent && (
          <div>
            <label htmlFor="otp">OTP</label>
            <input
              type="text"
              name="otp"
              id="otp"
              defaultValue={formState?.otp}
            />
            <label htmlFor="username">username</label>
            <input
              type="text"
              name="username"
              id="username"
              defaultValue={formState?.username}
            />
            <label htmlFor="password">password</label>
            <input type="password" name="password" id="password" />
            <label htmlFor="confirm-password">confirm password</label>
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
            />
          </div>
        )}
        <button type="submit">
          {formState?.otpSent ? "submit" : "send otp"}
        </button>
      </form>
      {formState.errors && formState.errors.map(e=><li>{e}</li>)}
    </>
  );
}
