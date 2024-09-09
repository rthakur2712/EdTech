import React from "react";
import { FaRegEdit } from "react-icons/fa";

export default function EditBTN() {
  return (
    <div className="bg-yellow-50 flex items-center py-2 px-5 rounded-md gap-2 text-richblack-900">
      {" "}
      <FaRegEdit />
      Edit
    </div>
  );
}
