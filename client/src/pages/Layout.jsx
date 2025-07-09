import { Outlet } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignUp from "./SignUp";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import RentLocs from "./RentLocs";

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet>
        <LoginPage />
        <SignUp />
        <RentLocs />
      </Outlet>
      <Footer />
    </>
  );
}

export default Layout;
