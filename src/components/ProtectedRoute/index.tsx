import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";

const ProtectedRoute = () => {
  const { token } = useAppSelector((state) => state.token);
  console.log(token);

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
