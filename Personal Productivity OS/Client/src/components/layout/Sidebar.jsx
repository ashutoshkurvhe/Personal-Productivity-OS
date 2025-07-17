import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA } from "../../utils/data";

const Sidebar = ({ activeMenu }) => {
    const { clearUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleClick = (route) => {
        if (route === "logout") {
            handleLogout();
            return;
        }

        navigate(route);
    };

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/login");
    };

    return (
        <div className="w-64 h-[calc(100vh)] bg-rose-100/50 border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
            {SIDE_MENU_DATA.map((item, index) => (
                <button key={`menu_${index}`} className={`w-full flex items-center gap-4 text-[15px] hover:bg-white ${activeMenu == item.label ? "text-white bg-black" : ""} py-3 px-6 rounded-lg mb-3`} onClick={() => handleClick(item.path)}>
                    <item.icon className="text-xl" />
                    {item.label}
                </button>
            ))}
        </div>
    )
    
}


export default Sidebar;