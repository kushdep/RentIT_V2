import "../css/navbar.css";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <>
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

              <div className="col-3 d-flex justify-content-center btn-group">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "btn btn-primary me-1 active"
                      : "btn btn-primary me-1"
                  }
                  id="login"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive
                      ? "btn btn-outline-primary active"
                      : "btn btn-outline-primary"
                  }
                  id="signup"
                >
                  Sign Up
                </NavLink>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default NavBar;
