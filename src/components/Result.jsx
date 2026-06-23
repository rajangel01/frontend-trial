import React, { useState } from "react";
// import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";

const Result = () => {
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
const [score, setScore] = useState(0);
const [actualTimeTaken, setActualTimeTaken]=useState(0);
const[attempted, setAttempted]=useState(0);
const[correct, setCorrect]= useState(0);
const [wrong, setWrong] = useState(0);
const [unattempted, setUnattempted] = useState(0);
const [accuracy, setAccuracy] = useState(0);
 const today = new Date();

const testId =  `${today.getDate()}${today.toLocaleString("default", {
    month: "long",
  })}${today.getFullYear()}`;

const userData = JSON.parse(localStorage.getItem("isLoggedIn"));
  const userId = userData.userId;
  // const score = 0;
  // const actualTimeTaken = 600;
  // const attempted = 60;
  // const correct = 30;
  // const wrong = 30;
  // const unattempted = 5;
//   const answers = [];
  // const accuracy = 50;

//   const fetchQuestions = async () => {
//     try {
//       const res = await fetch("https://gateprocs.vercel.app/daily-test");

//       const data = await res.json();

//       setQuestions(data.questions);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const q = questions[currentQuestion];

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hrs}h ${mins}m ${secs}s`;
  };


  const handleCheckSubmit = useCallback( async () => {
      try {
        const res = await fetch(
          "https://gateprocs.vercel.app/find-users-todays-test",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId,
              testId,
            }),
          },
        );
  
        const data = await res.json();
  
        if (data.userId) {
          setAccuracy(data.accuracy)
          setActualTimeTaken(data.timeTaken)
          setScore(data.score)
          setCorrect(data.correct)
          setUnattempted(data.unattempted)
          setWrong(data.wrong)
          setAttempted(data.attempted)
          // console.log(data)
        }
      } catch (err) {
        alert(err.message);
      }
    }, [userId, testId]);
  
    useEffect(() => {
      handleCheckSubmit();
    }, [handleCheckSubmit]);

  return (
    <>
      <div className="card shadow-lg border-0 rounded-4 mb-4 bg-success text-white">
        <div className="card-body text-center py-4">
          <i className="fas fa-check-circle fa-3x mb-3"></i>

          <h2 className="fw-bold mb-2">Test Submitted Successfully</h2>

          <p className="mb-0 opacity-75">
            Congratulations! Here is your performance report.
          </p>
        </div>
      </div>
      {/* ======================= Dashboard ======================= */}

      <div className="row g-3 mt-3">
        {/* Score */}
        <div className="col-6 col-md-6 col-lg-3">
          <div className="card shadow border-0 rounded-4 h-100">
            <div className="card-body text-center">
              <i className="fas fa-trophy fa-2x text-warning mb-3"></i>
              <h6 className="text-muted">Score</h6>
              <h2 className="fw-bold text-success">{score}</h2>
            </div>
          </div>
        </div>

        {/* Accuracy */}
        <div className="col-6 col-md-6 col-lg-3">
          <div className="card shadow border-0 rounded-4 h-100">
            <div className="card-body text-center">
              <i className="fas fa-bullseye fa-2x text-primary mb-3"></i>
              <h6 className="text-muted">Accuracy</h6>
              <h2 className="fw-bold text-primary">{accuracy.toFixed(2)}%</h2>
            </div>
          </div>
        </div>

        {/* Time */}
        <div className="col-6 col-md-6 col-lg-3">
          <div className="card shadow border-0 rounded-4 h-100">
            <div className="card-body text-center">
              <i className="fas fa-clock fa-2x text-danger mb-3"></i>
              <h6 className="text-muted">Time Taken</h6>
              <h5 className="fw-bold text-danger">
                {formatTime(actualTimeTaken)}
              </h5>
            </div>
          </div>
        </div>

        {/* Total Questions */}
        <div className="col-6 col-md-6 col-lg-3">
          <div className="card shadow border-0 rounded-4 h-100">
            <div className="card-body text-center">
              <i className="fas fa-list-ol fa-2x text-dark mb-3"></i>
              <h6 className="text-muted">Total Questions</h6>
              <h2 className="fw-bold">{65}</h2>
            </div>
          </div>
        </div>

        {/* Attempted */}
        <div className="col-6 col-md-6 col-lg-3">
          <div className="card shadow border-0 rounded-4 h-100">
            <div className="card-body text-center">
              <i className="fas fa-pen fa-2x text-info mb-3"></i>
              <h6 className="text-muted">Attempted</h6>
              <h2 className="fw-bold text-info">{attempted}</h2>
            </div>
          </div>
        </div>

        {/* Correct */}
        <div className="col-6 col-md-6 col-lg-3">
          <div className="card shadow border-0 rounded-4 h-100">
            <div className="card-body text-center">
              <i className="fas fa-check-circle fa-2x text-success mb-3"></i>
              <h6 className="text-muted">Correct</h6>
              <h2 className="fw-bold text-success">{correct}</h2>
            </div>
          </div>
        </div>

        {/* Wrong */}
        <div className="col-6 col-md-6 col-lg-3">
          <div className="card shadow border-0 rounded-4 h-100">
            <div className="card-body text-center">
              <i className="fas fa-times-circle fa-2x text-danger mb-3"></i>
              <h6 className="text-muted">Wrong</h6>
              <h2 className="fw-bold text-danger">{wrong}</h2>
            </div>
          </div>
        </div>

        {/* Unattempted */}
        <div className="col-6 col-md-6 col-lg-3">
          <div className="card shadow border-0 rounded-4 h-100">
            <div className="card-body text-center">
              <i className="fas fa-minus-circle fa-2x text-secondary mb-3"></i>
              <h6 className="text-muted">Unattempted</h6>
              <h2 className="fw-bold text-secondary">{unattempted}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5 g-2 justify-content-center">
        <div className="col-4 col-md-3">
          <button className="btn btn-success w-100">
            <i className="fas fa-redo-alt me-2"></i>
            <span className="d-none d-md-inline">Reattempt</span>
            <span className="d-inline d-md-none">Retry</span>
          </button>
        </div>

        <div className="col-4 col-md-3">
          <button className="btn btn-primary w-100">
            <i className="fas fa-book-open me-2"></i>
            <span className="d-none d-md-inline">Solution</span>
            <span className="d-inline d-md-none">Solution</span>
          </button>
        </div>

        <div className="col-4 col-md-3">
          <button className="btn btn-dark w-100">
            <i className="fas fa-home me-2"></i>
            <span className="d-none d-md-inline">Home</span>
            <span className="d-inline d-md-none">Home</span>
          </button>
        </div>
      </div>
      <br />
      <br />
    </>
  );
};

export default Result;
