import "react-toastify/dist/ReactToastify.css";
import { useCallback, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import InputData from "./InputData";
import TasksList from "./TasksList";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { displayForm, getTasks } from "../../redux/taskSlice";
import { logout } from "../../redux/authSlice";
import Loader from "./Loader";

function Main() {
  const allTasks = useSelector((state) => state.task.tasks);
  const form = useSelector((state) => state.task.form);
  const token = useSelector((state) => state.user.token);
  const filter = useSelector((state) => state.task.filter);
  const searchQuery = useSelector((state) => state.task.searchQuery);
  const loading = useSelector((state) => state.task.loading);
  const dispatch = useDispatch();

  const notifyError = useCallback(
    (message) => toast.error(`Error: ${message}`),
    []
  );

  useEffect(() => {
    dispatch(getTasks(token)).then((result) => {
      if (result.meta.requestStatus === "rejected") {
        if (result.payload.code == "ERR_NETWORK") {
          notifyError("The server is down please try again later");
        } else if (result.payload.status == 401) {
          notifyError(
            result.payload.response.data.message ||
              "Not Authorised. Login Again"
          );
          setTimeout(() => dispatch(logout()), 1000);
        } else {
          notifyError(
            result.payload.response.data.message || "Getting Tasks Failed."
          );
        }
      }
    });
  }, [dispatch, token, notifyError]);

  function filterTasks() {
    let filteredTasks = allTasks;

    if (searchQuery) {
      filteredTasks = filteredTasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (filter) {
      case "overdue":
        return filteredTasks.filter(
          (task) => new Date(task.dueDate) < new Date()
        );

      case "completed":
        return filteredTasks.filter((task) => task.completed);

      case "in-progress":
        return filteredTasks.filter((task) => !task.completed);

      case "important":
        return filteredTasks.filter((task) => task.important);

      default:
        return filteredTasks;
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full lg:w-5/6 border bg-[#F5F5F7] rounded-xl p-4">
      <div className="flex flex-wrap">
        <TasksList tasks={filterTasks()} />
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

      {form && <InputData />}
      <ToastContainer />
    </div>
  );
}

export default Main;
