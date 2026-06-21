import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function OTPLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpBox, setShowOtpBox] = useState(false);
  // const [isVerified, setIsVerified] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function handleLogin() {
    // if (isVerified) {
      try {
        setLoading(true);
        const res = await fetch("https://gateprocs.vercel.app/login-by-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        });
        const data = await res.json();

        localStorage.setItem("isLoggedIn", JSON.stringify(data));
        alert("Login Successful");
        navigate("/home");
        window.location.reload();
      } catch (err) {
        alert(err.message);
      }finally{
        setLoading(false);
      }
    // }
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
        setLoading(true);
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
      }finally{
        setLoading(false)
      }
    }
  };

  const handleOtpVerify = async () => {
    setLoading(true)
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
      // setIsVerified(true);
      handleLogin();
      alert("Email Verified Successfully.");
      // navigate("/home");
    } else {
      alert(data.message);
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>OTP Login 🔐</h1>

        <p className="subtitle">
          Enter your email to receive a one-time password
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {showOtpBox && (
          <div className="otp-section">
            <input
              type="text"
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        )}

        {!showOtpBox ? (
          <button onClick={handleVerifyEmail} className="login-btn">
            {loading?"Sending OTP...":"Send OTP"}
          </button>
        ) : (
          <>
            <button onClick={handleOtpVerify} className="login-btn">
             {loading?"Verifying...":"Verify & Login"}
            </button>

            <button
              onClick={handleVerifyEmail}
              className="login-btn"
              style={{ marginTop: "12px" }}
            >
              Resend OTP{loading?"Resending OTP...":"Resend OTP"}
            </button>
          </>
        )}

        <p className="link-text" style={{ marginTop: "25px" }}>
          <Link to="/login">← Back to Password Login</Link>
        </p>
      </div>
    </div>
  );
}
