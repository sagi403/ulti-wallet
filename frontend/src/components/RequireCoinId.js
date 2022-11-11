import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";

const RequireCoinId = () => {
  const { allCoinsId } = useSelector(state => state.coin);
  const location = useLocation();
  const { id } = useParams();

  return allCoinsId.includes(+id) ? (
    <Outlet />
  ) : (
    <Navigate to="/app/portfolio" state={{ from: location }} replace />
  );
};

export default RequireCoinId;
