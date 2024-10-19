/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { MdDelete, MdLabelImportant } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import ConfirmModal from "./ConfirmModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const tasksAPI = import.meta.env.VITE_TASKS_ENDPOINT;

const Cards = ({
  task,
  setForm,
  setTaskToEdit,
  handleDeleteTask,
  handleChange,
}) => {
  const { title, dueDate, description, completed, important, _id } = task;
  const formattedDueDate = dueDate
    ? new Date(dueDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;
  const [isCompleted, setIsCompleted] = useState(completed);
  const [isImportant, setIsImportant] = useState(important);
  const [showModal, setShowModal] = useState(false); // State for showing the confirmation modal

  // Function to handle completion status
  const handleCompletion = async () => {
    try {
      const updatedTask = { ...task, completed: !isCompleted }; // Toggle completion
      await axios({
        method: "put",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        url: `${tasksAPI}/${_id}`,
        data: updatedTask,
      });

      setIsCompleted(!isCompleted); // Update UI state to reflect completion
      handleChange();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Function to handle important status
  const handleImportant = async () => {
    try {
      const updatedTask = { ...task, important: !isImportant }; // Toggle important status
      await axios({
        method: "put",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        url: `${tasksAPI}/${_id}`,
        data: updatedTask,
      });

      setIsImportant(!isImportant); // Update UI state to reflect importance
      handleChange();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Handle editing the task
  const handleEdit = () => {
    setForm("fixed");
    setTaskToEdit(task); // Set the task to edit in Dashboard state
    // Show the form modal
  };

  // Handle deleting the task
  const handleDelete = async () => {
    try {
      await axios({
        method: "delete",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        url: `${tasksAPI}/${_id}`,
      });
      toast.success("Task deleted Successfully");
      handleDeleteTask(_id);
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("error deleting task: " + error.message);
    }
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
          <span className="text-sm">{formattedDueDate}</span>
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
