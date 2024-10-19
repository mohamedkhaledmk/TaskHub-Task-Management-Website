/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "react-toastify/dist/ReactToastify.css";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addTaskAPI, hideForm, updateTaskAPI } from "../../redux/taskSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";


const InputData = () => {
  const form = useSelector((state)=>state.task.form);
  const taskToEdit = useSelector((state)=>state.task.taskToEdit);
  const token = useSelector((state)=>state.user.token);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const notifyError = useCallback((message) => toast.error(`Error: ${message}`) ,[]);
  const notifySuccess = useCallback((message) => toast.success(message),[]);

  // Use useEffect to update form fields when taskToEdit changes
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || "");
      setDueDate(taskToEdit.dueDate.split("T")[0] || "");
      setDescription(taskToEdit.description || "");
    } else {
      // If no task to edit, reset the fields for creating a new task
      setTitle("");
      setDueDate("");
      setDescription("");
    }
  }, [taskToEdit]);

  const handleForm = (e) => {
    e.preventDefault();
    // Form validation: Check if all fields are filled
    if (!title || !dueDate || !description) {
      notifyError("All fields are required.");
      return;
    }
    const taskData = {
      title,
      dueDate,
      description,
    };

    if (taskToEdit) {
      // Editing a task
      const data =  {updatedTask : { ...taskToEdit, ...taskData } , token};
      dispatch(updateTaskAPI(data))
      .then((result) => {
        if (result.meta.requestStatus === "rejected") {  
          if(result.payload.code == "ERR_NETWORK"){
            notifyError("The server is down please try again later");
          }
          else if(result.payload.status == 401){
            notifyError(result.payload.response.data.message || "Not Authorised.Login Again");
            setTimeout(()=>dispatch(logout()) ,1000);
          }
          else{
            notifyError(result.payload.response.data.message || "Updating Task Failed.");
          }
        }else{
          resetForm(); // Reset form fields after successful submission
          notifySuccess("Tasks Updated Successfully!"); // Show success notification
        }

      })
    
    } else {
      // Adding a new task
      const addtask = { ...taskData, users: []};
      dispatch(addTaskAPI({token,addtask}))
      .then((result) => {
        if (result.meta.requestStatus === "rejected") {  
          if(result.payload.code == "ERR_NETWORK"){
            notifyError("The server is down please try again later");
          }
          else if(result.payload.status == 401){
            notifyError(result.payload.response.data.message || "Not Authorised.Login Again");
            setTimeout(()=>dispatch(logout()) ,1000);
          }
          else{
            notifyError(result.payload.response.data.message || "Updating Task Failed.");
          }
        }else{
          resetForm(); // Reset form fields after successful submission
          notifySuccess("Tasks Added Successfully!"); // Show success notification
        }
      })
    }
  };

  const resetForm = () => {
    // Reset form fields
    setTitle("");
    setDueDate("");
    setDescription("");
    dispatch(hideForm());
  };

  return (
    <>
      {/* Overlay */}
      <div className={`${form} inset-0 bg-gray-500 opacity-50 z-10`}></div>

      {/* Modal Container */}
      <div className={` ${form} z-20`}>
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg md:max-w-xl lg:max-w-2xl h-auto mx-4">
            <form onSubmit={handleForm}>
              {/* Title Field */}
              <label
                htmlFor="title"
                className="text-blue-600 font-semibold block mb-2"
              >
                Title
              </label>
              <input
                type="text"
                placeholder="Title"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="px-4 py-2 mb-4 border border-gray-300 rounded w-full focus:border-blue-500 focus:outline-none transition duration-300"
              />

              {/* Deadline Field */}
              <label
                htmlFor="date"
                className="text-blue-600 font-semibold block mb-2"
              >
                Deadline
              </label>
              <input
                type="date"
                id="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="px-4 py-2 mb-4 border border-gray-300 rounded w-full text-gray-500 focus:border-blue-500 focus:outline-none transition duration-300"
              />

              {/* Description Field */}
              <label
                htmlFor="description"
                className="text-blue-600 font-semibold block mb-2"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="5"
                placeholder="Enter your description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="px-4 py-2 mb-4 border border-gray-300 rounded w-full focus:border-blue-500 focus:outline-none transition duration-300"
              ></textarea>              

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-gray-600 hover:text-gray-800 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-5 rounded-xl transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default InputData;
