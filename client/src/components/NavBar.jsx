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
      <AuthModal reference={authModal} authSttFn={setLoginStt} authStt={loginStt} />
      <header className="sub-header">
        <nav className="navbar sticky-top border-bottom border-1 p-0">
          <div className="container">
            <div className="row w-100 m-0">
              <div className="col-lg-8 col-md-8 d-flex align-items-center info p-0">
                <img src="/icons/mail-us.png" alt="mail" className="me-2" />
                <span className="me-4">info@Rent-IT.com</span>
                <img src="/icons/map.png" alt="map" className="me-2" />
                <span>Locate your vacation Spot</span>
              </div>

              <div className="col-lg-4 col-md-4 d-flex align-items-center justify-content-start  p-0">
                <div className="social-icons p-1">
                  <a href="#" className="me-2">
                    <img src="/icons/facebook.png" alt="facebook" />
                  </a>
                  <a href="#" className="me-2">
                    <img src="/icons/instagram.png" alt="instagram" />
                  </a>
                  <a href="#">
                    <img src="/icons/twitter.png" alt="twitter" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <nav className="navbar navbar-expand-lg info">
          <div className="container-fluid">
            <div className="row align-items-center w-100 m-0">
              <div className="col-3 d-flex align-items-center">
                <img
                  src="/images/logo-2.png"
                  alt="Logo"
                  id="logo"
                  className="img-fluid"
                />
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

              <div className="col-6">
                <div
                  className="collapse navbar-collapse justify-content-center"
                  id="navbarText"
                >
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link active navigation mx-3"
                        : "nav-link navigation mx-3"
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/rent-locs"
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link active navigation mx-3"
                        : "nav-link navigation mx-3"
                    }
                  >
                    Properties
                  </NavLink>
                  <NavLink
                    to="/contact-us"
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link active navigation mx-3"
                        : "nav-link navigation mx-3"
                    }
                  >
                    Contact Us
                  </NavLink>
                </div>
              </div>
              {!isAuthenticated ? (
                <div className="col-3 d-flex justify-content-center btn-group">
                  <button
                    className="btn btn-primary me-1 shadow"
                    onClick={() => {
                      setLoginStt(true)
                      authModal.current.showModal()
                    }}
                    id="login"
                  >
                    Login
                  </button>
                  <button
                    className="btn btn-outline-primary shadow"
                    onClick={() => {                                            setLoginStt(false)
                      authModal.current.showModal()}}
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
                              <NavLink to="/profile" className="dropdown-item">
                                Profile
                              </NavLink>
                            </li>
                            <li>
                              <Link to="/profile/whishlist" className="dropdown-item">
                                Whishlist
                              </Link>
                            </li>
                            <li>
                              <Link to="" className="dropdown-item">
                                Trips
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
