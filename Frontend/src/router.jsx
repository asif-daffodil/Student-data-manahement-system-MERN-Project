import { createBrowserRouter } from "react-router";
import AllStudent from "./pages/AllStudent";
import Layout from "./layout";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <AllStudent />,
      },
      {
        path: "/login",
        element: <Login />,
      }
    ]
  },
]);

export default router;