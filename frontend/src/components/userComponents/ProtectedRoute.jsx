import { Navigate } from "react-router-dom"

function ProtectedRoute ({protectedComponents}){
    console.log(!localStorage.getItem('token'))
    if(!localStorage.getItem('token')) 
    { 
        console.log("No Token Found");
        return <Navigate to = '/login'/>
    }
        	
    return protectedComponents;
}
export default ProtectedRoute;