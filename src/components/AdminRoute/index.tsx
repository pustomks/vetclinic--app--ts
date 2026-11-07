import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { USER_ROLES } from "../../const";

const AdminRoute = () => {
  const { role, loading } = useAppSelector((state) => state.role);
  const { token } = useAppSelector((state) => state.token);
  console.log(role);
  console.log(token);

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  if (loading || role === null) {
    return <h1>Loading...</h1>;
  }

  if (role !== USER_ROLES.ADMIN) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
