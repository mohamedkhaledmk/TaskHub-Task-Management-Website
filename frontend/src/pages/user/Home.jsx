import UserHeader from "../../components/userComponents/UserHeader";
import Sidebar from "../../components/userComponents/Sidebar";
import Main from "../../components/userComponents/Main";
import { useState } from "react";
function Home() {
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [filter, setFilter] = useState("all");
  function handleFilter(filter) {
    setFilter(filter);
  }
  // Function to handle search input from UserHeader
  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  return (
      <div className="bg-white min-h-screen">
        <div className="bg-white h-[10vh]">
          <UserHeader handleSearch={handleSearch}/>
        </div>

        <div className="flex flex-col lg:flex-row min-h-[93vh] gap-2">
          <div className="w-full lg:w-1/6 p-2">
            <Sidebar handleFilter={handleFilter} />
          </div>

          <Main  searchQuery={searchQuery} filter={filter}/>
        </div>
      </div>
    
  );
}

export default Home;
