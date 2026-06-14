import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
// import Login from "./Login";

function Signup() {
  const [showOtpBox, setShowOtpBox] = useState(false);
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
        const response = await fetch(
          "https://gateprocs.vercel.app/send-otp",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
            }),
          },
        );

        const data = await response.json();

        if (data.success) {
          setShowOtpBox(true);
          alert("OTP Sent Successfully");
        }
      } catch (error) {
        console.log(error);

        alert("Failed to send OTP");
      }
    }
  };


  const handleOtpVerify = async () => {

  const response = await fetch(
    "https://gateprocs.vercel.app/verify-otp",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        otp
      })
    }
  );

  const data = await response.json();

  if (data.success) {
    setIsVerified(true);
    alert("Email Verified Successfully. Enter Other Details and Signup Now.")
  } else {
    alert(data.message);
  }
};

  const handleSignup = async () => {
    if (!name || !number || !password) {
      alert("All fields are required!");
      return;
    }

    console.log("Signup Data:", { name, number, email, address, password });

    if(isVerified){
      try {
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

      alert(data.msg  + " Now You Can Login");
      window.open("/login");
      window.location.reload();
    } catch (err) {
      alert(err.message );
    }
    }else{
      alert("Verify Your Email First To Register Yourself")
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>

      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Mobile Number"
        onChange={(e) => setNumber(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleVerifyEmail}
      >
        Verify Email
      </button>
      {showOtpBox && (
        <div className="mb-3">
          <label className="form-label">Enter OTP</label>

          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button className="btn btn-success" onClick={handleOtpVerify}>Verify OTP</button>
          </div>
        </div>
      )}

      <input
        type="text"
        placeholder="Complete address"
        onChange={(e) => setAddress(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-primary" onClick={handleSignup}>Signup</button>

      <p>
        Already have an account? <Link to="/login"> Login</Link>
      </p>
    </div>
  );
}

export default Signup;
