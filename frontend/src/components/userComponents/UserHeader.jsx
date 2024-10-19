/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import imgSrc from "../images/img-removebg-preview.png";
import React, { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { setSearchQuery } from "../../redux/taskSlice";

const UserHeader = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-between mt-[-7px]">
      {/* User Image */}
      <div className="w-[100px] h-[80px] ms-2">
        <img
          className="w-full h-full bg-cover rounded-xl"
          src={imgSrc}
          alt=""
        />
      </div>
      <div className="w-[50%] h-[97%] flex">
        <input
          type="search"
          placeholder="Search"
          name="search"
          id="search"
          onChange={(e) => dispatch(setSearchQuery(e.target.value))} // Update the search state
          className="px-2 border border-gray-300 bg-gray-100 rounded-xl w-full h-[30px] focus:border-blue-500 focus:outline-none transition duration-300"
        />
      </div>
      <div
        className="relative text-gray-700 cursor-pointer me-4"
        onClick={toggleDropdown}
      >
        <HiOutlineDotsVertical className="text-xl" />

        {showDropdown && (
          <div className="absolute right-0 mt-4 w-40 bg-white rounded-md shadow-lg">
            <ul className="py-1 text-gray-700">
              <li
                className="block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                onClick={handleLogout}
              >
                Log out
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHeader;
