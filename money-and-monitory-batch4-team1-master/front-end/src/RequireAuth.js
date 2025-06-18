import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "./UserContext";

function RequireAuth({ children, redirectTo }) {
  const { user } = useUser();

  return user?.LoggedInStatus === "LoggedIn" ? (
    children
  ) : (
    <Navigate to={redirectTo} />
  );
}

export default RequireAuth;
