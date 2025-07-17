import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { CiDark, CiLight } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { HiOutlineX, HiOutlineMenu } from "react-icons/hi";
import SideMenu from "../layout/Sidebar";
import CharAvatar from "../Cards/CharAvatar";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [darktheme, setDarkTheme] = useState(false);
  const { user } = useContext(UserContext);
  return (
    <div className="flex items-center justify-between gap-5 bg-white border border-gray-200/50 backdrop-blur-[2px] py-2 px-7 sticky top-0 z-30">
      <div>
        <button
          className="block lg:hidden text-black"
          onClick={() => {
            setOpenSideMenu(!openSideMenu);
          }}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>
        <p className="text-lg font-medium">Personal Productivity OS</p>
      </div>
      <div className="flex items-center gap-3">
        <button className="block bg-gray-100 p-2 shadow-2xl rounded-lg">
          <IoIosNotificationsOutline className="text-xl" />
        </button>
        <button
          className="block bg-gray-100 p-2 shadow-2xl rounded-lg"
          onClick={() => {
            setDarkTheme(!darktheme);
          }}
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
            className="w-20 h-20 bg-slate-400 rounded-full"
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
        <div className="fixed top-[61px] -ml-4 bg-white">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
