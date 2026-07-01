import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const [open, setOpen] = useState(false);

  let admin = false;
  const userData = JSON.parse(localStorage.getItem("isLoggedIn"));

  if (
    userData &&
    [
      "raj@gmail.com",
      "guptjyoti7800@gmail.com",
      "rajangel820764@gmail.com",
      "shaktimaan6151@gmail.com",
      "mahtab802111@gmail.com",
    ].includes(userData.email)
  ) {
    admin = true;
  }

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
      <div className="container-fluid px-4">
        <Link className="navbar-brand fw-bold fs-3" to="/">
          <span className="text-primary">GATE</span>ProCS
        </Link>

        {/* <button className="navbar-toggler ms-auto" type="button">
          <span className="navbar-toggler-icon"></span>
        </button> */}
        <button
  className="navbar-toggler ms-auto"
  type="button"
  onClick={() => setOpen(!open)}
>
  <span className="navbar-toggler-icon"></span>
</button>

        {/* Links */}
        <div
          className={`collapse navbar-collapse justify-content-center ${
            open ? "show" : ""
          }`}
        >
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-4 fw-semibold">
            <li className="nav-item">
              <Link className="nav-link" to={isLoggedIn ? "/home" : "/before-login"} onClick={() => setOpen(false)}>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/info" onClick={() => setOpen(false)}>
                Info
              </Link>
            </li>

            {admin && (
              <li className="nav-item">
                <Link className="nav-link text-danger fw-bold" to="/admin" onClick={() => setOpen(false)}>
                  Admin
                </Link>
              </li>
            )}

            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard" onClick={() => setOpen(false)}>
                  Dashboard
                </Link>
              </li>
            )}

            {/* {!isLoggedIn && (
              <li className="nav-item">
                <Link
                  className="btn btn-primary rounded-pill px-4 fw-semibold"
                  to="/login"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
              </li>
            )} */}
          </ul>
        </div>
      </div>
    </nav>
  );
}
