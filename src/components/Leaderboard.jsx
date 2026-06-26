
import React from "react";
import { useEffect,useCallback, useState } from "react";

const Leaderboard = () =>{

  const [leaderboard, setLeaderboard] = useState([]);
  const [avgScore, setAvgScore] = useState();
  const [rank, setRank] = useState();
  const [accuracy, setAccuracy] = useState();
  const [ userScore, setUserScore] = useState();
  // const [ averageScore, setAverageScore] = useState();
  const[totalParticipant, setTotalParticipant] = useState();
  const[score, setScore] = useState();

  const today = new Date();
  const formattedDate = `${today.getDate()}${today.toLocaleString("default", {
    month: "long",
  })}${today.getFullYear()}`;
  // const userData = JSON.parse(localStorage.getItem("isLoggedIn"));
  // const userId = userData.userId;
  const testId = formattedDate;
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
            testId,
            userId,
          }),
        }
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
      setScore(data.score);
      setTotalParticipant(data.totalParticipants)
    } catch (err) {
      console.log(err);
    }
  }, [testId, userId]);
  
  useEffect(() => {
    getLeaderboard();
  }, [getLeaderboard]);
  return (
    <div className="containerer my-4">

      {/* Top Cards */}
      <div className="row g-3 mb-4">

        <div className="col-md-4">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h5>🏆 Your Rank</h5>
              <h2>{rank}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h5>🎯 Your Score</h5>
              <h2>{userScore}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h5>📊 Accuracy</h5>
              <h2>{accuracy}</h2>
            </div>
          </div>
        </div>

      </div>

      {/* Leaderboard */}

      <div className="card shadow">

        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">
            🏅 Leaderboard
          </h4>
        </div>

        <div className="table-responsive">

          <table className="table table-hover align-middle mb-0">

            <thead className="table-dark">
              <tr>
                <th>Rank</th>
                <th>UserID</th>
                <th>Score</th>
                <th>Correct</th>
                <th>Accuracy</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>

              {leaderboard.map((user,index) => (

                <tr
                  key={index+1}
                  className={user.isCurrentUser ? "table-warning fw-bold" : ""}
                >

                  <td style={{fontSize:"20px"}}>

                    {index+1 === 1 && "🥇"}
                    {index+1 === 2 && "🥈"}
                    {index+1 === 3 && "🥉"}
                    {index+1 > 3 && "#" + index}

                  </td>

                  <td>
                    {user.userId}
                    {user.isCurrentUser && (
                      <span className="badge bg-success ms-2">
                        You
                      </span>
                    )}
                  </td>

                  <td>{user.score}</td>

                  <td>{user.correct}</td>

                  <td>

                    <div className="progress" style={{height:"8px"}}>

                      <div
                        className="progress-bar bg-success"
                        style={{width:`${user.accuracy}%`}}
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

      {/* Footer */}

      <div className="row mt-4 text-center">

        <div className="col-md-4">
          <div className="alert alert-primary mb-2">
            <strong>Total Participants</strong><br />
            {totalParticipant}
          </div>
        </div>

        <div className="col-md-4">
          <div className="alert alert-success mb-2">
            <strong>Highest Score</strong><br />
            {score}
          </div>
        </div>

        <div className="col-md-4">
          <div className="alert alert-warning mb-2">
            <strong>Average Score</strong><br />
            {avgScore}
          </div>
        </div>

      </div>

    </div>
  );
}
export default Leaderboard