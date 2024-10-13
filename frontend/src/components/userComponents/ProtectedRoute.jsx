import { Navigate } from "react-router-dom"

function ProtectedRoute ({protectedComponents}){
    if(!localStorage.getItem('token')) 
    { 
        return <Navigate to = '/login'/>
    }
        	
    return protectedComponents;
}
export default ProtectedRoute;