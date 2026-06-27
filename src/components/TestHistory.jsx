import React, { useState } from "react";
import { useEffect } from "react";

const TestHistory = () => {
  const [testHistory, setTestHistory] = useState([]);
  const userData = JSON.parse(localStorage.getItem("isLoggedIn"));
  const userId = userData.userId;

  useEffect(() => {
    fetch("https://gateprocs.vercel.app/find-user-test-history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTestHistory(data); // agar backend { history: [...] } return kar raha hai
      })
      .catch((err) => console.log(err));
  }, [userId]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hrs}h ${mins}m ${secs}s`;
  };

  return (
    <div className="containerer mt-4">
      <div className="card shadow border-0">
        <div className="card-header bg-success text-white">
          <h4 className="mb-0">
            <i className="fas fa-history me-2"></i>
            Test History
          </h4>
        </div>

        <div className="card-body p-0">
          {testHistory.length === 0 ? (
            <div className="text-center p-5">
              <i className="fas fa-book-open fa-3x text-secondary mb-3"></i>
              <h5>No Test Attempted Yet</h5>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Score</th>
                    <th>Correct</th>
                    <th>Wrong</th>
                    <th>Attempted</th>
                    <th>Accuracy</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {testHistory.map((test, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>

                      <td>
                        <span className="fw-bold">{test.testId}</span>
                      </td>

                      <td>
                        <span className="badge bg-primary fs-6">
                          {test.score}
                        </span>
                      </td>

                      <td className="text-success fw-bold">{test.correct}</td>

                      <td className="text-danger fw-bold">{test.wrong}</td>

                      <td>{test.attempted}</td>

                      <td>
                        <div className="progress" style={{ height: "8px" }}>
                          <div
                            className={`progress-bar ${
                              test.accuracy >= 80
                                ? "bg-success"
                                : test.accuracy >= 60
                                  ? "bg-warning"
                                  : "bg-danger"
                            }`}
                            style={{ width: `${test.accuracy}%` }}
                          ></div>
                        </div>

                        <small>{test.accuracy}%</small>
                      </td>

                      <td>{formatTime(test.timeTaken)}</td>

                      <td>
                        {test.score >= 28 ? (
                          <span className="badge bg-success">Passed</span>
                        ) : (
                          <span className="badge bg-danger">Failed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestHistory;
