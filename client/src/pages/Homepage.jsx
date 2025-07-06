import { Link, Outlet } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignUp from "./SignUp";

function Homepage() {
  return (
    <>
      <h1>HOMEPAGE</h1>
      <Link to="/signup">create new user</Link>
      <button>
        <Link to="/rent-locs">sign in with Google</Link>
      </button>
      <Outlet>
        <LoginPage />
        <SignUp />
      </Outlet>
    </>
  );
}

export default Homepage;
