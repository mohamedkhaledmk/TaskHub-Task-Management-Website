import React, { useEffect } from "react";
import Sidebar from "../userComponents/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../redux/taskSlice";
import { FaCheckSquare, FaEdit, FaTrash } from "react-icons/fa";
import { getUsers } from "../../redux/authSlice";
import axios from "axios";
const AssignUsers = () => {
  const usersAPI = import.meta.env.VITE_USERS_ENDPOINT;
  const loading = useSelector((state) => state.task.loading);
  const tasks = useSelector((state) => state.task.tasks);
  const task = tasks ? tasks[0] : null;
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  useEffect(() => {
    if (token) {
      dispatch(getTasks(token));
      dispatch(getUsers(token));
    }
  }, [dispatch, token]); // Add token as a dependency
  const handleDelete = async (id) => {
    console.log(`Bearer ${token}`);
    const deletedUser = await axios
      .delete(`${usersAPI}/${id}`, {
        headers: { Authorization: `${token}` },
      })
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  return (
    <div className="flex flex-col lg:flex-row min-h-[93vh] gap-2">
      <div className="w-full lg:w-1/6 p-2">
        <Sidebar />
      </div>
      <div className="w-full">
        {task ? ( // Ensure task exists before rendering
          <>
            <h1 className="text-center my-4 text-[#0D47A1] font-bold text-5xl font-serif">
              {task.title}
            </h1>
            <div className="w-full flex justify-center text-center">
              <table className=" w-[80%]">
                <thead className="bg-[#0D47A1] text-white">
                  <tr className="border border-black">
                    <th className="flex justify-center items-center py-2">
                      {" "}
                      {/* Vertical padding added */}
                      <FaCheckSquare />
                    </th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>
                        <input type="checkbox" name="" id="" />
                      </td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td className="flex justify-evenly">
                        {/* <button>
                          <FaEdit color="green" />
                        </button> */}
                        <button onClick={() => handleDelete(user._id)}>
                          <FaTrash color="red" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p className="text-center">Loading...</p> // Loading placeholder if task is null
        )}
      </div>
    </div>
  );
};

export default AssignUsers;
