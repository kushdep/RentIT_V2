import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import RentLocs from "./pages/RentLocs";
import GoogleSignIn from "./pages/GoogleSignIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "google", element: <GoogleSignIn /> },
      { path: "signup", element: <SignUp /> },
      { path: "rent-locs", element: <RentLocs /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
