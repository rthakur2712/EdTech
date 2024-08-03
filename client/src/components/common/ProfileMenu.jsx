import React, { useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/operationa/auth";
import useOnClickOutside from "use-onclickoutside";

export default function ProfileMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);
  useOnClickOutside(ref, () => setOpen(false));
  const user = useSelector((state) => state.profile.user);
  const [open, setOpen] = useState(false);
  const logoutHandler = () => {
    dispatch(logout(navigate));
    setOpen(false);
  };
  return (
    <button className="relative" ref={ref}>
      <div
        className="flex items-center gap-[2px]"
        onClick={() => setOpen(!open)}
      >
        <img
          src={user?.image}
          alt="profile"
          className="w-[30px] rounded-full object-cover aspect-square"
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
      {open && (
        <div className="absolute top-[118%]  right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800">
          <Link to={`/dashboard/my-profile`}>
            <div
              className="flex items-center gap-1 w-full  py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
              onClick={() => setOpen(false)}
            >
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          <div
            className="flex items-center gap-1 w-full py-[12px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
            onClick={logoutHandler}
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  );
}
