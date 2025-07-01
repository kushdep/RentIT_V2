import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";

const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  {path:'/login', element:<LoginPage/>}
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
