import { Outlet,Navigate } from "react-router-dom";

const StudentRoutes = () =>{
    const user = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if(user && role === "student"){
        return <Outlet/>
    }
    else{
        return <Navigate to="/Login" replace={true} />
    }
}

export default StudentRoutes;