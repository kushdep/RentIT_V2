import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";
import Homepage from "./Homepage";

function Layout() {
  return (
    <div>
      <NavBar />
      <Toaster />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
