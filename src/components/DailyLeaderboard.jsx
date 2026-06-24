import React from 'react'

const DailyLeaderboard = () => {
  const leaderboard = [
    {
      rank: 1,
      name: "Rahul",
      score: 68,
      correct: 24,
      accuracy: 92,
      actualTimeTaken: "41m 20s"
    },
    {
      rank: 2,
      name: "Priya",
      score: 65,
      correct: 23,
      accuracy: 89,
      actualTimeTaken: "43m 05s"
    },
    {
      rank: 3,
      name: "Aman",
      score: 64,
      correct: 23,
      accuracy: 87,
      actualTimeTaken: "45m 18s"
    },
    {
      rank: 4,
      name: "Raj",
      score: 62,
      correct: 22,
      accuracy: 84,
      actualTimeTaken: "46m 02s",
      isCurrentUser: true
    }
  ];

  return (
    <div className="containerer my-4">

      {/* Top Cards */}
      <div className="row g-3 mb-4">

        <div className="col-md-4">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h5>🏆 Your Rank</h5>
              <h2>#4</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h5>🎯 Your Score</h5>
              <h2>62</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h5>📊 Accuracy</h5>
              <h2>84%</h2>
            </div>
          </div>
        </div>

      </div>

      {/* Leaderboard */}

      <div className="card shadow">

        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">
            🏅 Daily Leaderboard
          </h4>
        </div>

        <div className="table-responsive">

          <table className="table table-hover align-middle mb-0">

            <thead className="table-dark">
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
                <th>Correct</th>
                <th>Accuracy</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>

              {leaderboard.map((user) => (

                <tr
                  key={user.rank}
                  className={user.isCurrentUser ? "table-warning fw-bold" : ""}
                >

                  <td style={{fontSize:"20px"}}>

                    {user.rank === 1 && "🥇"}
                    {user.rank === 2 && "🥈"}
                    {user.rank === 3 && "🥉"}
                    {user.rank > 3 && "#" + user.rank}

                  </td>

                  <td>
                    {user.name}
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

                  <td>{user.actualTimeTaken}</td>

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
            538
          </div>
        </div>

        <div className="col-md-4">
          <div className="alert alert-success mb-2">
            <strong>Highest Score</strong><br />
            71
          </div>
        </div>

        <div className="col-md-4">
          <div className="alert alert-warning mb-2">
            <strong>Average Score</strong><br />
            42.8
          </div>
        </div>

      </div>

    </div>
  );
}

export default DailyLeaderboard
