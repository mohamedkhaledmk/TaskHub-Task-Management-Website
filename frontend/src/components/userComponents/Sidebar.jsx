/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaTasks } from "react-icons/fa";
import { LuCheckCircle } from "react-icons/lu";
import { RiProgress3Line } from "react-icons/ri";
import {MdLabelImportant } from "react-icons/md";
import { IoTime } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setFilter } from "../../redux/taskSlice";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState('all');
  const dispatch = useDispatch();
  const data = [
    {
      title: "Tasks",
      icon: <FaTasks />,
      filter: 'all',
    },
    {
      title: "Important",
      icon: <MdLabelImportant />,
      filter: "important",
    },
    {
      title: "compeleted",
      icon: <LuCheckCircle />,
      filter: "completed",
    },
    {
      title: "In Progress",
      icon: <RiProgress3Line />,
      filter: "in-progress",
    },
    {
      title: "OverDue",
      icon: <IoTime />,
      filter: "overdue",
    },
  ];

  const handleClick = (filter) => {
    setActiveLink(filter); // Update the clicked filter
    dispatch(setFilter(filter));
  };

  return (
    <div className="flex flex-col align-middle pt-5 text-sm">
      {data.map((item, i) => (
        <button
          onClick={() => handleClick(item.filter)}
          key={i}
          className={`my-2 flex items-center gap-2 cursor-pointer p-2 rounded-2xl transition-all duration-300   hover:bg-blue-900 hover:text-white ${
            activeLink === item.filter
              ? "bg-blue-900 text-white"
              : "text-gray-800"
          }`}
        >
          {item.icon}
          {item.title}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
