/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import oppsImg from "../../components/images/opps.jpg";

const NotFound = () => {
  const navigate = useNavigate(); // To handle navigation

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <img src={oppsImg} alt="Oops" className="w-full max-w-md mb-4" />
      <h1 className="text-4xl font-bold mb-4 text-center">
        404 - PAGE NOT FOUND
      </h1>
      <p className="text-center mb-6">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-blue-800 hover:bg-blue-700 rounded-xl p-2 text-white transition-all duration-300 ease-in-out"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default NotFound;
