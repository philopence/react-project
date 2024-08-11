import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import DashboardPage from "@/pages/DashboardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate replace to="/dashboard" />,
  },
  {
    path: "/",
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
