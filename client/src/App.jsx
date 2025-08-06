import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import RentLocs, { getAllLocLoader } from "./pages/RentLocs";
import Homepage from "./pages/Homepage";
import ContactUs from "./pages/ContactUs";
import Profile from "./pages/Profile";
import AddLocForm from "./components/AddLocForm";
import LocDetails from "./components/LocDetail";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth-slice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Homepage /> },
      {
        path: "rent-locs",
        id:"rentLocs",
        loader: getAllLocLoader,
        children: [
          {
            path: "",
            element: <RentLocs />,
          },
          { path: ":locId", element: <LocDetails /> },
        ],
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
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()

  if(token){
    dispatch(authActions.loginSuccess({token:token}))  
  }
  return <RouterProvider router={router} />;
}

export default App;
