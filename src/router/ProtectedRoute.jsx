import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { authContext } from "../context/AuthContext";

const ProtectedRoute = () => {
    const { user, loading } = useContext(authContext);


    if (loading) {
        return <h1 className="text-center">Checking authentication....</h1>;
    }

    if (!user) {
        return <Navigate to="/auth" replace />;
    }


    return <Outlet />;
};

export default ProtectedRoute;