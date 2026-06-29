import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserHome = () => {
  const userData = JSON.parse(localStorage.getItem("isLoggedIn"));
  const [videoUrl, setVideoUrl] = useState("");
  const [topThree, setTopThree] = useState([]);

  useEffect(() => {
    getTopThree();
  }, []);

  const getTopThree = async () => {
    try {
      const response = await fetch("https://gateprocs.vercel.app/get-top-three");

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setTopThree(data);
    } catch (err) {
      console.error(err);
    }
  };

  


  useEffect(() => {
    fetch("https://gateprocs.vercel.app/youtube-video")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setVideoUrl(data.videoUrl);
      });
  }, []);

  return (
    <div>
      <div className="container">
        <h4>Welcome Back {userData.name}</h4>
      </div>

      <div className="containerer my-5">
  <h2 className="text-center fw-bold mb-5">🏆 Hall of Fame</h2>

  <div className="row g-4">
    {topThree.map((user, index) => {
      const medals = ["🥇", "🥈", "🥉"];
      const border = ["warning", "secondary", "danger"];
      const bg = ["#fff8e1", "#b0becc", "#c7b8b8"];

      return (
        <div
          className="col-12 col-lg-4"
          key={user.userId}
        >
          <div
            className={`card border-${border[index]} shadow-lg h-100 leaderboard-card`}
            style={{
              borderWidth: "2px",
              background: bg[index],
              transition: "0.3s",
              borderRadius: "20px",
            }}
          >
            <div className="card-body text-center">

              <div
                style={{
                  fontSize: "45px",
                }}
              >
                {medals[index]}
              </div>

              <img
                src={user.profilePic}
                alt=""
                className="rounded-circle border border-3"
                style={{
                  width: "90px",
                  height: "90px",
                  objectFit: "cover",
                }}
              />

              <h4 className="mt-3 fw-bold">
                {user.name}
              </h4>

              <p className="text-muted mb-1">
                Rank #{index + 1}
              </p>

              <h2 className="text-success fw-bold">
                {user.score}
              </h2>

              <p className="mb-1">
                Accuracy
              </p>

              <div className="progress mb-3" style={{ height: "10px" }}>
                <div
                  className="progress-bar bg-success"
                  style={{
                    width: `${user.accuracy}%`,
                  }}
                ></div>
              </div>

              <span className="badge bg-dark fs-6">
                {user.accuracy}%
              </span>

            </div>
          </div>
        </div>
      );
    })}
  </div>

  <div className="text-center mt-5">
    <Link to='/leaderboard'>
      <button className="btn btn-primary px-4 rounded-pill">
      View Full Leaderboard →
    </button>
    </Link>
  </div>
</div>

      <div className="container-lg mt-4">
        <h3 className="mb-3">Watch This Before Starting the Test</h3>

        <div className="ratio ratio-16x9">
          <iframe
            src={videoUrl}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <hr />
        <a
          href="https://www.youtube.com/@raj._angel"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-danger btn-lg"
        >
          📺 Subscribe on YouTube
        </a>
      </div>
    </div>
  );
};

export default UserHome;
