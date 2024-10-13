/* eslint-disable no-unused-vars */
import React from "react";
import { Route, Routes } from "react-router-dom";
import AllTasks from "./pages/user/AllTasks";
import CompeletedTasks from "./pages/user/CompeletedTasks";
import InprogressTasks from "./pages/user/InprogressTasks";
import ImportantTasks from "./pages/user/ImportantTasks";
import OverdueTasks from "./pages/user/OverdueTasks";
import NotFound from "./pages/user/NotFound";
import Dashboard from "./pages/user/Dashboard";
import UserHeader from "./components/userComponents/UserHeader";
import Sidebar from "./components/userComponents/Sidebar";

const UserLayout = () => {
  const userid = 123;
  return (
    <div className="relative">
      {/* <h1>userrrrrrrrr</h1> */}
      {/* <UserHeader />
      <Sidebar /> */}
      {/* <UserHeader /> */}

      <Routes>
        {/* Dashboard || all tasks / compeleted /inprogress/ important/ overdue */}
        <Route exact path="/:userid" element={<Dashboard />} />
        <Route
          path="/compeleted"
          element={<CompeletedTasks userid={userid} />}
        />
        <Route
          path="/inprogress"
          element={<InprogressTasks userid={userid} />}
        />
        <Route path="/important" element={<ImportantTasks userid={userid} />} />
        <Route path="/late" element={<OverdueTasks userid={userid} />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default UserLayout;
