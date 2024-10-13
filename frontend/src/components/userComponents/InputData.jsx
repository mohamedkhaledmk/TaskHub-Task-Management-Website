/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";

const InputData = ({
  form,
  setForm,
  taskToEdit,
  handleAddNewTask
}) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Use useEffect to update form fields when taskToEdit changes
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || "");
      setDueDate(taskToEdit.dueDate.split('T')[0] || "");
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
    console.log("Handle Form is called ");
    // Form validation: Check if all fields are filled
    if (!title || !dueDate || !description) {
      setErrorMessage("All fields are required.");
      return;
    }
    console.log(title,dueDate,description);
    const taskData = {
      title,
      dueDate,
      description

    };

    if (taskToEdit) {
      console.log(taskData);
      // editing a task, send PUT request
      axios({
        method: "put",
        headers:{
          Authorization:localStorage.getItem('token')
        },
        url: `http://localhost:8000/api/tasks/${taskToEdit._id}`,
        data: {...taskToEdit,...taskData},
      })
        .then(() => {
          // Reset form fields after successful submission
          console.log("Task is updated successfully");
          setTitle("");
          setDueDate("");
          setDescription("");
          setErrorMessage(""); // Clear error message
          setForm("hidden"); // Hide the modal after submission
          setForm("hidden");
          handleAddNewTask();
        })
        .catch((error) => {
          console.error("Error adding task:", error);
          setErrorMessage("An error occurred while updating the task.");
        });
    } else {
      const addtask = { ...taskData,users:[] };
      console.log(addtask);

      axios({
        method: "post",
        headers:{
          Authorization:localStorage.getItem('token')
        },
        url: "http://localhost:8000/api/tasks/",
        data: addtask,
      })
        .then((response) => {
          // console.log("Task added:", response.data);
          // Reset form fields after successful submission
          setTitle("");
          setDueDate("");
          setDescription("");
          setErrorMessage(""); // Clear error message
          setForm("hidden"); // Hide the modal after submission
          handleAddNewTask();
        })
        .catch((error) => {
          console.error("Error adding task:", error);
          setErrorMessage(
            "An error occurred while adding the task. Please try again."
          );
        });
    }
    // Post task data to the API
  };

  const restForm = () => {
    // Reset form fields after successful submission
    setTitle("");
    setDueDate("");
    setDescription("");
    setErrorMessage(""); // Clear error message
    setForm("hidden"); // Hide the modal after submission
  };

  return (
    <>
      {/* Overlay */}
      <div className={`${form}  inset-0 bg-gray-500 opacity-50 z-10`}></div>

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
                  onClick={restForm}
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
