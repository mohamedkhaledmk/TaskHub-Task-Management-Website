// import { Button } from "@material-tailwind/react";
import { useEffect, useState } from 'react';
import UserHeader from './components/userComponents/UserHeader';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './components/userComponents/Sidebar';
import Cards from './components/userComponents/Cards';
import { FaPlus } from 'react-icons/fa';
import InputData from './components/userComponents/InputData';
import Main from './components/userComponents/Main';


// const routes = (
//   <Router>
//     <Routes>
//       <Route path="/user" exact element={<UserLayout />} />
//       {/*   <Route path="/admin/*" element={user.role == 'admin' ?<AdminLayout /> :<NotFound />} /> */}
//       <Route path="/admin/*" exact element={<AdminLayout />} />
//     </Routes>
//   </Router>
// );

function App() {
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  // const userid = 123; //

  // Fetch tasks based on `userid`

  

  // tasks.map((task) => console.log(task.title)); // Log tasks (for debugging)

  // Function to handle task deletion

  // Function to handle search input from UserHeader
  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  // Filter tasks based on the search query
  

  return (
    <div className="bg-white min-h-screen">
    <div className="bg-white h-[10vh]">
      <UserHeader handleSearch={handleSearch} />
    </div>

    <div className="flex flex-col lg:flex-row min-h-[93vh] gap-2">
      <div className="w-full lg:w-1/6 p-2">
        <Sidebar />
      </div>

     <Main searchQuery={searchQuery}/>
    </div>
  </div>
  );
}

export default App;
