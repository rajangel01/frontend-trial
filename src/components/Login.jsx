import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
// import Signup from './Signup'

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async() => {
    if (!email || !password) {
      alert("All fields are required!");
      return;
    }

    // console.log("Login Data:", { email, password });

    try {
      const res = await fetch("https://gateprocs.vercel.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
      })
      });
      const data = await res.json();

      localStorage.setItem("isLoggedIn", JSON.stringify(data))
      navigate("/home");
      
      console.log(data)
      alert("Login Successful")
      window.open("/home");
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-primary" onClick={handleLogin}>Login</button>

      <p>
        Don't have an account?{" "}
        <Link to='/signup'>Signup</Link>
      </p>
      <hr />
      <p>Forgot Password??{" "}
        <Link to='/otp-login'>Login via OTP</Link>
      </p>
    </div>
  );
}

export default Login;