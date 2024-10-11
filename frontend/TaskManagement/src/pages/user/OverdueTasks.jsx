/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/userComponents/Sidebar";
import Cards from "../../components/userComponents/Cards";
import axios from "axios";
import moment from "moment";
import UserHeader from "../../components/userComponents/UserHeader";

const OverdueTasks = ({ userid }) => {
  const [tasks, setTasks] = useState([]);
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

  // Fetch tasks based on userid when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/Tasks?userid=${userid}`
        );
        const allTasks = response.data;

        // Filter tasks where the dueDate has passed the current date
        const overdueTasks = allTasks.filter((task) => {
          if (task.dueDate) {
            const dueDate = new Date(task.dueDate); // Convert dueDate to Date object
            return dueDate < new Date(); // Check if the dueDate is before the current date
          }
          return false; // No dueDate means not overdue
        });

        setTasks(overdueTasks); // Set the filtered overdue tasks
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    if (userid) {
      fetchTasks(); // Fetch tasks only if userid is available
    }
  }, [userid]);

  return (
    // <div className="bg-white min-h-screen">
    //   <div className="bg-white h-[7vh]  flex items-center justify-center">
    //     <h1 className="text-2xl font-bold">navbar</h1>
    //   </div>
    //   <div className="flex flex-col lg:flex-row min-h-[93vh] gap-2">
    //     <div className="w-full lg:w-1/6 p-2">
    //       <Sidebar />
    //     </div>

    //     <div className="w-full lg:w-5/6 border bg-[#F5F5F7] rounded-xl p-4">
    //       <div className="flex flex-wrap">
    //         {/* {tasks.map((task) => (
    //         <div
    //           className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 p-2"
    //           key={task.id}
    //         >
    //           <Cards
    //             task={task}
    //             form={form}
    //             setForm={setForm}
    //             setTaskToEdit={setTaskToEdit}
    //             handleDeleteTask={handleDeleteTask}
    //           />
    //         </div>
    //       ))} */}
    //       </div>
    //     </div>
    //   </div>
    // </div>

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
              <p className="text-center w-full">No overdue tasks found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverdueTasks;
