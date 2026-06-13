import { useState } from "react";
import {  Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

export default function OTPLogin() {
  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [isVerified, setIsVerified]= useState(false)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function handleLogin(){
    if(isVerified){
      try {
      const res = await fetch("https://gateprocs.vercel.app/login-by-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email
      })
      });
      const data = await res.json();

      localStorage.setItem("isLoggedIn", JSON.stringify(data))
      alert("Login Successful")
      window.open("/home");
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
    }
  }

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
    handleLogin();
    alert("Email Verified Successfully.")
  } else {
    alert(data.message);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="container">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-800">Login with OTP</h3>
          <p className="text-gray-500 mt-2">
            Enter your email to receive a one-time password
          </p>
        </div>

        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {showOtpBox && (
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              OTP
            </label>

            <input
              type="text"
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>
        )}

        {!showOtpBox ? (
          <button
            onClick={handleVerifyEmail}
            className="btn btn-primary"
          >
            Send OTP
          </button>
        ) : (
          <>
            <button
              onClick={handleOtpVerify}
              className="btn btn-primary"
            >
              Verify & Login
            </button>

            <button
              onClick={handleVerifyEmail}
              className="btn btn-primary"
            >
              Resend OTP
            </button>
          </>
        )}

        <div className="mt-6 text-center">
          <br /><br />
          <span className="text-gray-500 text-sm"> <Link to='/login'>Back to Password Login</Link></span>
        </div>
      </div>
    </div>
  );
}
