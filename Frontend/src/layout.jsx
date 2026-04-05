import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import useCheckAuth from "./hooks/useCheckAuth";

const Layout = () => {
    const isAuth = useCheckAuth();
    return (
        <>
            <Header isAuth={isAuth} />
            <div className="fixed top-16 bottom-12 left-0 right-0 overflow-y-auto flex justify-center items-center">
                <ToastContainer />
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default Layout;