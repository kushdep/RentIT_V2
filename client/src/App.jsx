import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import RentLocs from "./pages/RentLocs";
import Homepage from "./pages/Homepage";
import ContactUs from "./pages/ContactUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Homepage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignUp /> },
      { path: "rent-locs", element: <RentLocs /> },
      { path: "contact-us", element: <ContactUs /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
