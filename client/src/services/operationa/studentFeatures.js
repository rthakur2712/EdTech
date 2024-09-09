import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}
export async function buyCourse(
  token,
  coursesId,
  userDetails,
  navigate,
  dispatch
) {
  const toastId = toast.loading("Loading...");
  try {
    // load razorpay script
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      toast.error("Razorpay SDK failed to load");
      return;
    }
    const orderResponse = await apiConnector(
      "POST",
      studentEndpoints.COURSE_PAYMENT_API,
      { coursesId },
      { Authorization: `Bearer ${token}` }
    );
    console.log("order response", orderResponse);
    if (!orderResponse?.data?.success) {
      throw new Error(orderResponse?.data?.message);
    }
    const RAZORPAY_KEY = process.env.RAZORPAY_KEY;
    console.log("razorpay key", RAZORPAY_KEY);
    const options = {
      key: RAZORPAY_KEY,
      currency: orderResponse.data.currency,
      amount: orderResponse.data.amount,
      order_id: orderResponse.data.orderId,
      name: "StudyNotion",
      description: "Thank You for Purchasing the Course",
      image: rzpLogo,
      prefill: {
        name: userDetails.firstName,
        email: userDetails.email,
      },
      handler: function (response) {
        //send successful mail
        sendPaymentSuccessEmail(response, orderResponse.data.amount, token);
        //verifyPayment
        verifyPayment({ ...response, coursesId }, token, navigate, dispatch);
      },
    };
    console.log("options", options);
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      toast.error("oops, payment failed");
      console.log("payment failed.... ", response.error);
    });
  } catch (error) {
    console.log("Error while buying course", error);
    toast.error(error.response.data.msg);
  }
  toast.dismiss(toastId);
}
async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      studentEndpoints.SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
  }
}
async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment....");
  dispatch(setPaymentLoading(true));

  try {
    const response = await apiConnector(
      "POST",
      studentEndpoints.VERIFY_PAYMENT_API,
      bodyData,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("VERIFY PAYMENT RESPONSE....", response);
    if (!response.status === 200) {
      throw new Error(response.data.message);
    }
    toast.success("payment Successful, you are addded to the course");
    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());
  } catch (error) {
    console.log("PAYMENT VERIFY ERROR....", error);
    toast.error("Could not verify Payment");
  }
  toast.dismiss(toastId);
  dispatch(setPaymentLoading(false));
}
