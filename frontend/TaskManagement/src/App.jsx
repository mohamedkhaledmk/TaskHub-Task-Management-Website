// import { Button } from "@material-tailwind/react";
import { Route, Routes } from "react-router-dom";
import UserLayout from "./UserLayout";
import AdminLayout from "./AdminLayout";

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
  return (
    <div>
      <Routes>
        <Route path="/user/*" element={<UserLayout />} />
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
      {/* {routes} */}
    </div>
  );
}

export default App;
