import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import RentLocs from "./pages/RentLocs";
import Homepage from "./pages/Homepage";
import ContactUs from "./pages/ContactUs";
import Profile from "./pages/Profile";
import AddLocForm from "./components/AddLocForm";
import LocDetails from "./components/LocDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Homepage /> },
      {
        path: "rent-locs",
        element: <RentLocs />,
        children: [{ path: "loc", element: <LocDetails /> }],
      },
      { path: "contact-us", element: <ContactUs /> },
      {
        path: "profile",
        element: <Profile />,
        children: [
          { path: "new-loc", element: <AddLocForm /> },
          { path: "edit-loc", element: <Profile /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
