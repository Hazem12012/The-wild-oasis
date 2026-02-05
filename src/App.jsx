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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import toast from "./../node_modules/react-hot-toast/src/index";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});
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
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <RouterProvider router={router} />
      <Toaster
        position={"top-center"}
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#ffff",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
