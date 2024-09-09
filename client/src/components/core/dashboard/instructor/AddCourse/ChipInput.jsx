import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdClose } from "react-icons/md";

export default function ChipInput({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
}) {
  const { editCourse, course } = useSelector((state) => state.course);
  const [chips, setChips] = useState([]);
  useEffect(() => {
    console.log(course);
    if (editCourse) {
      setChips(course?.tag);
    }
  }, []);
  useEffect(() => {
    register(name, { required: true }, chips);
  }, [register]);
  // "Updates value whenever 'chips' is modified
  useEffect(() => {
    setValue(name, chips);
  }, [chips]);
  //   functioin to handle user input when chips are added
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const chipValue = event.target.value.trim();
      if (chipValue) {
        // const newChips=[...chips,chipValue]
        // console.log("newChips",newChips)
        setChips([...chips, chipValue]);

        event.target.value = "";
      }
    }
  };
  console.log("chips", chips);
  // function to handle if a chip is delted
  const handleDeleteChip = (chipIndex) => {
    // filter the chips array to remove the given chip
    const newChips = chips.filter((_, index) => index !== chipIndex);
    setChips(newChips);
  };
  return (
    <div>
      <label className="flex flex-col gap-1 text-richblack-5 text-sm">
        <p>
          {label} <sup className="text-pink-200">*</sup>
        </p>
        <div className="flex space-x-1 flex-wrap max-w-[100%]">
          {chips?.map((chip, index) => (
            <div
              key={index}
              className="bg-yellow-400 rounded-lg flex gap-1 items-center px-2"
            >
              {chip}
              <button
                onClick={(event) => {
                  event.preventDefault();
                  if (event.key !== "Enter" || event.key !== ",") {
                    handleDeleteChip(index);
                  }
                }}
              >
                <MdClose className="text-sm" />
              </button>
            </div>
          ))}
        </div>
        <input
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="w-full bg-richblack-700 p-3 rounded-md mt-1"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
        />
      </label>
    </div>
  );
}
