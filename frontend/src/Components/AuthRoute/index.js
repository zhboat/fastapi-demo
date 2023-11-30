import { useAuth } from "../../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

function AuthRoute() {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export default AuthRoute;
