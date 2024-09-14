import React from "react";
import {
  Navbar as MTNavbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

function NavList() {
  return (
    <List className="ml-auto mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography
        as="a"
        href="/"
        variant="small"
        color="gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          <Link to="/">Home</Link>
        </ListItem>
      </Typography>
      {/* Add other navigation items here if necessary */}
    </List>
  );
}

const Navbar = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
const handleClick = ()=>{
  const role = localStorage.getItem("role");
  if(role){
    switch(role){
        case "admin":
          navigate("/AdminDashboard");
          break;
        case "student":
          navigate("/StudentDashboard");
          break;
        case "teacher":
          navigate("/TeacherDashboard");
          break;
        default:
          navigate("/");
          
    }
  }
}
  return (
    <MTNavbar className="mx-auto max-w-screen-xl px-4 py-2 m-2 shadow-md">
      <div className="flex items-center justify-between text-black-900">
        <Typography
          as="a"
          href="/"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2 text-3xl"
          color="gray"
        >
          EdQUIZ
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden gap-2 lg:flex ml-auto">
        {!token ?
            <>
              <div className="hidden gap-2 lg:flex ml-auto">
          <Button
            variant="text"
            size="sm"
            color="gray"
            onClick={() => navigate("/Login")}
          >
            Log In
          </Button>
          <Button 
            variant="gradient" 
            size="sm"
            onClick={()=>navigate("/SignUp")}>
            Sign Up
          </Button>
        </div>
          </>
          : 
          <Button variant="gradient" size="sm" color="gray" fullWidth onClick={() =>handleClick()}>Dashboard</Button>
        }
        </div>
        <IconButton
          variant="text"
          color="gray"
          className="lg:hidden ml-auto"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          {!token ?
            <>
              <Button
              variant="outlined"
              size="sm"
              color="gray"
              fullWidth
              onClick={() => navigate("/Login")}
              >
              Log In
              </Button>
              <Button variant="gradient" size="sm" fullWidth>
                Sign Up
              </Button>
          </>
          : 
          <Button variant="gradient" size="sm" color="gray" fullWidth onClick={() =>handleClick()}>Dashboard</Button>
        }
        </div>
      </Collapse>
    </MTNavbar>
  );
};

export default Navbar;
