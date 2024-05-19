import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import MainLayout from "./components/MainLayout";
import Homepage from "./pages/Homepage";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    loader: () => {
      if (!localStorage.token) {
        return redirect("/login");
      }
      return null
    },
    children: [
      {
        path: "/",
        element: <Homepage />,
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
