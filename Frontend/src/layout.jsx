import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";

const layout = () => {
    return (
        <>
            <Header />
            <div className="fixed top-16 bottom-12 left-0 right-0 overflow-y-auto flex justify-center items-center">
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default layout;