import { Link, Outlet } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignUp from "./SignUp";
import GoogleSignIn from "./GoogleSignIn";

function Homepage() {
  return (
    <>
      <h1>HOMEPAGE</h1>
      <Outlet>
        <LoginPage />
        <SignUp />
      </Outlet>
    </>
  );
}

export default Homepage;
