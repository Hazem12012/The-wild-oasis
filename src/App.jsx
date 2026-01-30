import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import Users from "./pages/Users";
import GlobalStyles from "./styles/GlobalStyles";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        element: <Navigate replace to='dashboard' />,
        index: true,
      },
      {
        element: <Dashboard />,
        path: "dashboard",
      },
      {
        element: <Bookings />,
        path: "bookings",
      },
      {
        element: <Cabins />,
        path: "cabins",
      },
      {
        element: <Users />,
        path: "users",
      },
      {
        element: <Settings />,
        path: "settings",
      },
      {
        element: <Account />,
        path: "account",
      },
    ],
  },
  {
    element: <Login />,
    path: "login",
  },
  {
    element: <PageNotFound />,
    path: "*",
  },
]);
function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
