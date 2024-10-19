/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "react-toastify/dist/ReactToastify.css";
import React, { useCallback, useState } from "react";
import ConfirmModal from "./ConfirmModal";
import { MdDelete, MdLabelImportant } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { deleteTaskAPI, displayForm, setUpdateTask, updateTaskAPI } from "../../redux/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";

const Cards = ({task}) => {
  const { title, dueDate, description, completed, important, _id } = task;

  const [isCompleted, setIsCompleted] = useState(completed);
  const [isImportant, setIsImportant] = useState(important);
  const [showModal, setShowModal] = useState(false); // State for showing the confirmation modal
  const token = useSelector((state)=>state.user.token);

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const notifyError = useCallback((message) => toast.error(`Error: ${message}`) ,[]);
  const notifySuccess = useCallback((message) => toast.success(message),[]);

  const handleCompletion = async () => {
      const updatedTask = { ...task,completed: !isCompleted }; // Toggle completion
      const data = {updatedTask,token}
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
          setIsCompleted(!isCompleted); // Update UI state to reflect importance
          notifySuccess("Tasks Updated Successfully!"); // Show success notification
        }
      })
  };
  const handleImportant = async () => {
      const updatedTask = { ...task, important: !isImportant }; // Toggle important status
      const data = {updatedTask,token}
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
          setIsImportant(!isImportant); // Update UI state to reflect importance
          notifySuccess("Tasks Updated Successfully!"); // Show success notification
        }

      })
  };
  const handleEdit = () => {
    dispatch(displayForm());
    dispatch(setUpdateTask(task));
  };
  const handleDelete = async () => {
      const data = {_id:task._id,token};
      dispatch(deleteTaskAPI(data)).then((result)=>{
          if (result.meta.requestStatus === "rejected") {  
            if(result.payload.code == "ERR_NETWORK"){
              notifyError("The server is down please try again later");
            }
            else if(result.payload.status == 401){
              notifyError(result.payload.response.data.message || "Not Authorised.Login Again");
              setTimeout(()=>dispatch(logout()) ,1000);
            }
            else{
              notifyError(result.payload.response.data.message || "Deleting Task Failed.");
            }
          }else{
            notifySuccess("Task deleted Successfully");
          }
      });
      setShowModal(false);
  };

  return (
    <div className="lg:w-full md:w-full sm:w-full h-[220px] m-2 flex flex-col">
      <div
        className={`p-4 w-full h-full ${
          isCompleted ? "bg-blue-300 text-white" : "bg-white text-gray-500"
        } rounded-xl shadow-lg flex flex-col justify-between transition-all duration-300 ease-in-out`}
      >
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <span className="text-sm">{dueDate}</span>
          <p className="my-2 text-sm overflow-hidden w-full h-[70px]  overflow-y-auto">
            {description}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          {/* Completion Button */}
          <button
            onClick={handleCompletion}
            className={`py-2 px-4 text-white rounded-2xl text-sm ${
              isCompleted ? "bg-blue-600" : "bg-gray-400"
            } hover:bg-opacity-80 transition-all duration-300 `}
          >
            {isCompleted ? "Completed" : "Incomplete"}
          </button>

          {/* Important and Other Actions */}
          <div className="flex items-center">
            <button
              onClick={handleImportant}
              className={`text-xl ${
                isImportant ? "text-red-600" : "text-white-400"
              } mx-2 hover:text-red-700 transition-all duration-300`}
            >
              <MdLabelImportant />
            </button>
            <button
              onClick={handleEdit}
              className="mx-2 hover:text-blue-900 transition-all duration-300"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="mx-2 hover:text-blue-900 transition-all duration-300"
            >
              <MdDelete />
            </button>
          </div>
        </div>
      </div>
      {/* Render the ConfirmModal */}
      <ConfirmModal
        show={showModal}
        onConfirm={handleDelete} // Call handleDelete on confirmation
        onCancel={() => setShowModal(false)} // Close the modal on cancel
      />
    </div>
  );
};

export default Cards;
