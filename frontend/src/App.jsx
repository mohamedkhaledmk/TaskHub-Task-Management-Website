// import { Button } from "@material-tailwind/react";

import Login from "./pages/user/Login";
import Home from "./pages/user/Home";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/userComponents/ProtectedRoute";
import SignUp from "./pages/user/SignUp";
import NotFound from './pages/user/NotFound';

function App() {
  return(
    <Routes>
        <Route path="/" element={<ProtectedRoute protectedComponents={<Home />}/>}/>
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp/>}/>
        <Route path='*' element = {<NotFound/>} /> 

    </Routes>
  )
}

export default App;
