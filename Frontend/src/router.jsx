import { createBrowserRouter } from "react-router";
import AllStudent from "./pages/AllStudent";
import Layout from "./Layout";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import DeleteStudent from "./pages/DeleteStudent";

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
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/add-student",
        element: <AddStudent />,
      },
      {
        path: "/edit-student/:id",
        element: <EditStudent />,
      },
      {
        path: "/delete-student/:id",
        element: <DeleteStudent />,
      }
    ]
  },
]);

export default router;