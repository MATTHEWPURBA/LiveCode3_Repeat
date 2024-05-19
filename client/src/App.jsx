import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import MainLayout from "./components/MainLayout";
import Homepage from "./pages/Homepage";
import Favourite from "./pages/Favourites";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    loader: () => {
      if (!localStorage.token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <Homepage position = "homepage" />,
        // buat props untuk lofic reusable cards,
        // jadi nanti cards yang disini menampilkan add to fav
      },
      {
        path: "/favourites",
        element: <Favourite position = "favourite" />,
          // buat props untuk lofic reusable cards,
        // jadi nanti cards yang disini menampilkan edit favourite
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
    loader: () => {
      if (localStorage.token) {
        return redirect("/");
      }
    },
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
