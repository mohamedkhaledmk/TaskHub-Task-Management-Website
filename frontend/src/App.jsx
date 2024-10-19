// import { Button } from "@material-tailwind/react";

import Login from "./pages/user/Login";
import Home from "./pages/user/Home";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/userComponents/ProtectedRoute";
import SignUp from "./pages/user/SignUp";
import { ToastContainer } from "react-toastify";
import NotFound from './pages/user/NotFound';

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
        <Route path="*" element={<NotFound /> }/>
      </Routes>
    </div>
  );
}

export default App;
