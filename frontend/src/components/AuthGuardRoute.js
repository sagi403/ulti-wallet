// import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// import checkUserToken from "../utils/checkUserToken";

const AuthGuardRoute = ({ children, redirectTo }) => {
  // const { userInfo } = useSelector(state => state.user);
  // const isAuth = await checkUserToken(userInfo);
  const isAuth = true;

  return isAuth ? children : <Navigate to={redirectTo} />;
};

export default AuthGuardRoute;
