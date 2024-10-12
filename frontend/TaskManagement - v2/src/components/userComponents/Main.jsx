import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import InputData from "./InputData";
import TasksList from './TasksList';

function Main({ searchQuery ,filter}) {
  const [userid, setUserId] = useState("6708e58f92b50baf5ab39c03");
  const [allTasks,setAllTasks]=useState([]);
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState("hidden");
  const [taskToEdit, setTaskToEdit] = useState(null); // State for the task being edited
  const [trigger,setTrigger] = useState(true);
  const handleDeleteTask = (taskId) => {
    console.log("Removing Task From Tasks Array");
    setAllTasks((tasks)=>tasks.filter((task) => task._id !== taskId));
  };

  useEffect(() => {
    console.log(userid);
    axios({
      method: "get",
      headers:{
        Authorization:localStorage.getItem('token')
      },
      url: `http://localhost:8000/api/tasks/`,
    })
    .then((response) => {
        setAllTasks(response.data.data);
        setTasks(response.data.data)
      }
    )
    .catch((error) => console.error("Error fetching tasks:", error));
  
    
    
  }, [trigger]); // Dependency on `userid`, so it fetches when `userid` changes
  useEffect(()=>{
    setTasks(allTasks);
  },[allTasks])
  useEffect(()=>{
    const filteredTasks = allTasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery)
    );
    if(searchQuery !=""){
      setTasks(filteredTasks);
    }else{
      setTasks(allTasks);
    }
  },[searchQuery]);

  useEffect(()=>{
    switch(filter){
      case 'overdue':
        setTasks(allTasks.filter((task)=>new Date(task.dueDate) < new Date()));
        return;
      case 'completed':
        setTasks(allTasks.filter((task)=>task.completed));
        return;
      case 'in-progress':
        setTasks(allTasks.filter((task)=> !task.completed));
        return;
      case 'important':
        setTasks(allTasks.filter((task)=>task.important));
        return;
      default:
        setTasks(allTasks);
    }
  },[filter])
  function handleChange(){
    setTrigger(!trigger);
  }
  return (
    <div className="w-full lg:w-5/6 border bg-[#F5F5F7] rounded-xl p-4">
      <div className="flex flex-wrap">
        
        <TasksList tasks={tasks} form={form} setForm={setForm}  handleDeleteTask ={handleDeleteTask} setTaskToEdit={setTaskToEdit} handleChange={handleChange}/>
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
          handleAddNewTask={handleChange}
        />
      )}
    </div>
  );
}

export default Main;
