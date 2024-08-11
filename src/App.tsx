import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import DashboardPage from "@/pages/DashboardPage";
import AppLayout from "./layouts/AppLayout";
import BookingsPage from "./pages/BookingsPage";
import CabinsPage from "./pages/CabinsPage";
import UsersPage from "./pages/UsersPage";
import SettingsPage from "./pages/SettingsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate replace to="/dashboard" />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "bookings",
        element: <BookingsPage />,
      },
      {
        path: "cabins",
        element: <CabinsPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
