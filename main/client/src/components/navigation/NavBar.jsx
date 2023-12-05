import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../auth/useAuth";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout(() => navigate("/"));
  };
  return (
    <div className="w-[80%] mt-3 h-fit mx-auto flex justify-between items-center ">
      <Link to="/dashboard">
        <div>
          <h1 className="text-5xl font-semibold text-orange-400 ">event+</h1>
        </div>
      </Link>
      <div className="flex w-auto justify-end items-center">
        <div className="mx-5 hover:text-orange-400 font-semibold bg-black text-white py-1 px-4  rounded-full hover:scale-105 hover:drop-shadow-md hover:cursor-pointer">
          <Link to="/homepage">Create an event</Link>
        </div>
        <div className="mx-5 hover:text-orange-400 hover:scale-105 ">
          <Link to="/me/my-events">My events</Link>
        </div>
        <div className="mx-5 hover:text-orange-400 hover:scale-105 ">
          <Link to="/me">User</Link>
        </div>
        <div className="mx-5 hover:text-orange-400 hover:scale-105 ">
          <button onClick={handleLogout}>Logout</button>
        </div>
        {/* <div className="mx-auto hover:text-orange-400 hover:font-semibold">
          <Link to="/EventPage">Events</Link>
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
