import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from "react-router-dom";
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
import Whishlist from "./pages/Whishlist";
import LoginPage from "./pages/LoginPage";
import { useEffect } from "react";
import { getProfileData } from "./store/profile-slice";
import VerifyProp from "./pages/VerifyProp";
import { useSelector } from "react-redux";

const PropertierRoute = ({ children }) => {
  const { userType: isPropertier } = useSelector((state) => state.profileData);
  return !isPropertier.pptr ? children : <h1>UNAUTHORIZED</h1>;
};

const ProfileRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.authData);
  return isAuthenticated ? children : <h1>UNAUTHORIZED</h1>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Homepage /> },
      { path: "login", element: <LoginPage /> },
      {
        path: `rent-locs`,
        id: "rentLocs",
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
        path: "/profile",
        element: (
          <ProfileRoute>
            <ProfileLayout />
          </ProfileRoute>
        ),
        children: [
          { path: "edit", element: <Profile /> },
          { path: "new-loc", element: <AddLocForm /> },
          { path: "whishlist", element: <Whishlist /> },
          {
            path: "propertier-verification",
            element: (
              <PropertierRoute>
                <VerifyProp />
              </PropertierRoute>
            ),
          },
        ],
      },
    ],
  },
]);

function App() {
  const token = localStorage.getItem("token");
  console.log(token)
  const dispatch = useDispatch();

  useEffect(() => {
    if (token!==null) {
      console.log('Login')
      dispatch(authActions.loginSuccess({ token: token }));
    }
    if (token!==null) {
      dispatch(getProfileData(token));
    }
  }, [token,dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
