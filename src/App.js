import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./components/Auth.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
// import Home from './components/Home';
import Navbar from "./components/Navbar";
import Info from "./components/Info";
import Admin from "./components/Admin";
import UserHome from "./components/UserHome";
import UserDashboard from "./components/UserDashboard";
import Tests from "./components/Tests";
import TestInterface from "./components/TestInterface";
import AddQuestion from "./components/Admin/AddQuestion";
import UserProfile from "./components/UserProfile";
import TestHistory from "./components/TestHistory";
import DailyLeaderboard from "./components/DailyLeaderboard";
import MonthlyLeaderboard from "./components/MonthlyLeaderboard";
import Leaderboard from "./components/Leaderboard";
import OTPLogin from "./components/OTPLogin";
import UpdateSolutionVideo from "./components/Admin/UpdateSolutionVideo";
import Result from "./components/Result";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  let admin = false;
  const userData = JSON.parse(localStorage.getItem("isLoggedIn"));
  if (userData) {
    if (
      userData.email === "raj@gmail.com" ||
      userData.email === "guptjyoti7800@gmail.com" ||
      userData.email === "rajangel820764@gmail.com" ||
      userData.email === "shaktimaan6151@gmail.com" ||
      userData.email === "mahtab802111@gmail.com"
    ) {
      admin = true;
    }
  }

  

  return (
    <BrowserRouter>
      <Navbar />
      {/* <Space/> */}
      <Routes>
        {isLoggedIn ? (
          <Route path="/" element={<UserHome />} />
        ) : (
          <Route path="/" element={<Info />} />
        )}
        {isLoggedIn ? (
          <Route path="/home" element={<UserHome />} />
        ) : (
          <Route path="/signup" element={<Signup />} />
        )}
        {isLoggedIn ? (
          <Route path="/home" element={<UserHome />} />
        ) : (
          <Route path="/login" element={<Login />} />
        )}
        {isLoggedIn ? (
          <Route path="/dashboard" element={<UserDashboard />} />
        ) : (
          <Route path="/login" element={<Login />} />
        )}
        {isLoggedIn ? (
          <Route path="/tests" element={<Tests />} />
        ) : (
          <Route path="/" element={<Info />} />
        )}
        {admin && <Route path="/admin" element={<Admin />} />}
        {admin && (
          <Route
            path="/update-solution-video"
            element={<UpdateSolutionVideo />}
          />
        )}

        <Route path="/info" element={<Info />} />
        <Route path="/" element={<Info />} />
        {isLoggedIn && (
          <Route path="/testinterface" element={<TestInterface />} />
        )}
        {admin && <Route path="/add-questions" element={<AddQuestion />} />}
        {isLoggedIn && <Route path="/user-profile" element={<UserProfile />} />}
        {isLoggedIn && <Route path="/test-history" element={<TestHistory />} />}
        {isLoggedIn && (
          <Route path="/daily-leaderboard" element={<DailyLeaderboard />} />
        )}
        {isLoggedIn && (
          <Route path="/monthly-leaderboard" element={<MonthlyLeaderboard />} />
        )}
        {isLoggedIn && <Route path="/result" element={<Result />} />}
        {isLoggedIn && <Route path="/leaderboard" element={<Leaderboard />} />}
        <Route path="/otp-login" element={<OTPLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
