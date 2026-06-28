import React, { useState } from "react";
// import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const [detailed, setDetailed] = useState(false);
  const [notSubmitted, setNotSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [actualTimeTaken, setActualTimeTaken] = useState(0);
  const [attempted, setAttempted] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [unattempted, setUnattempted] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const today = new Date();

  const testId = `${today.getDate()}${today.toLocaleString("default", {
    month: "long",
  })}${today.getFullYear()}`;

  const userData = JSON.parse(localStorage.getItem("isLoggedIn"));
  const userId = userData.userId;

  const gotoHome = () => {
    navigate("/home");
    window.location.reload();
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hrs}h ${mins}m ${secs}s`;
  };

  

  const showSolution = useCallback(async () => {
    setDetailed(true);
    const res = await fetch(
      "https://gateprocs.vercel.app/test-detailed-analysis",
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
    if (data.answers) {
      setQuestions(data.questions.sort((a, b) => a.qId.localeCompare(b.qId)));
      setAnswers(data.answers.sort((a, b) => a.qId.localeCompare(b.qId)));
      
    }
  }, [userId, testId]);

  const closeSolution = () => {
    setDetailed(false);
  };

  const handleCheckSubmit = useCallback(async () => {
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
        setAccuracy(data.accuracy);
        setActualTimeTaken(data.timeTaken);
        setScore(data.score);
        setCorrect(data.correct);
        setUnattempted(data.unattempted);
        setWrong(data.wrong);
        setAttempted(data.attempted);
        // console.log(data)
      } else {
        setNotSubmitted(true);
      }
    } catch (err) {
      alert(err.message);
    }
  }, [userId, testId]);

  useEffect(() => {
    handleCheckSubmit();
    showSolution();
  }, [handleCheckSubmit, showSolution]);

  if (notSubmitted) {
    return (
      <div className="container">
        <h5 className="text-center">
          Today you haven't submitted test,{" "}
          <Link to="/testinterface">attempt test</Link> to see your result.
        </h5>
      </div>
    );
  }

  if (detailed) {
    return (
      <>
        
        <h4 className="text-center mb-4 fw-bold text-primary">
          <i className="fas fa-file-alt me-2"></i>
          Detailed Analysis
        </h4>
        <div className="text-center mt-4 mb-5">
          <button
            className="btn btn-danger btn-lg px-5 shadow"
            onClick={closeSolution}
          >
            <i className="fas fa-times-circle me-2"></i>
            Close
          </button>
        </div>

        {answers.map((item, index) => (
          <div
            key={item.qId}
            className="card shadow-lg border-0 rounded-4 mb-4"
          >
            {/* Card Header */}
            <div className="card-header bg-primary text-white rounded-top-4 py-3">
              <h5 className="mb-0">
                <i className="fas fa-question-circle me-2"></i>
                Question {index + 1}
              </h5>
            </div>

            <div className="card-body">
              {/* Question */}
              <h5 className="fw-semibold mb-3">{questions[index].question}</h5>

              {/* Question Image */}
              {questions[index].qImage && (
                <div className="text-center mb-4">
                  <img
                    src={questions[index].qImage}
                    alt="Question"
                    className="img-fluid rounded shadow border"
                    style={{ maxHeight: "350px" }}
                  />
                </div>
              )}

              {/* Options */}
              {(questions[index].questionType === "MCQ" ||
                questions[index].questionType === "MSQ") && (
                <div className="mb-4">
                  <h6 className="fw-bold mb-3">
                    <i className="fas fa-list-ul me-2"></i>
                    Options
                  </h6>

                  <div className="list-group">
                    {questions[index].options.map((option, i) => (
                      <div
                        key={i}
                        className="list-group-item rounded mb-2 border"
                      >
                        <div className="fw-semibold">
                          {String.fromCharCode(65 + i)}. {option.text}
                        </div>

                        {option.image && (
                          <div className="text-center mt-3">
                            <img
                              src={option.image}
                              alt="Option"
                              className="img-fluid rounded border shadow-sm"
                              style={{ maxHeight: "220px" }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Details */}
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="card bg-light h-100">
                    <div className="card-body">
                      <p className="mb-2">
                        <strong>Question Type:</strong> {item.questionType}
                      </p>

                      <p className="mb-2">
                        <strong>Your Answer:</strong>{" "}
                        <span className="badge bg-danger fs-6">
                          {String(item.answer)}
                        </span>
                      </p>

                      <p className="mb-2">
                        <strong>Correct Answer:</strong>{" "}
                        <span className="badge bg-success fs-6">
                          {questions[index].questionType === "MCQ"
                            ? questions[index].correctAnswer
                            : questions[index].questionType === "MSQ"
                              ? Array.isArray(questions[index].correctAnswers)
                                ? questions[index].correctAnswers.join(", ")
                                : questions[index].correctAnswers
                              : questions[index].answer}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card bg-light h-100">
                    <div className="card-body">
                      <p className="mb-2">
                        <strong>Marks:</strong>{" "}
                        <span className="badge bg-primary">
                          +{questions[index].marks}
                        </span>
                      </p>

                      <p className="mb-2">
                        <strong>Negative Marks:</strong>{" "}
                        <span className="badge bg-warning text-dark">
                          -{questions[index].negativeMarks}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Solution */}
              <div className="alert alert-success mt-4">
                <h6 className="fw-bold">
                  <i className="fas fa-lightbulb me-2"></i>
                  Solution
                </h6>

                <p className="mb-2">{questions[index].solution}</p>

                {questions[index].solutionImage && (
                  <div className="text-center mt-3">
                    <img
                      src={questions[index].solutionImage}
                      alt="Solution"
                      className="img-fluid rounded border shadow"
                      style={{ maxHeight: "350px" }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        
      </>
    );
  } else {
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

        <div className="row g-2 mt-2">
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
            <button
              className="btn btn-success w-100"
              onClick={() => window.print()}
            >
              <i className="fa-solid fa-print"></i>
              <span className="d-none d-md-inline">Print</span>
              <span className="d-inline d-md-none">Print</span>
            </button>
          </div>

          <div className="col-4 col-md-3">
            <button className="btn btn-primary w-100" onClick={showSolution}>
              <i className="fas fa-book-open me-2"></i>
              <span className="d-none d-md-inline">Solution</span>
              <span className="d-inline d-md-none">Solution</span>
            </button>
          </div>

          <div className="col-4 col-md-3">
            <button className="btn btn-dark w-100" onClick={gotoHome}>
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
  }
};

export default Result;
