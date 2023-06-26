import React, { useEffect, useState } from "react";
import "./Login.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const OtpPage = ({ User }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  console.log(User.userId);

  const navigate = useNavigate();
  const url = import.meta.env.VITE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post(`${url}/api/auth/verifyOTP`, {
        userId: User.userId,
        otp: otp,
      });

      toast.success(
        "🦄 You have succesfully Register..",
        {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        },
        { delay: 1000 }
      );
      res.data && navigate("/auth/login");
    } catch (error) {
      toast.error("There is error", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log(error);
    }
  };

  const handleResendOtp = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post(`${url}/api/auth/resendOTP`, {
        userId: User.userId,
        email: User.email,
      });
      toast.success(
        "🦄 You have succesfully Login..",
        {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        },
        { delay: 1000 }
      );
    } catch (error) {
      // setError(true);
      toast.error("There is error", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <form className="loginForm" onSubmit={handleSubmit}>
      <label htmlFor="otp">OTP</label>
      <input
        className="input"
        type="text"
        id="otp"
        placeholder="Enter the OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      {error && <p style={{ color: "tomato" }}>Error</p>}
      <p className="resend_otp" onClick={(e) => handleResendOtp()}>
        Resend OTP
      </p>
      <button className="loginBtn">Verify</button>
    </form>
  );
};
export default OtpPage;
