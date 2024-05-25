import "./App.css";
import { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Register from "./pages/regis";
import Login from "./pages/login";
import Home from "./pages/home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Route>
  )
);

function App() {
  useEffect(() => {}, []);

  return <RouterProvider router={router} />;
}

export default App;
