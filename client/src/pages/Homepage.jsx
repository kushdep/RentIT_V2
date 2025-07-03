import { Outlet } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignUp from "./SignUp";

function Homepage() {
  return <>
  <h1>HOMEPAGE</h1>
  <Outlet>
    <LoginPage/>
    <SignUp/>
  </Outlet>
  </>
}

export default Homepage;
