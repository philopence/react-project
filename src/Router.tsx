import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import AppLayout from "@/layouts/AppLayout";
import BookingPage from "@/pages/BookingPage";
import BookingsPage from "@/pages/BookingsPage";
import CabinsPage from "@/pages/CabinsPage";
import CheckPage from "@/pages/CheckPage";
import CreateCabinPage from "@/pages/CreateCabinPage";
import DashboardPage from "@/pages/DashboardPage";
import LoginPage from "@/pages/LoginPage";
import SettingsPage from "@/pages/SettingsPage";
import UpdateCabinPage from "@/pages/UpdateCabinPage";
import UsersPage from "@/pages/UsersPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <Navigate replace to="/dashboard" />
          },
          {
            path: "dashboard",
            element: <DashboardPage />
          },
          {
            path: "bookings",
            children: [
              {
                index: true,
                element: <BookingsPage />
              },
              {
                path: ":id",
                element: <BookingPage />
              },
              {
                path: ":id/check",
                element: <CheckPage />
              }
            ]
          },
          {
            path: "cabins",
            children: [
              {
                index: true,
                element: <CabinsPage />
              },
              {
                path: "new",
                element: <CreateCabinPage />
              },
              {
                path: "edit/:id",
                element: <UpdateCabinPage />
              }
            ]
          },
          {
            path: "users",
            element: <UsersPage />
          },
          {
            path: "settings",
            element: <SettingsPage />
          }
        ]
      }
    ]
  }
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
