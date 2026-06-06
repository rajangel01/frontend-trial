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
      const res = await fetch("https://backend-trial-1ojm.vercel.app/login", {
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

      if (!res.ok) {
        throw new Error(data.msg);
      }

      localStorage.setItem("isLoggedIn", JSON.stringify(data))
      navigate("/home");
      console.log(data)
      alert(data.msg);
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

      <button onClick={handleLogin}>Login</button>

      <p>
        Don't have an account?{" "}
        <Link to='/signup'>Signup</Link>
      </p>
    </div>
  );
}

export default Login;