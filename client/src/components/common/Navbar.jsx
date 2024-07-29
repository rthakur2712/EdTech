import React from "react";
import logoImg from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { Link, matchPath, useLocation } from "react-router-dom";
export default function Navbar() {
  const location = useLocation()
  const matchRoute = (route) =>{
    return matchPath(route,location.pathname)
  }
  return (
    <nav className=" backdrop-blur-lg w-full z-10 border-b-[1px] border-b-richblack-700 px-[60px] text-richblack-25">
      <div className="w-11/12 mx-auto py-3 flex items-center justify-between ">
        <div>
          <Link to="/">
            <img src={logoImg} alt="logo" />
          </Link>
        </div>
        <div className="flex gap-1 ">
          {NavbarLinks.map((items, index) => {
            return (
              <div key={index}>
                {items.title === "Catalog" ? (
                  <div className="py-1 px-3">Catalog</div>
                ) : (
                  <div className="py-1 px-3">
                    <Link to={items?.path} 
                    className={`${matchRoute(items.path)?"text-yellow-25":"text-richblack-25"}`}>
                      {items.title}
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex gap-4 ">
          <Link to={"login"}>
            <div className=" border border-richblack-700 rounded-md px-3 py-2 backdrop-blur-sm">
              Log in
            </div>
          </Link>
          <Link to={"signup"}>
            <div className=" border border-richblack-700 rounded-md px-3 py-2 backdrop-blur-sm">
              Sign up
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
