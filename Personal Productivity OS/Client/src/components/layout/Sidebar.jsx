import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SIDE_MENU_DATA } from "../../utils/data";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState("");

  useEffect(() => {
    // Detect active item based on current path
    const currentItem = SIDE_MENU_DATA.find(
      (item) => item.path === location.pathname
    );
    if (currentItem) {
      setActiveMenu(currentItem.label);
    }
  }, [location.pathname]);

  const handleClick = (item) => {
    if (item.path === "logout") {
      handleLogout();
      return;
    }

    setActiveMenu(item.label);
    navigate(item.path);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="w-64 h-[100vh] bg-black text-white border-r border-gray-200/50 p-5 sticky top-[61px] left-0 z-90">
      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          onClick={() => handleClick(item)}
          className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition duration-200 ${
            activeMenu === item.label
              ? "bg-white text-black font-semibold"
              : "hover:bg-white hover:text-black"
          }`}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
}
