/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "react-toastify/dist/ReactToastify.css";
import { useCallback, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import InputData from "./InputData";
import TasksList from "./TasksList";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { displayForm, getTasks } from "../../redux/taskSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";

function Main() {
  const allTasks = useSelector((state)=>state.task.tasks);
  console.log(allTasks);
  const form = useSelector((state)=>state.task.form);
  const token = useSelector((state)=>state.user.token);
  const filter = useSelector((state) => state.task.filter);
  const searchQuery = useSelector((state)=>state.task.searchQuery);
  const dispatch = useDispatch();

  const [tasks, setTasks] = useState(allTasks);
  
  const notifyError = useCallback((message) => toast.error(`Error: ${message}`) ,[]);

  useEffect(() => {
    dispatch(getTasks(token)).then((result)=>{
      console.log(result);
      if (result.meta.requestStatus === "rejected") {
        
        if(result.payload.code == "ERR_NETWORK"){
          notifyError("The server is down please try again later");
        }
        else if(result.payload.status == 401){
          notifyError(result.payload.response.data.message || "Not Authorised.Login Again");
          
          setTimeout(()=>dispatch(logout()) ,1000);
        }
        else{
          notifyError(result.payload.response.data.message || "Getting Tasks Failed.");
        }
      }
    })
  }, []); 
  
  useEffect(()=>{
    setTasks(allTasks);
  },[allTasks])  
  
  useEffect(() => {
    if (searchQuery != "") {
        const filteredTasks = allTasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setTasks(filteredTasks);
    } else {
      setTasks(allTasks);
    }
  }, [searchQuery]);
  
  useEffect(() => {
    switch (filter) {
      case "overdue":
        setTasks(
          allTasks.filter((task) => new Date(task.dueDate) < new Date())
        );
        return;
      case "completed":
        setTasks(allTasks.filter((task) => task.completed));
        return;
      case "in-progress":
        setTasks(allTasks.filter((task) => !task.completed));
        return;
      case "important":
        setTasks(allTasks.filter((task) => task.important));
        return;
      default:
        setTasks(allTasks);
    }
  }, [filter]); 

  return (
    <div className="w-full lg:w-5/6 border bg-[#F5F5F7] rounded-xl p-4">
      <div className="flex flex-wrap">
        <TasksList tasks={tasks}/>
        <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 p-2 m-2">
          <div
            onClick={() => dispatch(displayForm())}
            className="h-[220px] bg-white rounded-xl flex flex-col justify-center items-center text-gray-500 cursor-pointer hover:scale-105 transition-all duration-300"
          >
            <FaPlus />
            <h1>Add New Task</h1>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => dispatch(displayForm())}
          className="bg-blue-900 rounded-xl p-3 text-white text-2xl flex items-center"
        >
          <FaPlus />
        </button>
      </div>

      {form && (
        <InputData/>
      )}
      <ToastContainer />
    </div>
  );
}

export default Main;
