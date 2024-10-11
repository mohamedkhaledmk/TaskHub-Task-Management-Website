/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { MdDelete, MdLabelImportant } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import ConfirmModal from "./ConfirmModal";

const Cards = ({ task, form, setForm, setTaskToEdit, handleDeleteTask }) => {
  const { userid, title, dueDate, description, completed, important, id } =
    task;

  const [isCompleted, setIsCompleted] = useState(completed);
  const [isImportant, setIsImportant] = useState(important);
  const [showModal, setShowModal] = useState(false); // State for showing the confirmation modal

  // Function to handle completion status
  const handleCompletion = async () => {
    try {
      const updatedTask = { completed: !isCompleted }; // Toggle completion
      await axios.patch(`http://localhost:3000/Tasks/${id}`, updatedTask);
      setIsCompleted(!isCompleted); // Update UI state to reflect completion
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Function to handle important status
  const handleImportant = async () => {
    try {
      const updatedTask = { important: !isImportant }; // Toggle important status
      await axios.patch(`http://localhost:3000/Tasks/${id}`, updatedTask);
      setIsImportant(!isImportant); // Update UI state to reflect importance
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Handle editing the task
  const handleEdit = () => {
    setForm("fixed");
    setTaskToEdit(task); // Set the task to edit in Dashboard state
    console.log(task);
    // Show the form modal
  };

  // Handle deleting the task
  const handleDelete = async () => {
    // Show confirmation dialog
    // const confirmed = window.confirm(
    //   "Are you sure you want to delete this task?"
    // );
    // if (confirmed) {
    try {
      await axios.delete(`http://localhost:3000/Tasks/${id}`);
      handleDeleteTask(id);
    } catch (error) {
      console.error("Error deleting task:", error);
    }

    // }
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

// <div className="">
// <div className=" w-[31%] h-[220px] m-[1%]">
//   <div
//     className={`p-4 w-[100%] h-[100%] ${
//       isCompleted ? "bg-blue-300 text-white" : "bg-white text-gray-500"
//     } rounded-xl flex flex-col justify-between h-full `}
//   >
//     <div>
//       <h3 className="text-xl font-semibold">{title}</h3>
//       <span className="text-xs">{deadline}</span>
//       <p className=" my-2">{description}</p>
//     </div>
//     <div className="mt-4 w-full flex items-center justify-between">
//       {/* Completion Button */}
//       <button
//         onClick={handleCompletion}
//         className={`${
//           isCompleted ? "bg-blue-600" : "bg-gray-400"
//         } py-2 px-4 text-white rounded-2xl text-sm`}
//       >
//         {isCompleted ? "Completed" : "Incomplete"}
//       </button>

//       {/* Important and Other Actions */}
//       <div className="text-gray-300 text-xl">
//         <button
//           onClick={handleImportant}
//           className={`${
//             isImportant ? "text-red-600" : "text-gray-400"
//           } mx-3 hover:text-red-600`}
//         >
//           <MdLabelImportant />
//         </button>
//         <button className="mx-3 hover:text-blue-900">
//           <FaEdit />
//         </button>
//         <button className="mx-3 hover:text-blue-900">
//           <MdDelete />
//         </button>
//       </div>
//     </div>
//   </div>
// </div>
// </div>
