import { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import InputData from "./InputData";
import TasksList from './TasksList';

function Main({ searchQuery }) {
  const { userid, setUserId } = useState("123");
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState("hidden");
  const [taskToEdit, setTaskToEdit] = useState(null); // State for the task being edited

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };
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
  }, []); // Dependency on `userid`, so it fetches when `userid` changes
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery)
  );
  return (
    <div className="w-full lg:w-5/6 border bg-[#F5F5F7] rounded-xl p-4">
      <div className="flex flex-wrap">
        
        <TasksList tasks={filteredTasks} form={form} setForm={setForm}  handleDeleteTask ={handleDeleteTask} setTaskToEdit={setTaskToEdit}/>
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
          userid={null}
          taskToEdit={taskToEdit}
        />
      )}
    </div>
  );
}

export default Main;
