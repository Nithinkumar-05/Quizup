import { Outlet,Navigate } from "react-router-dom";

const TeacherRoutes = () =>{
    const user = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if(user && role === "teacher"){
        return <Outlet/>
    }
    else{
        return <Navigate to="/Login" replace={true} />
    }
}

export default TeacherRoutes;