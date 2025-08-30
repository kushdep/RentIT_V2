import { createBrowserRouter, RouterProvider, useParams } from "react-router-dom";
import Layout from "./pages/Layout";
import RentLocs from "./pages/RentLocs";
import Homepage from "./pages/Homepage";
import ContactUs from "./pages/ContactUs";
import Profile from "./pages/Profile";
import ProfileLayout from "./pages/ProfileLayout";
import AddLocForm from "./components/AddLocForm";
import LocDetails from "./components/LocDetail";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth-slice";
import LocPhotosPage from "./pages/LocPhotosPage"
import Whishlist from "./pages/Whishlist";
import LoginPage from "./pages/LoginPage";
import { useEffect } from "react";
import { getProfileData } from "./store/profile-slice";
import VerifyProp from "./pages/VerifyProp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Homepage /> },
      { path: "login", element: <LoginPage /> },
      {
        path: `rent-locs`,
        id:"rentLocs",
        children: [
          {
            path: "",
            element: <RentLocs />,
          },
          { path: ":locId", element: <LocDetails /> },
          { path: ":locId/photos", element: <LocPhotosPage /> },
        ],
      },
      { path: "contact-us", element: <ContactUs /> },
      {
        path: "/profile",
        element: <ProfileLayout />,
        children: [
          {path:"edit",element:<Profile/>},
          { path: "new-loc", element: <AddLocForm /> },
          { path: "whishlist", element: <Whishlist /> },
          { path: "propertier-verification", element: <VerifyProp /> },
        ],
      },
    ],
  },
]);

function App() {
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()

  useEffect(()=>{
    if(token){
      dispatch(getProfileData(token))
    }
  },[])
  
  if(token){
    dispatch(authActions.loginSuccess({token:token}))  
  }
  return <RouterProvider router={router} />;
}

export default App;
