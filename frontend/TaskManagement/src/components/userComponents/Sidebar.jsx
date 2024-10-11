/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaTasks } from "react-icons/fa";
import { LuCheckCircle } from "react-icons/lu";
import { RiProgress3Line } from "react-icons/ri";
import { MdLabelImportantOutline, MdLabelImportant } from "react-icons/md";
import { Link, useLocation, useParams } from "react-router-dom";
import { IoTime } from "react-icons/io5";

const Sidebar = () => {
  const location = useLocation(); // Hook to get the current URL
  const [activeLink, setActiveLink] = useState(location.pathname); // Set the active link based on current URL
  const { userid } = useParams();

  const data = [
    {
      title: "Tasks",
      icon: <FaTasks />,
      link: `/user/123`,
      // `/user?userid=${userid}`
    },
    {
      title: "Important",
      icon: <MdLabelImportant />,
      link: "/user/important",
    },
    {
      title: "compeleted",
      icon: <LuCheckCircle />,
      link: "/user/compeleted",
    },
    {
      title: "In Progress",
      icon: <RiProgress3Line />,
      link: "/user/inprogress",
    },
    {
      title: "OverDue",
      icon: <IoTime />,
      link: "/user/late",
    },
  ];

  //

  const handleClick = (link) => {
    setActiveLink(link); // Update the clicked link
  };

  return (
    <div className="flex flex-col align-middle pt-5 text-sm">
      {data.map((item, i) => (
        <Link
          to={item.link}
          onClick={() => handleClick(item.link)}
          key={i}
          className={`my-2 flex items-center gap-2 cursor-pointer p-2 rounded-2xl transition-all duration-300   hover:bg-blue-900 hover:text-white ${
            activeLink === item.link
              ? "bg-blue-900 text-white"
              : "text-gray-800"
          }`}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
