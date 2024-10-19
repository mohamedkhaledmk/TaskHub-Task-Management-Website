import UserHeader from "../../components/userComponents/UserHeader";
import Sidebar from "../../components/userComponents/Sidebar";
import Main from "../../components/userComponents/Main";
import { Helmet } from "react-helmet";
function Home() {
  return (
  <>
      <Helmet>
        <title>Task-Home</title>
      </Helmet>
      <div className="bg-white min-h-screen">
        <div className="bg-white h-[10vh]">
          <UserHeader/>
        </div>

        <div className="flex flex-col lg:flex-row min-h-[93vh] gap-2">
          <div className="w-full lg:w-1/6 p-2">
            <Sidebar/>
          </div>

          <Main/>
        </div>
      </div>

  </>    
  );
}

export default Home;
