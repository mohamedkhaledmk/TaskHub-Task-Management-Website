/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const tasksAPI = import.meta.env.VITE_TASKS_ENDPOINT;

const InputData = ({
  form,
  setForm,
  taskToEdit,

  handleAddNewTask,
}) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const notify = (message) => toast(message); // Global notification

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
      setErrorMessage("All fields are required.");
      return;
    }
    const taskData = {
      title,
      dueDate,
      description,
    };

    if (taskToEdit) {
      // Editing a task
      axios({
        method: "put",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        url: `${tasksAPI}/${taskToEdit._id}`,
        data: { ...taskToEdit, ...taskData },
      })
        .then(() => {
          resetForm(); // Reset form fields after successful submission
          notify("Tasks Updated Successfully!"); // Show success notification
          handleAddNewTask(); // Handle task update logic
        })
        .catch((error) => {
          console.error("Error updating task:", error);
          toast.error("An error occurred while updating the task.");
          setErrorMessage("An error occurred while updating the task.");
        });
    } else {
      // Adding a new task
      const addtask = { ...taskData, users: []};
      axios({
        method: "post",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        url: tasksAPI,
        data: addtask,
      })
        .then(() => {
          resetForm(); // Reset form fields after successful submission
          handleAddNewTask(); // Handle task addition logic
          toast.success("Tasks Added Successfully!"); // Show success notification
        })
        .catch((error) => {
          console.error("Error adding task:", error);
          toast.error(
            "An error occurred while adding the task. Please try again."
          );
          setErrorMessage(
            "An error occurred while adding the task. Please try again."
          );
        });
    }
  };

  const resetForm = () => {
    // Reset form fields
    setTitle("");
    setDueDate("");
    setDescription("");
    setErrorMessage(""); // Clear error message
    setForm("hidden"); // Hide the modal after submission
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

              {/* Display error message if validation fails */}
              {errorMessage && (
                <p className="text-red-500 mb-4 font-medium">{errorMessage}</p>
              )}

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
