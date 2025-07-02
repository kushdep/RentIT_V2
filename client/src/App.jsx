import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { action as LoginAction } from "./pages/LoginPage";
import { action as RegisterAction } from "./pages/LoginPage";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/RegisterPage";

const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/login", element: <LoginPage />, action: LoginAction },
  {path:'/register',element:<Register/>,action:RegisterAction}
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
