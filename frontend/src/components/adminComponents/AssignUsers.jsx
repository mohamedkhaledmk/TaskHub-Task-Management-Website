import React, { useEffect, useState } from "react";
import Sidebar from "../userComponents/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../redux/taskSlice";
import { FaCheckSquare, FaEdit, FaTrash } from "react-icons/fa";
import { getUsers } from "../../redux/authSlice";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
const AssignUsers = () => {
  const usersAPI = import.meta.env.VITE_USERS_ENDPOINT;
  const loading = useSelector((state) => state.task.loading);
  const tasks = useSelector((state) => state.task.tasks);
  const task = tasks ? tasks[0] : null;
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const initialUsers = useSelector((state) => state.user.users);
  let [users, setUsers] = useState(initialUsers);
  let [selectedUsers, setSelectedUsers] = useState([]);
  useEffect(() => {
    if (token) {
      dispatch(getTasks(token));
      dispatch(getUsers(token));
    }
  }, [dispatch, token]); // Add token as a dependency
  useEffect(() => {
    setUsers(initialUsers); // Update local state whenever initialUsers changes
  }, [initialUsers]);

  const handleDelete = async (id) => {
    console.log(`Bearer ${token}`);
    const deletedUser = await axios
      .delete(`${usersAPI}/${id}`, {
        headers: { Authorization: `${token}` },
      })
      .then((res) => {
        setUsers(users.filter((user) => user._id != id));
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const handleCheckboxChange = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };
  const handleAssign = async () => {
    const assignedUsers = await axios
      .post(
        `${usersAPI}/${task._id}`,
        { users: selectedUsers },
        {
          headers: { Authorization: `${token}` },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <div className="flex flex-col lg:flex-row min-h-[93vh] gap-2">
      <ToastContainer />
      <div className="w-full lg:w-1/6 p-2">
        <Sidebar />
      </div>
      <div className="w-full mb-36">
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
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          onChange={() => {
                            handleCheckboxChange(user._id);
                          }}
                        />
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
            <div className="w-full flex justify-center mt-4">
              <button
                onClick={handleAssign}
                className="bg-[#0D47A1] text-white font-bold font-serif py-2 px-4 rounded-lg mt-4 w-1/2"
              >
                {" "}
                Assign
              </button>
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
