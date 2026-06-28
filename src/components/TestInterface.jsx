import { useEffect, useState } from "react";
// import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
// import { useCallback } from "react";
import { useRef } from "react";

export default function TestInterface() {
  const navigate = useNavigate();
  const submitButtonRef = useRef(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const submitted = useRef(false);
  // const [answers, setAnswers] = useState({});
  const [reviewQuestions, setReviewQuestions] = useState([]);
  const [timeTaken, setTimeLeft] = useState(3 * 60 * 60); // 3 hours
  const TOTAL_TIME = 3 * 60 * 60;
  const today = new Date();
  const testId = `${today.getDate()}${today.toLocaleString("default", {
    month: "long",
  })}${today.getFullYear()}`;

  const userData = JSON.parse(localStorage.getItem("isLoggedIn"));
  const userId = userData.userId;

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Count Attempted Questions
  const getAttemptedCount = () => {
    let attempted = 0;

    questions.forEach((q, index) => {
      if (q.questionType === "MCQ" && correctAnswer[index] !== undefined) {
        attempted++;
      }

      if (q.questionType === "MSQ" && correctAnswers[index]?.length > 0) {
        attempted++;
      }

      if (
        q.questionType === "NAT" &&
        answer[index] !== undefined &&
        answer[index] !== ""
      ) {
        attempted++;
      }
    });

    return attempted;
  };

  // Count Correct Questions
  const countCorrect = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      // MCQ
      if (
        q.questionType === "MCQ" &&
        correctAnswer[index] === q.correctAnswer
      ) {
        correct++;
      }

      // MSQ
      if (q.questionType === "MSQ") {
        const userAns = correctAnswers[index] || [];
        const dbAns = q.correctAnswers || [];

        const isCorrect =
          userAns.length === dbAns.length &&
          [...userAns].sort().join(",") === [...dbAns].sort().join(",");

        if (isCorrect) {
          correct++;
        }
      }

      // NAT
      if (
        q.questionType === "NAT" &&
        Number(answer[index]) === Number(q.answer)
      ) {
        correct++;
      }
    });
    return correct;
  };

  // Calculate Score
  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, index) => {
      // MCQ
      if (q.questionType === "MCQ") {
        const userAnswer = correctAnswer[index];

        if (userAnswer !== undefined) {
          if (userAnswer === q.correctAnswer) {
            score += q.marks;
          } else {
            score -= q.negativeMarks;
          }
        }
      }

      // MSQ
      if (q.questionType === "MSQ") {
        const userAnswer = correctAnswers[index] || [];
        const dbAnswer = q.correctAnswers || [];

        if (userAnswer.length > 0) {
          const isCorrect =
            userAnswer.length === dbAnswer.length &&
            [...userAnswer].sort().join(",") === [...dbAnswer].sort().join(",");

          if (isCorrect) {
            score += q.marks;
          } else {
            score -= q.negativeMarks;
          }
        }
      }

      // NAT
      if (q.questionType === "NAT") {
        const userAnswer = answer[index];

        if (userAnswer !== undefined && userAnswer !== "") {
          if (Number(userAnswer) === Number(q.answer)) {
            score += q.marks;
          } else {
            score -= q.negativeMarks;
          }
        }
      }
    });
    return score.toFixed(3);
  };

  // Calculate Accuracy
  const calculateAccuracy = (correct, attempted) => {
    let accuracy = (correct / attempted) * 100;
    return accuracy.toFixed(3);
  };

  // Saving answers in database
  const getUserAnswers = () => {
    return questions.map((q, index) => {
      let userAnswer = null;

      if (q.questionType === "MCQ") {
        userAnswer = correctAnswer[index] || null;
      } else if (q.questionType === "MSQ") {
        userAnswer = correctAnswers[index] || [];
      } else if (q.questionType === "NAT") {
        userAnswer = answer[index] || "";
      }

      return {
        qId: q.qId,
        questionType: q.questionType,
        answer: userAnswer,
      };
    });
  };

  // Handle NAT Answers
  const handleNATAnswer = (e) => {
    setAnswer({
      ...answer,
      [currentQuestion]: e.target.value,
    });
  };

  // Handle MSQ Answers
  const handleMSQAnswer = (optionLetter) => {
    const currentAnswers = correctAnswers[currentQuestion] || [];

    let updatedAnswers;

    if (currentAnswers.includes(optionLetter)) {
      updatedAnswers = currentAnswers.filter((item) => item !== optionLetter);
    } else {
      updatedAnswers = [...currentAnswers, optionLetter];
    }

    setCorrectAnswers({
      ...correctAnswers,
      [currentQuestion]: updatedAnswers,
    });
  };

  const handleSubmit = async () => {
    if (submitted.current) return;
    submitted.current = true;

    const attempted = getAttemptedCount();
    const correct = countCorrect();
    const wrong = attempted - correct;
    const unattempted = questions.length - attempted;
    const actualTimeTaken = TOTAL_TIME - timeTaken;
    const score = calculateScore();
    const accuracy = calculateAccuracy(correct, attempted);
    const answers = getUserAnswers();

    try {
      const response = await fetch("https://gateprocs.vercel.app/submit-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testId,
          userId,
          attempted,
          unattempted,
          correct,
          wrong,
          score,
          accuracy,
          actualTimeTaken,
          answers,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Test Submitted Successfully");
        navigate("/tests", {
          replace: true,
        });
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      submitted.current = false;
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ""; // Browser confirmation dialog
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeTaken === 0) {
      submitButtonRef.current?.click();
    }
  }, [timeTaken]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);

    const mins = Math.floor((seconds % 3600) / 60);

    const secs = seconds % 60;

    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0",
    )}:${String(secs).padStart(2, "0")}`;
  };

  const fetchQuestions = async () => {
    try {
      const res = await fetch("https://gateprocs.vercel.app/daily-test");

      const data = await res.json();

      setQuestions(data.questions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOptionSelect = (optionLetter) => {
    setCorrectAnswer({
      ...correctAnswer,
      [currentQuestion]: optionLetter,
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleReview = () => {
    if (!reviewQuestions.includes(currentQuestion)) {
      setReviewQuestions([...reviewQuestions, currentQuestion]);
    }
  };

  if (questions.length === 0) {
    return <div className="text-center mt-5">Loading Questions...</div>;
  }

  const q = questions[currentQuestion];

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        {/* Left Section */}
        <div className="col-md-9">
          <div className="card shadow">
            <div className="card-header bg-primary text-white d-flex justify-content-between">
              <h5>Question {currentQuestion + 1}</h5>

              <h5>Time Left:{formatTime(timeTaken)}</h5>
            </div>

            <div className="card-body">
              <h5>{q.question}</h5>

              {q.qImage && (
                <img src={q.qImage} alt="" className="img-fluid my-3" />
              )}

              {/* Show option based on Question Type */}
              {/* For MCQ  */}
              {q.questionType === "MCQ" && (
                <div className="mt-4">
                  {q.options.map((option, index) => {
                    const optionLetter = String.fromCharCode(65 + index);

                    return (
                      <label
                        key={index}
                        htmlFor={`option-${currentQuestion}-${index}`}
                        className="form-check border rounded p-3 mb-2 d-block"
                        style={{ cursor: "pointer" }}
                      >
                        <input
                          type="radio"
                          id={`option-${currentQuestion}-${index}`}
                          className="form-check-input"
                          name="option"
                          checked={
                            correctAnswer[currentQuestion] === optionLetter
                          }
                          onChange={() => handleOptionSelect(optionLetter)}
                        />

                        <span className="ms-2">
                          <strong>{optionLetter}.</strong> {option.text}
                        </span>

                        {option.image && (
                          <img
                            src={option.image}
                            alt=""
                            className="img-fluid d-block mt-2"
                          />
                        )}
                      </label>
                    );
                  })}
                </div>
              )}
              {/* For MSQ  */}
              {q.questionType === "MSQ" && (
                <div className="mt-4">
                  {q.options.map((option, index) => {
                    const optionLetter = String.fromCharCode(65 + index);

                    return (
                      <div key={index} className="form-check border p-3 mb-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="option"
                          checked={
                            correctAnswers[currentQuestion]?.includes(
                              optionLetter,
                            ) || false
                          }
                          onChange={() => handleMSQAnswer(optionLetter)}
                        />

                        <label className="form-check-label ms-2">
                          {optionLetter}. {option.text}
                        </label>

                        {option.image && (
                          <img
                            src={option.image}
                            alt=""
                            className="img-fluid d-block mt-2"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
              {/* For NAT  */}
              {q.questionType === "NAT" && (
                <div className="mt-3">
                  <label className="form-label">Enter Your Answer</label>

                  <input
                    className="form-control"
                    name="answer"
                    value={answer[currentQuestion] || ""}
                    onChange={handleNATAnswer}
                    placeholder="Enter Numerical Answer"
                  />
                </div>
              )}

              <div className="d-flex gap-2 mt-4">
                <button className="btn btn-secondary" onClick={handlePrevious}>
                  Previous
                </button>

                <button className="btn btn-warning" onClick={handleReview}>
                  Mark For Review
                </button>

                <button className="btn btn-success" onClick={handleNext}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-md-3">
          <div className="card shadow">
            <div className="card-header bg-dark text-white">
              Question Palette
            </div>

            <div className="card-body">
              <div className="d-flex flex-wrap gap-2">
                {questions.map((_, index) => {
                  // let btnClass = "btn btn-outline-secondary";

                  // if (answer[index] !== undefined) {
                  //   btnClass = "btn btn-success";
                  // }

                  // if (reviewQuestions.includes(index)) {
                  //   btnClass = "btn btn-warning";
                  // }
                  let btnClass = "btn btn-outline-secondary";

                  const isAttempted =
                    (questions[index].questionType === "MCQ" &&
                      correctAnswer[index] !== undefined) ||
                    (questions[index].questionType === "MSQ" &&
                      (correctAnswers[index]?.length || 0) > 0) ||
                    (questions[index].questionType === "NAT" &&
                      answer[index] !== undefined &&
                      answer[index] !== "");

                  if (isAttempted) {
                    btnClass = "btn btn-success";
                  }

                  if (reviewQuestions.includes(index)) {
                    btnClass = "btn btn-warning";
                  }

                  return (
                    <button
                      key={index}
                      className={btnClass}
                      style={{ width: "50px" }}
                      onClick={() => setCurrentQuestion(index)}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>

              <hr />

              <button
                className="btn btn-danger w-100"
                ref={submitButtonRef}
                onClick={handleSubmit}
              >
                Submit Test
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
