import React, { useState } from "react";
import "./OTPVerification.css";
import { GoUnverified } from "react-icons/go";
import { useNavigate } from "react-router-dom";

function OTPVerification() {
  const otpVerified = useNavigate();
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^\d+$/.test(value)) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);

      // Move focus to the next input field if value is not empty
      if (index < 5 && value !== "") {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    } else if (value === "") {
      // Clear the input if the user deletes a digit
      const newOTP = [...otp];
      newOTP[index] = "";
      setOTP(newOTP);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0) {
      // Handle Backspace key press to erase the previous input digit
      const newOTP = [...otp];
      newOTP[index + 1 - 1] = "";
      setOTP(newOTP);
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleVerify = () => {
    const enteredOTP = otp.join("");
    // You can add your verification logic here (e.g., send OTP to the server)
    if (enteredOTP === "123456") {
      alert("OTP Verified Successfully!");
      // Redirect to a new page or perform other actions
      otpVerified("/home");
    } else {
      alert("Invalid OTP. Please try again.");
      // Clear the OTP input or take appropriate action
      setOTP(["", "", "", "", "", ""]);
      document.getElementById("otp-input-0").focus();
    }
  };

  return (
    <div className="otp-cont">
      <div className="otp-verification">
        <div className="otp-icon">
          <GoUnverified style={{ color: "blueviolet", fontSize: "1.5rem" }} />
        </div>
        <h1>OTP Verification</h1>
        <p>Enter the 6-digit OTP sent to your mobile number</p>
        <div className="otp-input">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              id={`otp-input-${index}`}
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
        <button onClick={handleVerify}>Verify</button>
        <div className="resend">
          Didn't receive the OTP? <a href="#">Resend OTP</a>
        </div>
      </div>
    </div>
  );
}

export default OTPVerification;
