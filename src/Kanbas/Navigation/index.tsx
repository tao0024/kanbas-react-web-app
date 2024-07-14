import { NavLink } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";

export default function KanbasNavigation() {
  return (
    <div
      id="wd-kanbas-navigation"
      style={{ width: 110 }}
      className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      <a
        id="wd-neu-link"
        target="_blank"
        href="https://www.northeastern.edu/"
        rel="noreferrer"
        className="list-group-item bg-black border-0"
      >
        <img src="/images/NEU.png" alt="NEU logo" width="75px" />
      </a>
      <NavLink
        to="/Kanbas/Account"
        className={({ isActive }) =>
          `list-group-item text-center border-0 ${
            isActive ? "bg-white text-danger" : "text-white bg-black"
          }`
        }
      >
        <FaRegCircleUser className="fs-1 text-white" />
        <br />
        Account
      </NavLink>
      <NavLink
        to="/Kanbas/Dashboard"
        className={({ isActive }) =>
          `list-group-item text-center border-0 ${
            isActive ? "bg-white text-danger" : "text-white bg-black"
          }`
        }
      >
        <AiOutlineDashboard className="fs-1 text-danger" />
        <br />
        Dashboard
      </NavLink>
      <NavLink
        to="/Kanbas/Courses"
        className={({ isActive }) =>
          `list-group-item text-center border-0 ${
            isActive ? "bg-white text-danger" : "text-white bg-black"
          }`
        }
      >
        <LiaBookSolid className="fs-1 text-danger" />
        <br />
        Courses
      </NavLink>
      <NavLink
        to="/Kanbas/Calendar"
        className={({ isActive }) =>
          `list-group-item text-center border-0 ${
            isActive ? "bg-white text-danger" : "text-white bg-black"
          }`
        }
      >
        <IoCalendarOutline className="fs-1 text-danger" />
        <br />
        Calendar
      </NavLink>
      <NavLink
        to="/Kanbas/Inbox"
        className={({ isActive }) =>
          `list-group-item text-center border-0 ${
            isActive ? "bg-white text-danger" : "text-white bg-black"
          }`
        }
      >
        <FaInbox className="fs-1 text-danger" />
        <br />
        Inbox
      </NavLink>
      <NavLink
        to="/Kanbas/Labs"
        className={({ isActive }) =>
          `list-group-item text-center border-0 ${
            isActive ? "bg-white text-danger" : "text-white bg-black"
          }`
        }
      >
        <LiaCogSolid className="fs-1 text-danger" />
        <br />
        Labs
      </NavLink>
    </div>
  );
}
