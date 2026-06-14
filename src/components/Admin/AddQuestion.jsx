import { useState } from "react";
import React from "react";

export default function AddQuestion() {
  //  const [questionType, setQuestionType] = useState("");
  const [questionData, setQuestionData] = useState({
    qId: "",
    questionType: "",
    question: "",
    qImage: "",
    options: [
      { text: "", image: "" },
      { text: "", image: "" },
      { text: "", image: "" },
      { text: "", image: "" },
    ],
    correctAnswer: "",
    solution: "",
    solutionImage: "",
    subject: "",
    marks: 1,
    negativeMarks: 0.33,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(questionData)

    try {
      const response = await fetch(
        "https://gateprocs.vercel.app/add-question",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(questionData),
        },
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);

        setQuestionData({
          qId: "",
          question: "",
          questionType: "",
          qImage: "",
          options: [
            { text: "", image: "" },
            { text: "", image: "" },
            { text: "", image: "" },
            { text: "", image: "" },
          ],
          correctAnswer: "",
          solution: "",
          solutionImage: "",
          subject: "",
          marks: 1,
          negativeMarks: 0.33,
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const handleChange = (e) => {
    setQuestionData({
      ...questionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOptionChange = (index, field, value) => {
    const updatedOptions = [...questionData.options];
    updatedOptions[index][field] = value;

    setQuestionData({
      ...questionData,
      options: updatedOptions,
    });
  };

  return (
    <div className="container-fluid py-4">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Add New Question</h3>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Question Info */}
            <div className="container">
              <div className="col-md-4">
                <label className="form-label">Question ID</label>
                <input
                  type="text"
                  className="form-control"
                  name="qId"
                  value={questionData.qId}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  className="form-control"
                  name="subject"
                  value={questionData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label className="">Marks</label>
                <input
                  type="number"
                  className="form-control"
                  name="marks"
                  value={questionData.marks}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Negative</label>
                <input
                  type="number"
                  className="form-control"
                  name="negativeMarks"
                  value={questionData.negativeMarks}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* Question type select */}
            <div className="container mt-4">
              <div className="mb-3">
                <label className="form-label fw-bold">Question Type</label>

                <select
                  className="form-select"
                  name="questionType"
                  value={questionData.questionType}
                  onChange={handleChange}
                >
                  <option value="">Select Question Type</option>
                  <option value="MCQ">MCQ (Single Correct)</option>
                  <option value="MSQ">MSQ (Multiple Correct)</option>
                  <option value="NAT">NAT (Numerical Answer)</option>
                </select>
              </div>
            </div>
            {/* Question */}
            <div className="mt-4">
              <label className="form-label">Question</label>
              <textarea
                className="form-control"
                rows="4"
                name="question"
                value={questionData.question}
                onChange={handleChange}
              />
            </div>
            <div className="mt-3">
              <label className="form-label">Question Image URL</label>
              <input
                type="text"
                className="form-control"
                name="qImage"
                value={questionData.qImage}
                onChange={handleChange}
              />
            </div>
            {/* Options */}
            <hr className="my-4" />
            <h4 className="mb-3">Options</h4>
            {questionData.options.map((option, index) => (
              <div key={index} className="card mb-3 border">
                <div className="card-body">
                  <h5 className="card-title">
                    Option {String.fromCharCode(65 + index)}
                  </h5>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Option Text"
                        value={option.text}
                        onChange={(e) =>
                          handleOptionChange(index, "text", e.target.value)
                        }
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Option Image URL"
                        value={option.image}
                        onChange={(e) =>
                          handleOptionChange(index, "image", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Correct Answer */}
            <div className="mt-3">
              <label className="form-label">Correct Answer</label>
              <select
                className="form-select"
                name="correctAnswer"
                value={questionData.correctAnswer}
                onChange={handleChange}
              >
                <option value="">Select Correct Answer</option>
                <option value="A">Option A</option>
                <option value="B">Option B</option>
                <option value="C">Option C</option>
                <option value="D">Option D</option>
              </select>
            </div>
            {/* Solution */}
            <hr className="my-4" />
            <h4>Solution</h4>
            <div className="mb-3">
              <textarea
                className="form-control"
                rows="4"
                name="solution"
                placeholder="Write Solution Here..."
                value={questionData.solution}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="solutionImage"
                placeholder="Solution Image URL"
                value={questionData.solutionImage}
                onChange={handleChange}
              />
            </div>
            {/* Submit */}
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-success btn-lg"
                onClick={handleSubmit}
              >
                Add Question
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
