import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buyCourse } from "../services/operationa/studentFeatures";

export default function CourseDetails() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const handleBuyCourse = () => {
    if (!token) {
      toast.error("Please login or signup to buy course");
      navigate("/login");
      return;
    }
    buyCourse(token, [courseId], user, navigate, dispatch);
    return;
  };
  return (
    <div>
      <button
        className="bg-yellow-50 p-3 rounded-lg text-richblack-900"
        onClick={() => handleBuyCourse()}
      >
        Buy Now
      </button>
    </div>
  );
}
