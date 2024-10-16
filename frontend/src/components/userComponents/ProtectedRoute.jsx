import { Navigate } from "react-router-dom"
import {useSelector} from 'react-redux';
function ProtectedRoute ({protectedComponents}){
    const isLoggedIn = useSelector((state)=>state.user.isLoggedIn);
    console.log(isLoggedIn);
    if(!isLoggedIn) 
    { 
        return <Navigate to = '/login'/>
    }
    
    return protectedComponents;
}
export default ProtectedRoute;