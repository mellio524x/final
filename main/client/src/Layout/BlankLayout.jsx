import { Link, Outlet } from "react-router-dom";
// import NavBar from "../components/navigation/NavBar";

const BlankLayout = () => {
  return (
    <div className="h-screen ">
      <div className="flex justify-between mx-16">
        <Link to="/">
          <div className="w-[80%] mt-3 mx-auto">
            <h1 className="text-5xl font-semibold text-orange-400 ">event+</h1>
          </div>
        </Link>
        <div className="flex ">
          <Link
            to="/signup"
            className="w-auto py-2 text-black mt-5 mx-5   hover:text-orange-700  select-none "
          >
            Sign Up
          </Link>
          {/* Use Link component */}
          <Link
            to="/login"
            className="w-auto py-2 text-black mt-5 mx-5   hover:text-orange-700  select-none "
          >
            Log In
          </Link>
          {/* Use Link component */}
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default BlankLayout;
