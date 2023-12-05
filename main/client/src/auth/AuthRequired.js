import { Navigate, useLocation } from "react-router-dom";
import useAuth from "./useAuth";

const AuthRequired = ({ children }) => {
  const { isInitialized, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isInitialized) {
    return <div className="w-full text-center">Loading screen</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/hero" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthRequired;
