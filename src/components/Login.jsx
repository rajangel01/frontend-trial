// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Auth.css";
// // import Signup from './Signup'

// function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async() => {
//     if (!email || !password) {
//       alert("All fields are required!");
//       return;
//     }

//     // console.log("Login Data:", { email, password });

//     try {
//       setLoading(true);
//       const res = await fetch("https://gateprocs.vercel.app/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           email,
//           password
//       })
//       });
//       const data = await res.json();

//       localStorage.setItem("isLoggedIn", JSON.stringify(data))
//       navigate("/home");
      
//       console.log(data)
//       alert("Login Successful")
//       // window.open("/home");
//       window.location.reload();
//     } catch (err) {
//       alert(err.message);
//     }finally{
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Login</h2>

//       <input
//         type="email"
//         placeholder="Email"
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button className="btn btn-primary" onClick={handleLogin}>{loading ? "Logging In..." : "Login"}</button>

//       <p>
//         Don't have an account?{" "}
//         <Link to='/signup'>Signup</Link>
//       </p>
//       <hr />
//       <p>Forgot Password??{" "}
//         <Link to='/otp-login'>Login via OTP</Link>
//       </p>
//     </div>
//   );
// }

// export default Login;



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("All fields are required!");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("https://gateprocs.vercel.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      localStorage.setItem("isLoggedIn", JSON.stringify(data));

      alert("Login Successful");

      navigate("/home");
      window.location.reload();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>Welcome Back 👋</h1>

        <p className="subtitle">
          Login to continue your preparation
        </p>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            className="eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁"}
          </span>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="login-btn"
        >
          {loading ? "Logging In..." : "Login"}
        </button>

        <p className="link-text">
          Don't have an account?
          <Link to="/signup"> Signup</Link>
        </p>

        <hr />

        <p className="link-text">
          Forgot Password?
          <Link to="/otp-login"> Login via OTP</Link>
        </p>
        <br /><br /><br /> <br />

      </div>

    </div>
  );
}

export default Login;