/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
const loginAPI = import.meta.env.VITE_LOGIN_ENDPOINT;
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const notifySuccess = () => toast.success("Login Successful!");

  const notifyError = (message) => toast.error(`Error: ${message}`);
  const checkLogin = () => {
    axios({
      method: "post",
      url: loginAPI,
      data: { email, password },
    })
      .then((res) => {
        localStorage.setItem("token", `Bearer ${res.data.token}`);
        setError("");
        notifySuccess(); // Success notification
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((error) => {
        notifyError(error.response.data.message);
        setError(error.response.data.message);
      });
  };
  const handelForm = (e) => {
    e.preventDefault();
    checkLogin();
  };
  return (
    <>
      <Helmet>
        <title>Task-Login</title>
      </Helmet>
      <div className="flex flex-col justify-center items-center w-screen pt-20">
        <ToastContainer />
        <div>
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

              <Button className="mt-6" fullWidth type="submit">
                Sign In
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
      <div className="bg-[url('/login.jpg')] bg-cover w-full hidden lg:block">
        ssssssssss
      </div>
    </>
  );
};

export default Login;
