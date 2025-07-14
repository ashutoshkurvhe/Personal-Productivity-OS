import { RxDashboard } from "react-icons/rx";
import { FaRegNoteSticky } from "react-icons/fa6";
import { CgGoogleTasks } from "react-icons/cg";
import { SlCalender } from "react-icons/sl";
import { SiStagetimer } from "react-icons/si";
import { GoProjectSymlink } from "react-icons/go";
import { LuLogOut } from "react-icons/lu";

export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: RxDashboard,
        path: "/income",
    },
    {
        id: "02",
        label: "Notes",
        icon: FaRegNoteSticky,
        path: "/notes",
    },
    {
        id: "",
        label: "Tasks",
        icon: CgGoogleTasks,
        path: "/tasks",
    },
    {
        id: "04",
        label: "Calender",
        icon: SlCalender,
        path: "/events",
    },
    {
        id: "05",
        label: "Projects",
        icon: GoProjectSymlink,
    },
    {
        id: "06",
        label: "Timer",
        icon: SiStagetimer,
        path: "/pomodoro",
    },
    {
        id: "07",
        label: "Logout",
        icon: LuLogOut,
        path: "logout",
    }
]