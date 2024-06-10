import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";
import loading from "../loading";

const AdminRoute = ({ children }) => {
  const { role } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (role !== null) {
      setIsLoading(false);
    }
  }, [role]);

  if (isLoading) {
    return <div>
        <loading/>
    </div>;
  }

  if (role !== 'Admin') {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default AdminRoute;