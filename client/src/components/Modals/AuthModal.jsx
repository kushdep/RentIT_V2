import { createPortal } from "react-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useActionState, useEffect, useState } from "react";
import GoogleSignIn from "/src/pages/GoogleSignIn.jsx";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { authActions } from "/src/store/auth-slice";
import SignUp from '/src/pages/SignUp.jsx'

function AuthModal({ reference }) {
  const dispatch = useDispatch();
  const [authStt, setAuthStt] = useState(true);

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
        console.log(response);
        if (response.status === 200) {
          dispatch(authActions.loginSuccess({ token: response.data }));
          toast.success("Logged In");
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
        if (error?.response?.status === 401) {
          err.push(error?.response?.data?.message);
          return {
            ...currentState,
            errors: err,
          };
        }
        if (error?.response?.status === 402) {
          err.push(error?.response?.data?.message);
          return {
            ...currentState,
            errors: err,
          };
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  return createPortal(
    <>
      <dialog
        ref={reference}
        className="rounded-5 h-75 border-black shadow-lg"
        style={{ width: 450 }}
      >
        <form method="dialog">
          <button
            type="submit"
            className="btn-close mb-3"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </form>
        <form action={formFn}>
          <div className="container">
            {authStt ? (
              <div className="row row-cols-1">
                <div className="col">
                  <h2 className="text-center text-decoration-underline">
                    LOG IN
                  </h2>
                </div>
                <div className="col p-4">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      defaultValue={formState?.email}
                    />
                    <label htmlFor="floatingInput">Email address</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="btn btn-primary w-100 fw-semibold mt-3 fs-5"
                    >
                      Log In
                    </button>
                    <div className="col">
                      <GoogleOAuthProvider
                        clientId={import.meta.env.VITE_CLIENT_ID}
                      >
                        <GoogleSignIn />
                      </GoogleOAuthProvider>
                    </div>
                    <div className="col">
                      <button
                      type="button"
                        className="btn text-decoration-underline"
                        onClick={() => setAuthStt(false)}
                      >
                        New user ?
                      </button>
                    </div>
                  </div>
                </div>
                {formState?.errors &&
                  formState?.errors.map((e) => <li>{e}</li>)}
              </div>
            ) : (
                <SignUp/>
            )}
          </div>
        </form>
      </dialog>
    </>,
    document.getElementById("modal-root")
  );
}

export default AuthModal;
