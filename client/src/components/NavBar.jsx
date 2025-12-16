import { useDispatch, useSelector } from "react-redux";
import "../css/navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth-slice";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import AuthModal from "./Modals/AuthModal";
import SearchBar from "./UI/SearchBar";
import { rentLocActions } from "../store/rentloc-slice";

function NavBar() {
  const [loginStt, setLoginStt] = useState(false);
  const [isSearch, setSrchStt] = useState(false);
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
      <div className={isSearch ?"container-fluid navSrchRent shadow":"container-fluid navRent"}>
        <div className="row">
          <nav className="col-2">
            <Link className="navbar-brand">
            <img src="/images/logo.png" alt="LOGO" className="rentLogo"/>
            </Link>
                        </nav>
          <div className="col-1"></div>
          <div className="col-6  h-75">
            <div className="d-flex  mt-2 justify-content-center">
              <div className="w-50 h-50 d-flex justify-content-center">
                <div className="d-flex justify-content-end align-items-center bg-white p-2 rounded-pill rounded-end border">
                  <NavLink to='/rent-locs' className="trvlSpan">
                  <span className="trvlSpan">🏚️ Home</span>
                  </NavLink>
                </div>
                <div className={`d-flex bg-white rounded-pill rounded-start border p-1 ${isSearch?'shadow':''}`}>
                  <button className="btn border-0" onClick={()=>{
                    if(isSearch){
                      dispatch(rentLocActions.resetSearchLocs())
                    }
                    setSrchStt(!isSearch)
                    }}>
                    {
                      isSearch?
                      <img src="/icons/x-circle-fill.svg" style={{ height: "80%" }} />
                     : <img src="/icons/search.png" style={{ height: "85%" }} />
                    }
                  </button>
                </div>
              </div>
            </div>
            {
              isSearch &&
            <div className="d-flex justify-content-center mt-3">
              <SearchBar />
            </div>
            }
          </div>
          <div className="col-1"></div>
          {!isAuthenticated ? (
            <div className="col-2 d-flex justify-content-center btn-group mt-3 h-25">
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
            <div className="col-2 d-flex justify-content-center btn-group mt-2">
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
