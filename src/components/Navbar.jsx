import { Link } from "react-router-dom";

export default function Navbar() {
  // const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");


  let admin = false;
  const userData = JSON.parse(localStorage.getItem("isLoggedIn"));
  if (userData) {
    // console.log(userData.name)
    if (userData.email === "raj@gmail.com") {
      admin = true;
    }
  }

  return (
    <nav style={styles.nav}>
      {/* Logo */}
      <p style={styles.logo}>GATEProCS</p>

      {/* Links */}
      <div style={styles.links}>
        {isLoggedIn ? (
          <Link to="/home" style={styles.link}>
            Home
          </Link>
        ) : (
          <Link to="/info" style={styles.link}>
            Home
          </Link>
        )}

        <Link to="/info" style={styles.link}>
          Info
        </Link>

        {isLoggedIn && (
          <Link to="/dashboard" style={styles.link}>
            Dashboard
          </Link>
        )}

        {admin &&(
          <Link to="/admin" style={styles.link}>
            Admin
          </Link>
        )}

        {!isLoggedIn && (
          <Link to="/login" style={styles.loginBtn}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    // position: "fixed",
    // width:"100%",
    margin: "0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1px 10px",
    background: "#0f172a",
    color: "white",
  },
  logo: {
    margin: 0,
    fontWeight: "bold",
  },
  links: {
    display: "flex",
    margin:"10px",
    gap: "20px",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "12px",
  },
  loginBtn: {
    padding: "4px 8px",
    background: "#22c55e",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
  logoutBtn: {
    padding: "4px 8px",
    background: "#ef4444",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
};
