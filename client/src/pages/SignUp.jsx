import axios from "axios";
import { useState } from "react";
import { Form, redirect } from "react-router-dom";

export default function SignUp({ otpSend }) {
  return (
    <>
      <Form method="POST">
        <label htmlFor="email">email</label>
        <input type="email" name="email" id="email" />
        {otpSend && (
          <div>
            <label htmlFor="otp">OTP</label>
            <input type="text" name="otp" id="otp" />
            <label htmlFor="username">username</label>
            <input type="text" name="username" id="username" />
            <label htmlFor="password">password</label>
            <input type="password" name="password" id="password" />
          </div>
        )}
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
  let url = 'http://localhost:3000';
  let body = {};
  if (request.url.includes("send-otp")) {
    url+='/send-otp'
    body = {
      email: data.get("email"),
    };
  } else {
    url+='/signup'
    body = {
      username: data.get("username"),
      email: data.get("email"),
      otp: data.get("otp"),
      password: data.get("password"),
    };
  }
  console.log(url)
  console.log(body)
  try {
    const response = await axios.post(url, body);
    console.log(response);
    if (response.status === 200) {
      return redirect('/signup');
    }
  } catch (error) {
    console.error("Error during signup:", error);
    // Optionally, return an error or handle it as needed
    return null;
  }
}
