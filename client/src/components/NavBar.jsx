import { useDispatch, useSelector } from "react-redux";
import "../css/navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth-slice";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import AuthModal from "./Modals/AuthModal";

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
      <header className="sub-header p-0 ">
        <nav className="navbar navbar-expand info">
          <div className="container-fluid">
            <div className="row align-items-center w-100 m-0 d-flex justify-content-between">
              <div className="col-8 d-flex align-items-center justify-content-between">
                <img
                  src="/images/logo-2.png"
                  alt="Logo"
                  id="logo"
                  className="img-fluid"
                />
                <div className="w-50">
                <div
                  className="collapse navbar-collapse navTtl p-2 rounded-pill d-flex justify-content-around shadow"
                  id="navbarText"
                >
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link active navigation p-2 rounded-pill bg-light shadow"
                        : "nav-link navigation text-light"
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/rent-locs"
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link active navigation p-2 rounded-pill bg-light shadow"
                        : "nav-link navigation text-light"
                    }
                  >
                    Properties
                  </NavLink>
                  <NavLink
                    to="/contact-us"
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link active navigation  p-2 rounded-pill bg-light shadow"
                        : "nav-link navigation  text-light"
                    }
                  >
                    Contact Us
                  </NavLink>
                </div>
                </div>
                <button
                  className="navbar-toggler ms-2"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarText"
                  aria-controls="navbarText"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
              </div>


              {!isAuthenticated ? (
                <div className="col-3 d-flex justify-content-center btn-group">
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
                <div className="col-3 d-flex justify-content-center btn-group">
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
                            <span class="position-absolute top-0 start-10 translate-middle badge rounded-pill bg-danger text-light">
                              99+
                              <span class="visually-hidden">
                                unread messages
                              </span>
                            </span>
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
                              <Link to="/profile/my-trips" className="dropdown-item">
                                My Trips
                              </Link>
                            </li>
                            <li>
                              <Link to="/profile/my-bookings" className="dropdown-item">
                                My Bookings
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
        </nav>
      </header>
    </>
  );
}

export default NavBar;
