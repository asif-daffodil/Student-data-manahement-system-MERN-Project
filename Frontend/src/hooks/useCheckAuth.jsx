import axios from "axios";
import { useEffect, useState } from "react";

const useCheckAuth = () => {
    const [isAuth, setIsAuth] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            // get token from local storage
            const token = localStorage.getItem('token');

            // if token is not present, return false
            if (!token) {
                setIsAuth(false);
                return;
            }

            try {
                const res = await axios.get("http://localhost:5000/api/auth/is-authenticated", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (res.data.message == "Unauthorized") {
                    setIsAuth(false);
                    return;
                } else if (res.data.message == "Authenticated") {
                    setIsAuth(true);
                    return;
                }
            } catch {
                setIsAuth(false);
                return;
            }
        }
        checkAuth();
    }, []);

    return isAuth;
}

export default useCheckAuth;