import axios from "axios";
import { useState } from "react";
import { Form } from "react-router-dom";

export default function SignUp() {
  const [otp, setOtp] = useState();

  return (
    <>
      <Form method="POST">
        <label htmlFor="username">username</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="email">email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="otp">OTP</label>
        <input type="otp" name="otp" id="otp" />
        <label htmlFor="password">password</label>
        <input type="password" name="password" id="password" />
        <button type="submit">submit</button>
      </Form>
    </>
  );
}

export async function action({ request, params }) {
  console.log(request);
  console.log(params);
  const data = await request.formData();
  console.log(request);
  let url = "http://localhost:3000/signup";
  let body = {};
  if (request.url.includes("verify-email")) {
    body = {
      email: data.get("email"),
    };
  } else {
    body = {
      username: data.get("username"),
      email: data.get("email"),
      otp:data.get('otp'),
      password: data.get("password"),
    };
  }
  console.log(userData);
  const response = await axios.post(url, body);
  console.log(response);
}
