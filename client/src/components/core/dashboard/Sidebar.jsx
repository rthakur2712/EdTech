import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import {  useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";
import * as Icons from "react-icons/vsc";
import { IoIosSettings } from "react-icons/io";
import { VscSignOut } from "react-icons/vsc";
import ConformationModal from "../../common/ConformationModal";

export default function Sidebar() {
  const { user } = useSelector(
    (state) => state.profile
  );
  const [conformModal,setComformModal] = useState(false);

  console.log(user);
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath(route, location.pathname);
  };
  if (!user) {
    return <div className="text-white">hello</div>;
  }

  return (
    <div className="w-[222px] h-[92vh] py-[30px] bg-richblack-800">
      <div className="border border-b-[#424854] pb-5">
        {sidebarLinks.map((link, index) => {
          if (link.type && link.type !== user.accountType) {
            return null;
          }
          const Icon = Icons[link.icon];
          return (
            <Link to={link.path}>
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
        <div className="px-6 py-2 text-richblack-300 flex items-center gap-3 text-sm">
          <IoIosSettings /> Settings
        </div>
        </Link>
        <div
          className="px-6 py-2 text-richblack-300 flex items-center gap-3 text-sm cursor-pointer"
          onClick={()=>setComformModal(prev=>!prev)}
        >
          <VscSignOut /> Logout
        </div>
      </div>
      {
      conformModal && <ConformationModal conformModal={conformModal} setComformModal={setComformModal}/>
     }
    </div>
  );
}
