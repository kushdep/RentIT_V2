import axios from "axios";
import { useActionState } from "react";

export default function SignUp() {
  const [formState, formFn] = useActionState(action, {
    email: "",
    otpSent: false,
  });

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
        {formState.otpSent && (
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
          {formState.otpSent ? "submit" : "send otp"}
        </button>
      </form>
    </>
  );
}

export async function action(currentState, formData) {
  try {
    let url = "http://localhost:3000";
    let body = {};
    console.log(currentState);
    if (!currentState.otpSent) {
      url += "/send-otp";
      body = {
        email: formData.get("email"),
      };
      const response = await axios.post(url, body);
      console.log(response);
      if (response.status === 200) {
        console.log(JSON.stringify(currentState));
        console.log(JSON.stringify(body));
        const newData = {
          ...currentState,
          otpSent: true,
          email: formData.get("email"),
        };
        console.log(newData);
        return newData;
      }
    } else {
      url += "/signup";
      body = {
        username: formData.get("username"),
        email: formData.get("email"),
        otp: formData.get("otp"),
        password: formData.get("password"),
      };
      const response = await axios.post(url, body);
      console.log(response);
      if (response.status === 201) {
        return { ...currentState, body };
      }
    }
  } catch (error) {
    console.log(error);
  }
}
