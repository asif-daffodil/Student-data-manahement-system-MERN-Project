import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";

const AUTH_CHANGED_EVENT = "auth-changed";

export const emitAuthChanged = () => {
    window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
};

const useCheckAuth = () => {
    const [isAuth, setIsAuth] = useState(null);
    const location = useLocation();

    const checkAuth = useCallback(async () => {
        const token = localStorage.getItem("token");

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

            if (res?.data?.message === "Authenticated") {
                setIsAuth(true);
            } else {
                setIsAuth(false);
            }
        } catch {
            setIsAuth(false);
        }
    }, []);

    // Re-check on navigation (Layout stays mounted across routes)
    useEffect(() => {
        checkAuth();
    }, [checkAuth, location.pathname]);

    // Re-check when login/logout mutates the token in this tab
    useEffect(() => {
        const onAuthChanged = () => {
            checkAuth();
        };

        const onStorage = (e) => {
            if (e.key !== "token") return;
            checkAuth();
        };

        window.addEventListener(AUTH_CHANGED_EVENT, onAuthChanged);
        window.addEventListener("storage", onStorage);
        return () => {
            window.removeEventListener(AUTH_CHANGED_EVENT, onAuthChanged);
            window.removeEventListener("storage", onStorage);
        };
    }, [checkAuth]);

    return isAuth;
}

export default useCheckAuth;