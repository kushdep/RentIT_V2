import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

function Layout() {
  return (
    <>
      <NavBar />
      <Toaster />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
