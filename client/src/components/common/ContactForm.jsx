import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import CountryCode from "../../data/countrycode.json";
import {toast} from 'react-hot-toast'

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(
        {
          firstName: "",
          lastName: "",
          email: "",
          message: "",
          phoneNo: "",
        },
        [reset, isSubmitSuccessful]
      );
    }
  });
  const submitHandler = async (data) => {
    console.log("Form Data - ", data)
    try {
     
      // const res = await apiConnector(
      //   "POST",
      //   contactusEndpoint.CONTACT_US_API,
      //   data
      // )
      const res ={status:'ok'}
      console.log("Email Res - ", res)
     toast.success("Email sent successfully")
      
    } catch (error) {
      console.log("ERROR WHILE CONATACT US  - ", error.message)
      toast.error("Error while sending email")
     
    }
  }
  return (
    <form className="text-richblack-5 p-8 flex flex-col gap-5"
    onSubmit={handleSubmit(submitHandler)}
    >
      <div className="flex gap-5">
        <div className="flex flex-col w-full gap-[6px]">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            {...register("firstName", { required: true })}
            className="bg-richblack-800 p-3 rounded-md"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
          />
          {errors.firstName && <span>First Name is required</span>}
        </div>
        <div className="flex flex-col w-full  gap-[6px]">
          <label>Last Name</label>
          <input
            type="text"
            name="lasttName"
            placeholder="First Name"
            {...register("lastName")}
            className="bg-richblack-800 p-3 rounded-md"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
          />
        </div>
      </div>

      <div className="flex flex-col w-full  gap-[6px]">
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          {...register("email", { required: true })}
          className="bg-richblack-800 p-3 rounded-md"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
        />
        {errors.email && <span>Email is required</span>}
      </div>
      <div className="flex flex-col gap-[6px]">
        <label>Phone Number</label>
        <div className="flex justify-between items-center">
          <div className="flex flex-col w-[81px]">
            <select
              type="text"
              name="countryCode"
              className="bg-richblack-800 p-3 rounded-md "
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              {...register("countryCode", { required: true })}
            >
              {CountryCode.map((data,i) => (
                <option key={i} value={data.code}>
                  {data.code}{"   "}-{data.country}
                </option>
              ))}
            </select>
          </div>
          <div className="w-[80%]" >
            <input
              type="number"
              name="phoneNo"
              placeholder="Phone Number"
              {...register("phoneNo", { required: true })}
              className="bg-richblack-800 p-3 rounded-md w-full "
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
            />
            {errors.phoneNo && <span>Phone Number is required</span>}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full  gap-[6px]">
        <label>Message</label>
        <textarea
          name="message"
          cols={30}
          rows={6}
          placeholder="Message"
          {...register("message", { required: true })}
          className="bg-richblack-800 p-3 rounded-md"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
        />
        {errors.message && <span>Message is required</span>}
      </div>
      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 w-full"
      >
        Send Message
      </button>
    </form>
  );
}
