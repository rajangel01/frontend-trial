import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
// import Login from "./Login";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleVerifyEmail = async () => {
    if (!email.trim()) {
      alert("Please enter your email");
      return;
    } else {
      if (!emailRegex.test(email)) {
        alert("Invalid email");
        return;
      }

      try {
        setOtpSending(true);
        const response = await fetch("https://gateprocs.vercel.app/send-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        });

        const data = await response.json();

        if (data.success) {
          setShowOtpBox(true);
          alert("OTP Sent Successfully");
        }
      } catch (error) {
        console.log(error);

        alert("Failed to send OTP");
      } finally {
        setOtpSending(false);
      }
    }
  };

  const handleOtpVerify = async () => {
    setVerifyingOtp(true);
    const response = await fetch("https://gateprocs.vercel.app/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        otp,
      }),
    });

    const data = await response.json();

    if (data.success) {
      setIsVerified(true);
      alert("Email Verified Successfully. Enter Other Details and Signup Now.");
    } else {
      alert(data.message);
    }
    setVerifyingOtp(false);
  };

  const handleSignup = async () => {
    if (!name || !number || !password) {
      alert("All fields are required!");
      return;
    }

    console.log("Signup Data:", { name, number, email, address, password });

    if (isVerified) {
      try {
        setLoading(true);
        const res = await fetch("https://gateprocs.vercel.app/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            number,
            email,
            address,
            password,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.msg + "Each field is mondatory.");
        }

        alert(data.msg + " Now You Can Login");
        window.open("/login");
        window.location.reload();
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Verify Your Email First To Register Yourself");
    }
  };

  return (
     
      <div className="login-page">
      <div className="login-card">
        <h1>Create Account 🚀</h1>

        <p className="subtitle">Join GateProCS and start your preparation</p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Mobile Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          className="login-btn"
          onClick={handleVerifyEmail}
          disabled={otpSending}
        >
          {otpSending ? "Sending OTP..." : "Verify Email"}
        </button>
        <hr />
        {showOtpBox && (
          <div className="otp-section">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              className="login-btn"
              onClick={handleOtpVerify}
              disabled={verifyingOtp}
            >
              {verifyingOtp ? "Verifying OTP..." : "Verify OTP"}
            </button>

            {isVerified && (
              <p className="success-text">✅ Email Verified Successfully</p>
            )}
          </div>
        )}

        <input
          type="text"
          placeholder="Complete Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <div className="password-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span className="eye" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁"}
          </span>
        </div>

        <button className="login-btn" onClick={handleSignup} disabled={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p className="link-text">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>
      </div>
    </div>
  // <div/>
  );
}

export default Signup;
