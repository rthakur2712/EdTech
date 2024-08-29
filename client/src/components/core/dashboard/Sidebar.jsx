import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import {  useDispatch, useSelector } from "react-redux";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import * as Icons from "react-icons/vsc";
import { IoIosSettings } from "react-icons/io";
import { VscSignOut } from "react-icons/vsc";
import ConformationModal from "../../common/ConformationModal";
import { logout } from "../../../services/operationa/auth";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(
    (state) => state.profile
  );
  const [confirmationModal, setConfirmationModal] = useState(null)

  // console.log(user);
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath(route, location.pathname);
  };
  if (!user) {
    return <div className="text-white">hello</div>;
  }

  return (
    <div className="w-[222px] min-h-screen py-[30px] bg-richblack-800">
      <div className="border-b-[#424854] pb-5">
        {sidebarLinks.map((link, index) => {
          if (link.type && link.type !== user.accountType) {
            return null;
          }
          const Icon = Icons[link.icon];
          return (
            <Link to={link.path} key={index}>
              <div
                className={`px-6 py-2 text-richblack-300 flex items-center gap-3 text-sm ${
                  matchRoute(link.path) ? "text-yellow-50 bg-yellow-800" : ""
                } `}
              >
                <Icon />
                <p>{link.name}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="mt-5">
        <Link to="/dashboard/settings">
          <div
            className={`px-6 py-2 text-richblack-300 flex items-center gap-3 text-sm ${
              matchRoute("/dashboard/settings") ? "text-yellow-50 bg-yellow-800" : ""
            } `}
          >
            <IoIosSettings /> Edit Profile
          </div>
        </Link>
        <div
          className="px-6 py-2 text-richblack-300 flex items-center gap-3 text-sm cursor-pointer"
          onClick={() => setConfirmationModal({
            text1: "Are you sure ?",
            text2: "You will be logged out of your account.",
            btn1Text: "Logout",
            btn2Text: "Cancel",
            btn1Handler: () => dispatch(logout(navigate)),
            btn2Handler: () => setConfirmationModal(null),
          })
        }
        >
          <VscSignOut /> Logout
        </div>
      </div>
      {confirmationModal && <ConformationModal modalData={confirmationModal} />}
    </div>
  );
}
