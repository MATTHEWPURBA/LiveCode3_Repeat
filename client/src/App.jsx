import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
    // element:
  },
  {
    path: "/login",
    element: <Login />,
    // element:
  },
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
