import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { useForm } from "react-hook-form";
import {
  deleteAccount,
  updateDisplayPicture,
  updateProfile,
} from "../../../services/operationa/settings";
import { Link, useNavigate } from "react-router-dom";

export default function Settings() {
  const genders = ["Male", "Female", "Other"];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [formData, setFormData] = useState({});
  const { register, handleSubmit } = useForm();
  const { token } =
    useSelector((state) => state.auth) || localStorage.getItem("token");
  const { user } = useSelector((state) => state.profile);
  if (!user) {
    return <div className="loader"></div>;
  }
  const submitProfileForm = (data) => {
    dispatch(updateProfile(data, token, navigate));
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("displayPicture", file);
    dispatch(updateDisplayPicture(formData, token, navigate));
  };
  const handleDelete = () => {
    dispatch(deleteAccount(token, navigate));
  };
  return (
    <div>
      <h1 className="p-4 text-3xl text-richblack-5">Edit Profile</h1>

      <div className="w-[800px] mt-1 ml-36 flex flex-col gap-5">
        {/* change profile pic section */}
        <div className="bg-richblack-800 flex rounded-lg gap-8 p-4 items-center">
          <img
            src={user.image}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex flex-col gap-3">
            <h1 className="text-richblack-25">Change Profile Picture</h1>
            <div className="flex gap-3">
              <label htmlFor="file-upload">
                <div
                  // type="button"
                  className="py-[6px] px-[18px] bg-yellow-50 rounded-md text-sm cursor-pointer"
                >
                  Change
                </div>
              </label>
              <input
                className="hidden"
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                accept="image/png, image/gif, image/jpeg, image/jpg"
              />

              <button className="py-[6px] px-[18px] bg-richblack-700 text-richblack-50 rounded-md text-sm">
                Remove
              </button>
            </div>
          </div>
        </div>
        {/* profile information form section */}
        <form
          className="bg-richblack-800 flex flex-col rounded-lg gap-3 p-4"
          onSubmit={handleSubmit(submitProfileForm)}
        >
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
                {...register("displayName", { required: true })}
              />
            </label>
            <label className="flex flex-col w-[50%] gap-[6px]">
              <p className="text-richblack-5 text-sm">Proffesion</p>
              <select
                className="bg-richblack-700 p-2 rounded-md text-richblack-5"
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
              <input
                type="date"
                defaultValue={user.additionalDetails.dateOfBirth}
                className="bg-richblack-700 p-2 rounded-md text-richblack-5 w-full"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                {...register("dateOfBirth", {
                  required: { value: true },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
              />
            </label>
            <div className="w-[50%] flex flex-col gap-[6px]">
              <p className="text-richblack-5 text-sm">Gender</p>
              <select
                type="text"
                name="gender"
                id="gender"
                className="bg-richblack-700 p-2 rounded-md text-richblack-5"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                {genders.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="flex gap-6 items-center">
            <label className="w-[50%] flex flex-col gap-[6px]">
              <p className="text-richblack-5 text-sm">Phone Number</p>

              <input
                type="text"
                defaultValue={user.additionalDetails.contactNumber}
                className="bg-richblack-700 p-2 rounded-md text-richblack-5 w-full"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                placeholder="Phone Number ..."
                {...register("contactNumber", {
                  required: {
                    value: true,
                    // message: "Please enter your Contact Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
              />
            </label>
            <label className="w-[50%] flex flex-col gap-[6px]">
              <p className="text-richblack-5 text-sm">About</p>
              <input
                type="text"
                defaultValue={user.additionalDetails.about}
                className="bg-richblack-700 p-2 rounded-md text-richblack-5 w-full"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                placeholder="About ..."
                {...register("about")}
              />
            </label>
          </div>
          <div className="flex gap-5">
            <button
              className="py-[6px] px-[18px] bg-yellow-50 rounded-md text-sm"
              type="submit"
            >
              Save
            </button>
            <Link to="/dashboard/my-profile">
              <button className="py-[6px] px-[18px] bg-richblack-700 text-richblack-50 rounded-md text-sm">
                Cancel
              </button>
            </Link>
          </div>
        </form>
        {/* delete account section */}
        <div className="text-pink-400 flex bg-pink-900 py-5 px-10 rounded-lg gap-6 ">
          <div className="w-[40px] h-[40px] bg-pink-700 rounded-full flex items-center justify-center">
            <MdDelete className="text-pink-200 w-[22px] h-[24px]" />
          </div>

          <div className="flex flex-col gap-1 w-[70%]">
            <h1 className="text-lg text-pink-5">Delete Account</h1>
            <p className="text-sm text-pink-25">
              Would you like to delete account ?<br /> This account contains
              Paid Courses.This account contains Paid Courses. Deleting your
              account will remove all the contain associated with it.
            </p>
            <div
              className="text-pink-300 italic cursor-pointer"
              onClick={handleDelete}
            >
              I want to delete my account
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
