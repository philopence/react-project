import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import BookingsPage from "@/pages/BookingsPage";
import CabinsPage from "@/pages/CabinsPage";
import DashboardPage from "@/pages/DashboardPage";
import SettingsPage from "@/pages/SettingsPage";
import UsersPage from "@/pages/UsersPage";
import CreateCabinPage from "./pages/CreateCabinPage";
import EditCabinPage from "./pages/EditCabinPage";

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
        children: [
          {
            index: true,
            element: <CabinsPage />,
          },
          {
            path: "new",
            element: <CreateCabinPage />,
          },
          {
            path: "edit/:id",
            element: <EditCabinPage />,
          },
        ],
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

export default function Router() {
  return <RouterProvider router={router} />;
}
