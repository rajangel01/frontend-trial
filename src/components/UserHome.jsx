import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

import "swiper/css";

const UserHome = () => {
  const userData = JSON.parse(localStorage.getItem("isLoggedIn"));
  // const [videoUrl, setVideoUrl] = useState("");
  const [topThree, setTopThree] = useState([]);

  useEffect(() => {
    getTopThree();
  }, []);

  const getTopThree = async () => {
    try {
      const response = await fetch(
        "https://gateprocs.vercel.app/get-top-three",
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setTopThree(data);
    } catch (err) {
      console.error(err);
    }
  };

  // useEffect(() => {
  //   fetch("https://gateprocs.vercel.app/youtube-video")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // console.log(data)
  //       setVideoUrl(data.videoUrl);
  //     });
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_5xjvgyn",
        "template_z0p5anp",
        e.target,
        "aowNidnB2MCUU6IYE",
      )
      .then(() => {
        alert("Feedback sent successfully!");
        e.target.reset();
      })
      .catch(() => {
        alert("Something went wrong.");
      });
  };

  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState({
    totalTests: 0,
    rank: 0,
    avgScore: 0,
    bestScore: 0,
  });
  // const userData = JSON.parse(localStorage.getItem("isLoggedIn"));
  const userId = userData.userId;

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    const getDashboard = async () => {
      const res = await fetch(
        "https://gateprocs.vercel.app/update-user-dashboard",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
          }),
        },
      );

      const data = await res.json();
      setDashboard(data);
    };

    getDashboard();
  }, [userId]);

  return (
    <div className="bg-light min-vh-100 py-4">
      {/* Welcome */}
      <div className="container-fluid mb-4">
        <div className="card border-0 shadow-sm">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h6 className="text-muted mb-1">Welcome Back 👋</h6>
              <h3 className="fw-bold text-primary mb-0">{userData.name}</h3>
            </div>

            <span className="badge bg-primary fs-6 px-3 py-2">GateProCS</span>
          </div>
        </div>
      </div>

      <div className="container-fluid mt-5">
        <div className="card shadow-lg border-0">
          <div className="card-body">
            <div className="row align-items-center">
              {/* User Details */}
              <div className="col-md-9 ">
                <h4>Your Test Details:</h4>

                <div className="row mt-4 ">
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
      <br />
      <br />
      {/* Hall of Fame */}
      <div className="container-fluid">
        <div className="card border-0 shadow-lg">
          <div className="card-body py-4">
            <h2 className="text-center fw-bold mb-4">🏆 Hall of Fame</h2>

            <Swiper
              modules={[Autoplay]}
              loop={true}
              centeredSlides={true}
              // slidesPerView={1}
              spaceBetween={10}
              speed={1200}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
                waitForTransition: false,
              }}
              observer={true}
              observeParents={true}
            >
              {topThree.map((user, index) => {
                const medals = ["🥇", "🥈", "🥉"];
                const border = ["warning", "secondary", "danger"];
                const bg = ["#fff8e1", "#b0becc", "#c7b8b8"];
                const img = [
                  "https://img.magnific.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80",
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_VizQElqD0pp0CYyAMddLO9XRjJFhrHTKvRH8W0LgCw&s=10",
                ];

                return (
                  <SwiperSlide key={user.userId}>
                    <div
                      className={`card border-${border[index]} shadow-lg`}
                      style={{
                        background: bg[index],
                        borderRadius: "20px",
                        borderWidth: "2px",
                      }}
                    >
                      <div className="card-body text-center">
                        <div style={{ fontSize: "45px" }}>{medals[index]}</div>

                        <img
                          src={img[index]}
                          alt=""
                          className="rounded-circle border border-3"
                          style={{
                            width: "90px",
                            height: "90px",
                            objectFit: "cover",
                          }}
                        />

                        <h4 className="mt-3 fw-bold">{user.name}</h4>

                        <p>Rank #{index + 1}</p>

                        <h2 className="text-success">{user.score}</h2>

                        <div className="progress mb-3">
                          <div
                            className="progress-bar bg-success"
                            style={{ width: `${user.accuracy}%` }}
                          ></div>
                        </div>

                        <span className="badge bg-dark">{user.accuracy}%</span>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            <div className="text-center mt-4">
              <Link to="/leaderboard">
                <button className="btn btn-dark rounded-pill px-5">
                  View Full Leaderboard →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* YouTube */}

      <div className="container-fluid py-5">
        <div className="row justify-content-center">
          <div className="col-lg-7 col-md-9">
            <div className="card shadow border-0 rounded-4">
              <div className="card-header bg-primary text-white text-center py-4 border-0">
                <h3 className="mb-2">
                  <i className="fa-solid fa-comments me-2"></i>
                  Share Your Feedback
                </h3>
                <p className="mb-0">
                  We'd love to hear your thoughts and suggestions.
                </p>
              </div>

              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      <i className="fa-solid fa-user me-2 text-primary"></i>
                      Full Name
                    </label>

                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="name"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      <i className="fa-solid fa-envelope me-2 text-primary"></i>
                      Email Address
                    </label>

                    <input
                      type="email"
                      className="form-control form-control-lg"
                      name="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      <i className="fa-solid fa-tag me-2 text-primary"></i>
                      Subject
                    </label>

                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="subject"
                      placeholder="Enter subject"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      <i className="fa-solid fa-message me-2 text-primary"></i>
                      Feedback
                    </label>

                    <textarea
                      rows="5"
                      className="form-control"
                      name="message"
                      placeholder="Write your feedback here..."
                      required
                    ></textarea>
                  </div>

                  <div className="d-grid">
                    <button className="btn btn-primary btn-lg fw-bold">
                      <i className="fa-solid fa-paper-plane me-2"></i>
                      Submit Feedback
                    </button>
                  </div>
                </form>
              </div>

              <div className="card-footer bg-light text-center py-3">
                <small className="text-muted">
                  ❤️ Your feedback helps us improve <strong>GateProCS</strong>.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
