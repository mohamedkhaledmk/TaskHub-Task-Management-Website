/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/userComponents/Sidebar";
import axios from "axios";
import Cards from "../../components/userComponents/Cards";
import UserHeader from "../../components/userComponents/UserHeader";

const InprogressTasks = ({ userid }) => {
  const [tasks, setTasks] = useState([]);
  // const { userid } = useParams();
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  // Function to handle search input from UserHeader
  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  // Filter tasks based on the search query
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery)
  );
  console.log(searchQuery);

  // Fetch completed tasks based on userid when the component mounts
  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/Tasks?completed=false&userid=${userid}`
        );
        setTasks(response.data); // Set the tasks to only those that are completed and match the userid
      } catch (error) {
        console.error("Error fetching completed tasks:", error);
      }
    };

    if (userid) {
      fetchCompletedTasks(); // Fetch tasks only if userid is available
    }
  }, [userid]); // Fetch tasks again if userid changes
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-white h-[10vh]">
        <UserHeader handleSearch={handleSearch} />
      </div>
      <div className="flex flex-col lg:flex-row min-h-[93vh] gap-2">
        <div className="w-full lg:w-1/6 p-2">
          <Sidebar />
        </div>

        <div className="w-full lg:w-5/6 border bg-[#F5F5F7] rounded-xl p-4">
          <div className="flex flex-wrap">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <div
                  className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 p-2"
                  key={task.id}
                >
                  <Cards task={task} />
                </div>
              ))
            ) : (
              <p className="text-center w-full"> No incompleted tasks found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InprogressTasks;
