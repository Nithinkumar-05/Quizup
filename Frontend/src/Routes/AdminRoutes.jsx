import { Outlet,Navigate } from "react-router-dom";

const AdminRoutes = () =>{
    const user = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if(user && role === "admin"){
        return <Outlet/>
    }
    else{
        return <Navigate to="/Login" replace={true} />
    }
}

export default AdminRoutes;