import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { CiDark, CiLight } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { HiOutlineX } from "react-icons/hi";
import { FaBarsStaggered } from "react-icons/fa6";
import { Link } from "react-router-dom";
import logo from "../../assets/11.png";


import Sidebar from "../layout/Sidebar";
import CharAvatar from "../Cards/CharAvatar";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [darktheme, setDarkTheme] = useState(false);
  const { user } = useContext(UserContext);

  return (
    <div className="w-[100vw] flex items-center justify-between gap-5 border border-gray-200 backdrop-blur-[8px] py-2 px-10 sticky top-0 left-0 z-30 bg-black/95">
      <div className="flex gap-5 items-center">
        <button
          className="block lg:hidden text-black"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <FaBarsStaggered className="text-2xl" />
          )}
        </button>
        <Link to="/" className="text-2xl text-white font-medium bg-transparent">
          <img src={logo} alt="" className="w-20 h-15" />
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <button className="block bg-gray-100 p-2 shadow-2xl rounded-lg">
          <IoIosNotificationsOutline className="text-xl" />
        </button>
        <button
          className="block bg-gray-100 p-2 shadow-2xl rounded-lg"
          onClick={() => setDarkTheme(!darktheme)}
        >
          {darktheme ? (
            <CiDark className="text-xl" />
          ) : (
            <CiLight className="text-xl" />
          )}
        </button>

        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl || ""}
            alt="Profile Image"
            className="w-12 h-12 bg-slate-400 rounded-full object-cover"
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName}
            width="w-12"
            height="h-12"
            style="text-xl"
          />
        )}
      </div>

      {openSideMenu && (
        <div className="fixed top-[65px] left-0 w-64 bg-white shadow-lg transition-transform duration-300">
          <Sidebar activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
