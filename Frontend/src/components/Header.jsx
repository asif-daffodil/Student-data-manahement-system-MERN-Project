import { Link } from "react-router";

const Header = ({isAuth}) => {
    return (
        <div className="text-xl md:text-3xl text-center fixed top-0 left-0 w-full bg-black text-white h-16 leading-16">
            Student Data Management System
            {isAuth === true && (
                <Link to="/logout" className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 text-sm rounded absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer">
                    Logout
                </Link>
            )}
        </div>
    );
};

export default Header;