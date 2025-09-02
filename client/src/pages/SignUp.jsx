import axios from "axios";
import { useActionState } from "react";
import { useNavigate } from "react-router-dom";
import { checkPassword } from "../utils/SignupValidations";
import toast from "react-hot-toast";

export default function SignUp() {
  const [formState, formFn, isPending] = useActionState(action, {
    email: "",
    otpSent: false,
    errors: null,
  });
  const navigate = useNavigate();

  async function action(currentState, formData) {
    let url = "http://localhost:3000";
    let body = {};
    if(currentState.errors!==null){
      currentState.errors=null
    }
    console.log(currentState?.errors)
    let error = new Map();

    console.log(url);
    if (!currentState.otpSent) {
      url += "/send-otp";
      console.log(url);
      body = {
        email: formData.get("email"),
      };
      console.log(body);
      try {
        const response = await axios.post(url, body);
        console.log(response);
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
          error.set("email", err?.response?.data?.message);
          const newData = {
            ...currentState,
            email: formData.get("email"),
            errors: error,
          };
          return newData;
        }
        if (err?.response?.status === 500) {
          toast.error('Something went wrong')
          const newData = {
            ...currentState,
            username: formData.get("username"),
            otp: formData.get("otp"),
            email: formData.get("email"),
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
        error.set("password", validation?.message);
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
          error.set("other", err?.response?.data?.message);
          const newData = {
            ...currentState,
            username: formData.get("username"),
            email: formData.get("email"),
            errors: error,
          };
          return newData;
        }
        if (err?.response?.status === 403) {
          error.set("other", err?.response?.data?.message);
          const newData = {
            ...currentState,
            username: formData.get("username"),
            otp: formData.get("otp"),
            email: formData.get("email"),
            errors: error,
          };
          return newData;
        }
        if (err?.response?.status === 500) {
          toast.error('Something went wrong')
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
  }

  return (
    <>
      <form action={formFn}>
        <div className="row row-cols-1 text-center">
          <div className="col mb-3">
            <h2 className="fw-bold text-dark">Create Account ✨</h2>
            <p className="text-muted small">Sign up to get started</p>
          </div>

          <div className="col px-4">
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control rounded-3 shadow-sm"
                name="email"
                id="floatingInput"
                defaultValue={formState?.email}
                disabled={formState?.otpSent}
                placeholder="email"
                style={{
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  transition: "all 0.25s ease",
                }}
              />
              <label htmlFor="floatingInput">Email address</label>
                <p className="text-danger px-2 text-start">{formState?.errors?.get("email")}</p>
            </div>

            {formState?.otpSent && (
              <>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-3 shadow-sm"
                    name="otp"
                    id="otp"
                    placeholder="Enter OTP"
                    defaultValue={formState?.otp}
                  />
                  <label htmlFor="otp">OTP</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-3 shadow-sm"
                    name="username"
                    id="username"
                    placeholder="Choose a username"
                    defaultValue={formState?.username}
                  />
                  <label htmlFor="username">Username</label>
                </div>
                <p className="text-danger px-2">{formState?.errors?.get("password")}</p>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control rounded-3 shadow-sm"
                    name="password"
                    id="floatingPassword"
                    placeholder="Password"
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control rounded-3 shadow-sm"
                    name="confirm-password"
                    id="ConfloatingPassword"
                    placeholder="Confirm Password"
                  />
                  <label htmlFor="ConfloatingPassword">Confirm Password</label>
                </div>
              </>
            )}
              <p className="text-danger px-2">{formState?.errors?.get("other")}</p>

            <div className="col text-center">
              <button
                type="submit"
                disabled={isPending}
                className="btn btn-primary fw-semibold mt-3 w-75 shadow"
              >
                {formState?.otpSent
                  ? "Submit"
                  : isPending
                  ? "OTP sent"
                  : "send OTP"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
