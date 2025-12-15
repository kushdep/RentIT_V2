import { useDispatch, useSelector } from "react-redux";
import "../css/navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth-slice";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import AuthModal from "./Modals/AuthModal";
import SearchBar from "./UI/SearchBar";

function NavBar() {
  const [loginStt, setLoginStt] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.authData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authModal = useRef();

  function handleLogout() {
    try {
      dispatch(authActions.logout());
      toast.success("Logged Out");
      navigate("/");
    } catch (error) {
      console.log("Error in handle Logout " + error);
    }
  }

  return (
    <>
      <AuthModal
        reference={authModal}
        authSttFn={setLoginStt}
        authStt={loginStt}
      />
      <div
        className="container-fluid navRent"
      >
        <div className="row h-100">
          <div className="col-2">
            <div className="h-100 w-100">

            {/* <img src="/images/logo.png" alt="Logo" id="logo" className="" /> */}
            </div>
          </div>
          <div className="col-1"></div>
          <div className="col-6">
            <div className="h-25 d-flex justify-content-center">
              <img src="/images/travel3d.png" className="" />
              <span className="trvlSpan p-2">Home</span>
            </div>
            <div className="d-flex flex-column justify-content-center h-50 w-100">
              <SearchBar/>
            </div>
          </div>
          <div className="col-1"></div>
          {!isAuthenticated ? (
            <div className="col-2 d-flex justify-content-center btn-group h-25 mt-3">
              <button
                className="btn btn-primary me-1 shadow"
                onClick={() => {
                  setLoginStt(true);
                  authModal.current.showModal();
                }}
                id="login"
              >
                Login
              </button>
              <button
                className="btn btn-outline-primary shadow"
                onClick={() => {
                  setLoginStt(false);
                  authModal.current.showModal();
                }}
                id="signup"
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div className="col-2 d-flex justify-content-center btn-group">
              <div className="container" style={{ width: 80, height: 50 }}>
                <div className="row h-100">
                  <div className="col h-100 p-0">
                    <div className="dropdown w-100 h-100">
                      <button
                        className="btn rounded-pill dropdown-toggle p-2"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img
                          src="/icons/user.png"
                          alt=""
                          className="w-50 h-50 position-relative"
                        />
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <NavLink to="/profile/edit" className="dropdown-item">
                            Profile
                          </NavLink>
                        </li>
                        <li>
                          <Link
                            to="/profile/whishlist"
                            className="dropdown-item"
                          >
                            Whishlist
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/profile/my-trips"
                            className="dropdown-item"
                          >
                            My Trips
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/profile/my-bookings"
                            className="dropdown-item"
                          >
                            My Bookings
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/profile/my-bookings"
                            className="dropdown-item"
                          >
                            Payments
                          </Link>
                        </li>
                        <li>
                          <button
                            className="btn dropdown-item"
                            onClick={handleLogout}
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default NavBar;
