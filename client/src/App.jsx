import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { action as LoginAction } from "./pages/LoginPage";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  {path:'/login', element:<LoginPage/>,action:LoginAction}
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
