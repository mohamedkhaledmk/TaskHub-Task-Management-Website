/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../components/userComponents/Sidebar";
import Cards from "../../components/userComponents/Cards";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import InputData from "../../components/userComponents/inputData";
import UserHeader from "../../components/userComponents/UserHeader";

const Dashboard = () => {
  // const x = useSelector((state) => state.testState);  // Example Redux state (if needed)
  // console.log(x);

  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState("hidden");
  const { userid } = useParams(); // Get user ID from the URL
  // const userid = 123; //
  const [taskToEdit, setTaskToEdit] = useState(null); // State for the task being edited
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  // Fetch tasks based on `userid`
  const getUserTasks = () => {
    axios({
      method: "get",
      url: `http://localhost:3000/Tasks?userid=${userid}`, // Filter tasks by `userid`
    })
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  };

  useEffect(() => {
    getUserTasks();
  }, [userid]); // Dependency on `userid`, so it fetches when `userid` changes

  // tasks.map((task) => console.log(task.title)); // Log tasks (for debugging)

  // Function to handle task deletion
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Function to handle search input from UserHeader
  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  // Filter tasks based on the search query
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery)
  );
  console.log(searchQuery);

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
            {filteredTasks.map((task) => (
              <div
                className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 p-2"
                key={task.id}
              >
                <Cards
                  task={task}
                  form={form}
                  setForm={setForm}
                  setTaskToEdit={setTaskToEdit}
                  handleDeleteTask={handleDeleteTask}
                />
              </div>
            ))}

            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 p-2 m-2">
              <div
                onClick={() => setForm("fixed")}
                className="h-[220px] bg-white rounded-xl flex flex-col justify-center items-center text-gray-500 cursor-pointer hover:scale-105 transition-all duration-300"
              >
                <FaPlus />
                <h1>Add New Task</h1>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setForm("fixed")}
              className="bg-blue-900 rounded-xl p-3 text-white text-2xl flex items-center"
            >
              <FaPlus />
            </button>
          </div>

          {form && (
            <InputData
              form={form}
              setForm={setForm}
              userid={userid}
              taskToEdit={taskToEdit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// <div>
//   <div className="bg-white h-[7vh]">navbar</div>
//   <div className="flex p-2 min-h-[93vh] gap-2">
//     <div className="w-1/6">
//       <Sidebar />
//     </div>

//     <div className="w-5/6 border bg-[#F5F5F7] rounded-xl ">
//       <div className=" w-[100%] flex flex-row flex-wrap p-5 ">
//         {tasks.map((task, index) => (
//           <Cards task={task} key={index} />
//         ))}

//         <div className=" w-[31%] h-[220px] bg-white  rounded-xl m-[1%] flex  justify-center items-center text-gray-500 cursor-pointer  hover:scale-105 transition-all duration-300">
//           <FaPlus />
//           <h1 className="ms-2 ">add new task</h1>
//         </div>
//       </div>

//       <div className="w-[96%] mt-5 flex justify-end  ">
//         <button className="bg-blue-900 p-2  rounded-xl text-white text-2xl ">
//           <FaPlus />
//         </button>
//       </div>
//     </div>
//   </div>
// </div>
