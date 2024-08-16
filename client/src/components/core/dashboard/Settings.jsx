import React from "react";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";

export default function Settings() {
  const { user } = useSelector((state) => state.profile);
  if (!user) {
    return <div className="loader"></div>;
  }
  return (
    <div>
      <h1 className="p-4 text-3xl text-richblack-5">Edit Profile</h1>

      <div className="w-[792px] mt-1 ml-24 flex flex-col gap-5">
        {/* change profile pic section */}
        <div className="bg-richblack-800 flex rounded-lg gap-8 p-4 items-center">
          <img src={user.image} alt={user.name} className="w-20 rounded-full" />
          <div className="flex flex-col gap-3">
            <h1 className="text-richblack-25">Change Profile Picture</h1>
            <div className="flex gap-3">
              <button className="py-[6px] px-[18px] bg-yellow-50 rounded-md text-sm">
                Change
              </button>
              <button className="py-[6px] px-[18px] bg-richblack-700 text-richblack-50 rounded-md text-sm">
                Remove
              </button>
            </div>
          </div>
        </div>
        {/* profile information form section */}
        <form className="bg-richblack-800 flex flex-col rounded-lg gap-3 p-4">
          <h1 className="text-lg text-richblack-5">Profile Information</h1>
          <div className="flex gap-6 items-center">
            <label className="flex flex-col w-[50%] gap-[6px]">
              <p className="text-richblack-5 text-sm">Display Name</p>
              <input
                type="text"
                value={user.firstName + " " + user.lastName}
                className="bg-richblack-700 p-2 rounded-md text-richblack-200"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
              />
            </label>
            <label className="flex flex-col w-[50%] gap-[6px]">
              <p className="text-richblack-5 text-sm">Proffesion</p>
              <select
                className="bg-richblack-700 p-2 rounded-md text-richblack-200"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
              >
                <option value="student">Student</option>
                <option value="developer">Developer</option>
              </select>
            </label>
          </div>
          <div className="flex gap-6 items-center">
            <label className="w-[50%] flex flex-col gap-[6px] ">

              <p className="text-richblack-5 text-sm">Date of birth</p>
              <input type="date" value={user.additionalDetails.dateOfBirth}
                className="bg-richblack-700 p-2 rounded-md text-richblack-200 w-full"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
              />
            </label>
            <div className="w-[50%] flex flex-col gap-[6px]">
              <p className="text-richblack-5 text-sm">Gender</p>
              <div
                className="bg-richblack-700 p-2 rounded-md text-richblack-200 w-full flex gap-8"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
              >
                <label className="flex items-center gap-3">
                  <input type="radio" name="gender" />
                  <p>Male</p>
                </label>
                <label className="flex items-center gap-3">
                  <input type="radio" name="gender" />
                  <p>Female</p>
                </label>
                <label className="flex items-center gap-3">
                  <input type="radio" name="gender" />
                  <p>Other</p>
                </label>
              </div>
            </div>
          </div>
          <div className="flex gap-6 items-center">
            <label className="w-[50%] flex flex-col gap-[6px]">
                <p className="text-richblack-5 text-sm">Phone Number</p>
              
              <input type="text" value={user.additionalDetails.contactNumber}
              className="bg-richblack-700 p-2 rounded-md text-richblack-200 w-full"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              placeholder="Phone Number ..."
              />
            </label>
            <label className="w-[50%] flex flex-col gap-[6px]">
              <p className="text-richblack-5 text-sm">About</p>
              <input type="text" value={user.additionalDetails.about} 
              className="bg-richblack-700 p-2 rounded-md text-richblack-200 w-full"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              placeholder="About ..."
              />
            </label>
          </div>
          <div className="flex gap-5">
            <button className="py-[6px] px-[18px] bg-yellow-50 rounded-md text-sm"
            >
              Save
            </button>
            <button className="py-[6px] px-[18px] bg-richblack-700 text-richblack-50 rounded-md text-sm">
              Cancel
            </button>
          </div>
        </form>
        {/* delete account section */}
        <div className="text-pink-400 flex bg-pink-900 py-5 px-10 rounded-lg gap-6 ">
            <div className="w-[40px] h-[40px] bg-pink-700 rounded-full flex items-center justify-center">
            <MdDelete className="text-pink-200 w-[22px] h-[24px]" />
            </div>
        
        <div className="flex flex-col gap-1 w-[70%]">
            <h1 className="text-lg text-pink-5">Delete Account</h1>
            <p className="text-sm text-pink-25">Would you like to delete account ?<br/> This account contains Paid Courses.This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
            <div className="text-pink-300 italic cursor-pointer">I want to delete my account</div>
        </div>
        </div>
      </div>
    </div>
  );
}
