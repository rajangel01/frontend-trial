import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
// import Login from "./Login";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number,setNumber] = useState("");
  const [address,setAddress] = useState("");
  const [password, setPassword] = useState("");


  const handleSignup = async() => {
    if (!name || !email || !password) {
      alert("All fields are required!");
      return;
    }

    console.log("Signup Data:", { name, number, email, address, password });

    try {
      const res = await fetch("https://backend-trial-1ojm.vercel.app/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          number,
          email,
          address,
          password
      })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg);
      }

      alert(data.msg);
    } catch (err) {
      alert(err.message);
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

      <button onClick={handleSignup}>Signup</button>

      <p>
        Already have an account?{" "}
        <Link to='/login'> Login</Link>
      </p>
    </div>
  );
}

export default Signup;