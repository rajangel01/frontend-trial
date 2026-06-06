import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      {/* Logo */}
      <h2 style={styles.logo}>GATEProCS</h2>

      {/* Links */}
      <div style={styles.links}>
        {isLoggedIn?(<Link to="/home" style={styles.link}>Home</Link>):(<Link to="/" style={styles.link}>Home</Link>)}
        
        <Link to="/info" style={styles.link}>Info</Link>

        {isLoggedIn && (
          <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        )}

        {!isLoggedIn ? (
          <Link to="/login" style={styles.loginBtn}>Login</Link>
        ) : (
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    // position: "fixed",
    // width:"100%",
    margin:"0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "#0f172a",
    color: "white",
    
  },
  logo: {
    margin: 0,
    fontWeight: "bold",
  },
  links: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
  },
  loginBtn: {
    padding: "6px 12px",
    background: "#22c55e",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
  logoutBtn: {
    padding: "6px 12px",
    background: "#ef4444",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
};