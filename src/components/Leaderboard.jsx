import React from "react";
import { useEffect, useCallback, useState } from "react";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [avgScore, setAvgScore] = useState();
  const [rank, setRank] = useState();
  const [accuracy, setAccuracy] = useState();
  const [userScore, setUserScore] = useState();
  const [totalParticipant, setTotalParticipant] = useState();
  const [score, setScore] = useState();

  const userData = JSON.parse(localStorage.getItem("isLoggedIn"));
  const userId = userData.userId;

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hrs}h ${mins}m ${secs}s`;
  };

  const getLeaderboard = useCallback(async () => {
    try {
      const res = await fetch(
        "https://gateprocs.vercel.app/get-all-time-leaderboard",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // testId,
            userId,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed");
      }

      setLeaderboard(data.leaderboard);
      setAvgScore(data.averageScore);
      setRank(data.rank);
      setAccuracy(data.accuracy);
      setUserScore(data.userScore);
      setScore(data.highestScore);
      setTotalParticipant(data.totalParticipants);
      // setName(data.name);
    } catch (err) {
      console.log(err);
    }
  }, [userId]);

  useEffect(() => {
    getLeaderboard();
  }, [getLeaderboard]);
  return (
    // <div className="containerer my-4">

    //   {/* Top Cards */}
    //   <div className="row g-3 mb-4">

    //     <div className="col-md-4">
    //       <div className="card shadow-sm text-center">
    //         <div className="card-body">
    //           <h5>🏆 Your Rank</h5>
    //           <h2>{rank}</h2>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="col-md-4">
    //       <div className="card shadow-sm text-center">
    //         <div className="card-body">
    //           <h5>🎯 Your Score</h5>
    //           <h2>{userScore}</h2>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="col-md-4">
    //       <div className="card shadow-sm text-center">
    //         <div className="card-body">
    //           <h5>📊 Accuracy</h5>
    //           <h2>{accuracy}</h2>
    //         </div>
    //       </div>
    //     </div>

    //   </div>

    //   {/* Leaderboard */}

    //   <div className="card shadow">

    //     <div className="card-header bg-primary text-white">
    //       <h4 className="mb-0">
    //         🏅 Leaderboard
    //       </h4>
    //     </div>

    //     <div className="table-responsive">

    //       <table className="table table-hover align-middle mb-0">

    //         <thead className="table-dark">
    //           <tr>
    //             <th>Rank</th>
    //             <th>UserID</th>
    //             <th>Score</th>
    //             <th>Correct</th>
    //             <th>Accuracy</th>
    //             <th>Time</th>
    //           </tr>
    //         </thead>

    //         <tbody>

    //           {leaderboard.map((user,index) => (

    //             <tr
    //               key={index+1}
    //               className={user.isCurrentUser ? "table-warning fw-bold" : ""}
    //             >

    //               <td style={{fontSize:"20px"}}>

    //                 {index+1 === 1 && "🥇"}
    //                 {index+1 === 2 && "🥈"}
    //                 {index+1 === 3 && "🥉"}
    //                 {index+1 > 3 && "#" + (index+1)}

    //               </td>

    //               <td>
    //                 {user.userId}
    //                 {user.isCurrentUser && (
    //                   <span className="badge bg-success ms-2">
    //                     You
    //                   </span>
    //                 )}
    //               </td>

    //               <td>{user.score}</td>

    //               <td>{user.correct}</td>

    //               <td>

    //                 <div className="progress" style={{height:"8px"}}>

    //                   <div
    //                     className="progress-bar bg-success"
    //                     style={{width:`${user.accuracy}%`}}
    //                   ></div>

    //                 </div>

    //                 <small>{user.accuracy}%</small>

    //               </td>

    //               <td>{formatTime(user.timeTaken)}</td>

    //             </tr>

    //           ))}

    //         </tbody>

    //       </table>

    //     </div>

    //   </div>

    //   {/* Footer */}

    //   <div className="row mt-4 text-center">

    //     <div className="col-md-4">
    //       <div className="alert alert-primary mb-2">
    //         <strong>Total Participants</strong><br />
    //         {totalParticipant}
    //       </div>
    //     </div>

    //     <div className="col-md-4">
    //       <div className="alert alert-success mb-2">
    //         <strong>Highest Score</strong><br />
    //         {score}
    //       </div>
    //     </div>

    //     <div className="col-md-4">
    //       <div className="alert alert-warning mb-2">
    //         <strong>Average Score</strong><br />
    //         {avgScore}
    //       </div>
    //     </div>

    //   </div>

    // </div>
    <div className="container-fluid my-4">
      {/* Top Stats */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body text-center">
              <div className="fs-1">🏆</div>
              <h6 className="text-muted">Your Rank</h6>
              <h2 className="fw-bold text-primary">{rank}</h2>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body text-center">
              <div className="fs-1">🎯</div>
              <h6 className="text-muted">Your Score</h6>
              <h2 className="fw-bold text-success">{userScore}</h2>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body text-center">
              <div className="fs-1">📊</div>
              <h6 className="text-muted">Accuracy</h6>
              <h2 className="fw-bold text-warning">{accuracy}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Leaderboard */}
      <div className="card shadow border-0 d-none d-md-block">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">🏅 Leaderboard</h4>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th>Rank</th>
                <th>User Name</th>
                <th>Score</th>
                <th>Correct</th>
                <th>Accuracy</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>
              {leaderboard.map((user, index) => (
                <tr
                  key={index}
                  className={user.isCurrentUser ? "table-warning fw-bold" : ""}
                >
                  <td>
                    {index === 0 && "🥇"}
                    {index === 1 && "🥈"}
                    {index === 2 && "🥉"}
                    {index > 2 && `#${index + 1}`}
                  </td>

                  <td>
                    {user.name}

                    {user.isCurrentUser && (
                      <span className="badge bg-success ms-2">You</span>
                    )}
                  </td>

                  <td>{user.score}</td>

                  <td>{user.correct}</td>

                  <td style={{ minWidth: "140px" }}>
                    <div className="progress">
                      <div
                        className="progress-bar bg-success"
                        style={{ width: `${user.accuracy}%` }}
                      ></div>
                    </div>

                    <small>{user.accuracy}%</small>
                  </td>

                  <td>{formatTime(user.timeTaken)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Leaderboard */}

      <div className="d-md-none">
        <h4 className="text-center mb-3">🏅 Leaderboard</h4>

        {leaderboard.map((user, index) => (
          <div
            key={index}
            className={`card shadow-sm mb-3 ${
              user.isCurrentUser ? "border border-warning" : ""
            }`}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="mb-0">
                  {index === 0 && "🥇"}
                  {index === 1 && "🥈"}
                  {index === 2 && "🥉"}
                  {index > 2 && `#${index + 1}`}
                </h5>

                {user.isCurrentUser && (
                  <span className="badge bg-success">You</span>
                )}
              </div>

              <small className="text-muted d-block">User Name</small>
              <h6 className="fw-bold mb-0">{user.name}</h6>

              <hr />

              <div className="row text-center">
                <div className="col-4">
                  <small className="text-muted">Score</small>
                  <div className="fw-bold">{user.score}</div>
                </div>

                <div className="col-4">
                  <small className="text-muted">Correct</small>
                  <div className="fw-bold">{user.correct}</div>
                </div>

                <div className="col-4">
                  <small className="text-muted">Time</small>
                  <div className="fw-bold">{formatTime(user.timeTaken)}</div>
                </div>
              </div>

              <div className="mt-3">
                <div className="d-flex justify-content-between">
                  <small>Accuracy</small>

                  <small>{user.accuracy}%</small>
                </div>

                <div className="progress">
                  <div
                    className="progress-bar bg-success"
                    style={{
                      width: `${user.accuracy}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}

      <div className="row g-3 mt-4">
        <div className="col-12 col-md-4">
          <div className="card text-bg-primary shadow-sm">
            <div className="card-body text-center">
              <h6>Total Participants</h6>

              <h3>{totalParticipant}</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card text-bg-success shadow-sm">
            <div className="card-body text-center">
              <h6>Highest Score</h6>

              <h3>{score}</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card text-bg-warning shadow-sm">
            <div className="card-body text-center">
              <h6>Average Score</h6>

              <h3>{avgScore}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Leaderboard;
