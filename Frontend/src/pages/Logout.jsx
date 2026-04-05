import { emitAuthChanged } from "../hooks/useCheckAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem("token");
        emitAuthChanged();
        toast.success("Logout successful");
        navigate("/login");
    }, [navigate]);
    return (
        <div>
            Logout Page
        </div>
    );
};

export default Logout;