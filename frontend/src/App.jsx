// import { Button } from "@material-tailwind/react";

import Login from "./pages/user/Login";
import Home from "./pages/user/Home";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/userComponents/ProtectedRoute";
import SignUp from "./pages/user/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer />{" "}
      <Routes>
        <Route
          path="/"
          element={<ProtectedRoute protectedComponents={<Home />} />}
        />
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
