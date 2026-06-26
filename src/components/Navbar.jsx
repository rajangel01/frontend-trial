import { Link } from "react-router-dom";

export default function Navbar() {
  // const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");


  let admin = false;
  const userData = JSON.parse(localStorage.getItem("isLoggedIn"));
  if (userData) {
    // console.log(userData.name)
    if (userData.email === "raj@gmail.com" ||userData.email ==="guptjyoti7800@gmail.com" || userData.email==="rajangel820764@gmail.com"|| userData.email==="shaktimaan6151@gmail.com"||userData.email==="mahtab802111@gmail.com") {
      admin = true;
    }
  }

  return (
    <nav style={styles.nav}>
      {/* Logo */}
      <h5 style={styles.logo}>GATEProCS</h5>

      {/* Links */}
      <div style={styles.links}>
        {isLoggedIn ? (
          <Link to="/home" style={styles.link}>
            {/* <i className="fa-solid fa-house"></i> */}
            Home
          </Link>
        ) : (
          <Link to="/info" style={styles.link}>
            {/* <i className="fa-solid fa-house"></i> */}
            Info
          </Link>
        )}

        <Link to="/info" style={styles.link}>
          {/* <i className="fa-solid fa-circle-info"></i> */}
          Info
        </Link>

        {admin &&(
          <Link to="/admin" style={styles.link}>
            Admin
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/dashboard" style={styles.link}>
             <i className="fa-solid fa-bars"></i>
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
    margin:"15px",
    gap: "30px",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
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
