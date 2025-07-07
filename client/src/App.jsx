import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import RentLocs from "./pages/RentLocs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignUp /> },
      { path: "rent-locs", element: <RentLocs /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
