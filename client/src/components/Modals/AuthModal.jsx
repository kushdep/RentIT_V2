import { createPortal } from "react-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useActionState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { authActions } from "/src/store/auth-slice";
import SignUp from "/src/pages/SignUp.jsx";
import GoogleSignIn from "../../pages/GoogleSignIn";

function AuthModal({ reference, authStt, authSttFn }) {
  const dispatch = useDispatch();
  const [formState, formFn,isPending] = useActionState(action, {
    email: null,
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
          console.dir(reference)
          reference.current.close()
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
        if (error?.response?.status === 403) {
          err.push(error?.response?.data?.message);
          console.log(error?.response?.data?.message)
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
        className="rounded-4 shadow-lg border-0"
        style={{
          width: 420,
          maxWidth: "95%",
          padding: "0",
          background: "linear-gradient(145deg, #ffffff, #f8f9fa)",
          animation: "fadeIn 0.3s ease-out",
        }}
      >
        <form method="dialog" className="p-0 m-0">
          <button
            type="submit"
            className="btn-close position-absolute top-0 end-0 m-3"
            aria-label="Close"
          ></button>
        </form>

        <div className="container px-4 py-5">
          <div className="row row-cols-1 text-center">
            {authStt ? (
              <form action={formFn}>
                <div className="col mb-4">
                  <h2 className="fw-bold text-dark">Welcome Back 👋</h2>
                  <p className="text-muted small">
                    Please log in to continue to your account
                  </p>
                  <p className="text-danger px-2 text-start">
                {formState?.errors[0]}
              </p>
                </div>
                <div className="col mb-3">
                  <div className="form-floating">
                    <input
                      type="email"
                      name="email"
                      className="form-control rounded-3 shadow-sm"
                      id="floatingInput"
                      placeholder="name@example.com"
                      defaultValue={formState?.email}
                    />
                    <label htmlFor="floatingInput">Email address</label>
                  </div>
                </div>

                <div className="col mb-3">
                  <div className="form-floating">
                    <input
                      type="password"
                      name="password"
                      className="form-control rounded-3 shadow-sm"
                      id="floatingPassword"
                      placeholder="Password"
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>
                </div>

                <div className="col mb-3">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 fw-semibold py-2 rounded-3 shadow-sm"
                  >
                    Log In
                  </button>
                </div>

                <div className="d-flex align-items-center my-3">
                  <hr className="flex-grow-1" />
                  <span className="px-2 text-muted small">OR</span>
                  <hr className="flex-grow-1" />
                </div>

                <div className="col mb-3">
                  <GoogleOAuthProvider
                    clientId={import.meta.env.VITE_CLIENT_ID}
                  >
                      <GoogleSignIn ref={reference}/>
                  </GoogleOAuthProvider>
                </div>

                <div className="col">
                  <button
                    type="button"
                    className="btn btn-link text-decoration-none text-primary"
                    disabled={isPending}
                    onClick={() => authSttFn(false)}
                  >
                    New user? Create an account
                  </button>
                </div>
              </form>
            ) : (
              <SignUp />
            )}
          </div>
        </div>
      </dialog>
    </>,
    document.getElementById("modal-root")
  );
}

export default AuthModal;
