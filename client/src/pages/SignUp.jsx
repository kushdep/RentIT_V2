import axios from "axios";
import { useActionState } from "react";
import { useNavigate } from "react-router-dom";
import { checkPassword } from "../utils/SignupValidations";

export default function SignUp() {
  const [formState, formFn] = useActionState(action, {
    email: "",
    otpSent: true,
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
        };
        let confirmPassword = formData.get("confirm-password");
        const validation = checkPassword(body.password, confirmPassword);
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
            console.log(err);
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
        <div className="row row-cols-1">
          <div className="col">
            <h2 className="text-center text-decoration-underline">Sign Up</h2>
          </div>
          <div className="col p-4">
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                name="email"
                id="floatingInput"
                defaultValue={formState?.email}
                placeholder="email"
              />
              <label for="floatingInput">Email address</label>
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
                  <div className="form-floating">
                    <input
                      type="password"
                      class="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                    />
                    <label for="floatingPassword">Password</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="password"
                      class="form-control"
                      id="ConfloatingPassword"
                      placeholder="Password"
                    />
                    <label htmlFor="ConfloatingPassword">
                      Confirm Password
                    </label>
                  </div>
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
              <div className="col text-center">
                <button
                  type="submit"
                  className="btn btn-primary rounded-pill fs-5 fw-semibold mt-3 w-75"
                >
                  {formState?.otpSent ? "submit" : "send otp"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {formState.errors && formState.errors.map((e) => <li>{e}</li>)}
    </>
  );
}
