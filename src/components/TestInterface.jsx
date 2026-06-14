import { useEffect, useState } from "react";
// import { useCallback } from "react";
// import { useNavigate } from "react-router-dom";

export default function TestInterface() {
  // const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState({});
  const [reviewQuestions, setReviewQuestions] = useState([]);
  const [timeTaken, setTimeLeft] = useState(3 * 60 * 60); // 3 hours
  // const today = new Date();
  // const testId = `${today.getDate()}${today.toLocaleString('default', {
  //   month: 'long',
  // })}${today.getFullYear()}`;

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleSubmit = async () => {
    // console.log("Answers:", answers);
    // try {
    //   const response = await fetch("http://localhost:8080/submit-test", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //       testId,
    //       answers,
    //       timeTaken,
    //     }),
    //   });

    //   const data = await response.json();

    //   if (data.success) {
    //     alert("Test Submitted Successfully");

    //     console.log(data.result);

    //     // Result page pe bhej sakte ho
    //     navigate("/");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    alert("Test Submitted");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);

          // Auto Submit
          // handleSubmit();

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
      const res = await fetch("https://gateprocs.vercel.app/all-questions");

      const data = await res.json();

      setQuestions(data.questions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOptionSelect = (optionIndex) => {
    setAnswers({
      ...answers,
      [currentQuestion]: optionIndex,
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
              {q.questionType === "MCQ" &&(
                <div className="mt-4">
                {q.options.map((option, index) => (
                  <div
                    key={index}
                    className="form-check border rounded p-3 mb-2"
                  >
                    <input
                      type="radio"
                      className="form-check-input"
                      name="option"
                      checked={answers[currentQuestion] === index}
                      onChange={() => handleOptionSelect(index)}
                    />

                    <label className="form-check-label ms-2">
                      {option.text}
                    </label>

                    {option.image && (
                      <img
                        src={option.image}
                        alt=""
                        className="img-fluid d-block mt-2"
                      />
                    )}
                  </div>
                ))}
              </div>
              )}
              {/* For MSQ  */}
              {q.questionType === "MSQ"&&(
                <div className="mt-4">
                {q.options.map((option, index) => (
                  <div
                    key={index}
                    className="form-check border p-3 mb-2"
                  >
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="option"
                      checked={answers[currentQuestion] === index}
                      onChange={() => handleOptionSelect(index)}
                    />

                    <label className="form-check-label ms-2">
                      {option.text}
                    </label>

                    {option.image && (
                      <img
                        src={option.image}
                        alt=""
                        className="img-fluid d-block mt-2"
                      />
                    )}
                  </div>
                ))}
              </div>
              )}
              {/* For NAT  */}
              {q.questionType === "NAT" && (
              <div className="mt-3">
                <label className="form-label">Enter Your Answer</label>

                <input
                  type="number"
                  className="form-control"
                  name="correctAnswer"
                  onChange={setAnswers}
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
                  let btnClass = "btn btn-outline-secondary";

                  if (answers[index] !== undefined) {
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

              <button className="btn btn-danger w-100" onClick={handleSubmit}>
                Submit Test
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
