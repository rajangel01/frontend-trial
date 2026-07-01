
import React from "react";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const menu = [
    {
      title: "Attempt Test",
      subtitle: "Start your mock test",
      icon: "fa-solid fa-pen-to-square",
      color: "primary",
      path: "/tests",
    },
    {
      title: "Daily Leaderboard",
      subtitle: "Today's rankings",
      icon: "fa-solid fa-trophy",
      color: "warning",
      path: "/daily-leaderboard",
    },
    {
      title: "Monthly Leaderboard",
      subtitle: "Monthly rankings",
      icon: "fa-solid fa-medal",
      color: "success",
      path: "/monthly-leaderboard",
    },
    {
      title: "All Time Leaderboard",
      subtitle: "Overall rankings",
      icon: "fa-solid fa-crown",
      color: "danger",
      path: "/leaderboard",
    },
    {
      title: "Profile",
      subtitle: "Manage your account",
      icon: "fa-solid fa-user",
      color: "info",
      path: "/user-profile",
    },
    {
      title: "Test History",
      subtitle: "Previous attempts",
      icon: "fa-solid fa-clock-rotate-left",
      color: "secondary",
      path: "/test-history",
    },
  ];

  return (
    <div className="container-fluid py-4">

      <div className="text-center mb-5">
        <h2 className="fw-bold">Dashboard</h2>
        
      </div>

      <div className="row g-4">

        {menu.map((item, index) => (
          <div className="col-lg-6 col-md-6" key={index}>
            <Link
              to={item.path}
              className="text-decoration-none"
            >
              <div className="card shadow-sm h-100">

                <div className="card-body">

                  <div className="d-flex align-items-center">

                    <div
                      className={`bg-${item.color} rounded-circle text-white d-flex justify-content-center align-items-center`}
                      style={{ width: "60px", height: "60px" }}
                    >
                      <i className={`${item.icon} fs-4`}></i>
                    </div>

                    <div className="ms-3 flex-grow-1">
                      <h5 className="mb-1 text-dark fw-bold">
                        {item.title}
                      </h5>

                      <small className="text-muted">
                        {item.subtitle}
                      </small>
                    </div>

                    <i className="fa-solid fa-angle-right fs-3 text-secondary"></i>

                  </div>

                </div>

              </div>
            </Link>
          </div>
        ))}

      </div>
    </div>
  );
};

export default UserDashboard;