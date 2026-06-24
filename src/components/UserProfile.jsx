import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const UserProfile = () => {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState({
    totalTests: 0,
    rank: 0,
    avgScore: 0,
    bestScore: 0,
  });
  const userData = JSON.parse(localStorage.getItem("isLoggedIn"));
  const userId = userData.userId;

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    const getDashboard = async () => {
      const res = await fetch("https://gateprocs.vercel.app/update-user-dashboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
        }),
      });

      const data = await res.json();
      setDashboard(data);
    };

    getDashboard();
  }, [userId]);

  // const userData = JSON.parse(localStorage.getItem("isLoggedIn"));
  const user = {
    name: userData.name,
    email: userData.email,
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqf0Wx4wmsKfLYsiLdBx6H4D8bwQBurWhx5g&s",
    userId: userData.userId,
  };
  return (
    <div className="container-lg mt-5">
      <div className="card shadow-lg border-0">
        <div className="card-body">
          <div className="row align-items-center">
            {/* Profile Image */}
            <div className="col-md-3 text-center">
              <img
                src={user.photo}
                alt="Profile"
                className="rounded-circle img-fluid border border-3"
                style={{ width: "150px", height: "150px" }}
              />
            </div>

            {/* User Details */}
            <div className="col-md-9">
              <h2 className="fw-bold">{user.name}</h2>
              <h3>Your Id: {user.userId}</h3>
              <p className="text-muted">{user.email}</p>

              <div className="row mt-4">
                <div className="col-6 col-md-3 mb-3">
                  <div className="card text-center bg-primary text-white">
                    <div className="card-body">
                      <h4>{dashboard.rank}</h4>
                      <small>Rank</small>
                    </div>
                  </div>
                </div>

                <div className="col-6 col-md-3 mb-3">
                  <div className="card text-center bg-success text-white">
                    <div className="card-body">
                      <h4>{dashboard.totalTests}</h4>
                      <small>Tests</small>
                    </div>
                  </div>
                </div>

                <div className="col-6 col-md-3 mb-3">
                  <div className="card text-center bg-warning text-dark">
                    <div className="card-body">
                      <h4>{dashboard.avgScore}</h4>
                      <small>Avg Score</small>
                    </div>
                  </div>
                </div>

                <div className="col-6 col-md-3 mb-3">
                  <div className="card text-center bg-danger text-white">
                    <div className="card-body">
                      <h4>{dashboard.bestScore}</h4>
                      <small>Best Score</small>
                    </div>
                  </div>
                </div>
              </div>

              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
