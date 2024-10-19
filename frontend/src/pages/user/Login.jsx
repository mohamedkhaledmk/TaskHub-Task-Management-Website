/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "react-toastify/dist/ReactToastify.css";
import { useCallback, useEffect, useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { FiLoader } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/authSlice";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loading = useSelector((state) => state.user.loading);
  const navigate = useNavigate();
  const notifySuccess = useCallback(() => toast.success("Login Successful!"),[]);
  const dispatch = useDispatch();
  const notifyError = useCallback((message) => toast.error(`Error: ${message}`) ,[]);
  const handelForm = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then((result)=>{
      console.log(result);
      if (result.meta.requestStatus === "fulfilled") {
        notifySuccess("Login successful!");
        setTimeout(() => navigate("/"), 1000);
      } else if (result.meta.requestStatus === "rejected") {
        notifyError(result.payload.response.data.message || "Login failed.");
      }
    })
  };
  
  return (
    <div className="flex h-screen flex-col md:flex-row">
      <Helmet>
        <title>Task-Login</title>
      </Helmet>
      <div className="flex flex-col justify-center items-center w-screen pt-20">
        <ToastContainer />
        <div className="p-2">
          {" "}
          <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
              Sign In
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Nice to meet you! Enter your details.
            </Typography>
            <form
              onSubmit={handelForm}
              className="mt-5 mb-2 w-80 max-w-screen-lg sm:w-96"
            >
              <div className="mb-0.5 flex flex-col gap-6 text-center">
                <Input
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button
                className="mt-6 bg-[#201B6B] text-center"
                fullWidth
                type="submit"
              >
                {loading ? <FiLoader className="m-auto animate-spin" /> : "Sign In"}
              </Button>
              <Typography color="gray" className="mt-4 text-center font-normal">
                do not have an account?{" "}
                <Link to="/sign-up" className="font-medium text-gray-900">
                  Sign Up
                </Link>
              </Typography>
            </form>
          </Card>
        </div>
      </div>
      <div className="bg-[url('/login.jpg')] bg-cover w-full h-full"></div>
    </div>
  );
};

export default Login;
