/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Helmet } from "react-helmet";

const signUpAPI = import.meta.env.VITE_REGISTER_ENDPOINT;

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [state, setState] = useState(false);
  const [emailState, setEmailState] = useState(false);
  const [passState, setPassState] = useState(false);

  const [labelName, setlabelName] = useState("Username");
  const [labelEmail, setlabelEmail] = useState("Email");
  const [labelPassword, setlabelPassword] = useState("Password");

  const [error, setError] = useState("");
  const navigate = useNavigate("/");
  const notifySuccess = () => toast.success("Registered Successfully!");
  const notifyError = (message) => toast.error(`Error: ${message}`);

  const handelStat = () => {
    setState(false);
    setlabelName("UserName");

    setEmailState(false);
    setlabelEmail("Email");

    setPassState(false);
    setlabelPassword("Password");
  };
  const handleForm = (e) => {
    e.preventDefault();
    const userData = { name: userName, email, password };

    let check = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;

    if (userName.length < 3 || !isNaN(parseInt(userName))) {
      setState(true);
      setlabelName("incorrect name , Username should be more than 2 letters");
    } else if (!check.test(email)) {
      handelStat();
      setEmailState(true);
      setlabelEmail("incorrect email , please enter valid email");
    } else if (password.length < 6) {
      handelStat();
      setPassState(true);
      setlabelPassword("Password should be more than 6 letters");
    } else {
      handelStat();
      axios({
        method: "post",
        url: "http://localhost:8000/api/users/register",
        data: userData,
      })
        .then(() => {
          navigate("/login");
          notifySuccess;
        })
        .catch((error) => {
          notifyError(error.response.data.message);
        });
    }
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row justify-center items-center h-screen ">
      <Helmet>
        <title>Task-Register</title>
      </Helmet>
      <div className="flex flex-col justify-center w-full h-full items-center pt-10">
        <ToastContainer />

        <div className="p-2 ">
          <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
              Sign Up
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Nice to meet you! Enter your details to register.
            </Typography>
            <form
              onSubmit={handleForm}
              className="mt-5 mb-2 w-80 max-w-screen-lg sm:w-96"
            >
              <div className=" flex flex-col gap-6">
                <Input
                  label={labelName}
                  error={state}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <Input
                  label={labelEmail}
                  error={emailState}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  label={labelPassword}
                  type="password"
                  error={passState}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button className="mt-6 bg-[#BA68C8]" fullWidth type="submit">
                sign up
              </Button>
              <Typography color="gray" className="mt-4 text-center font-normal">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-gray-900">
                  Sign In
                </Link>
              </Typography>
            </form>
          </Card>
        </div>
      </div>
      <div className="h-full w-full bg-[url('/signup.svg')] bg-cover"></div>
    </div>
  );
};

export default SignUp;
