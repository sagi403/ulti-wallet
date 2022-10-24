import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const { loggedIn } = useSelector(state => state.user);
  const location = useLocation();

  return loggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
