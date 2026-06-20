import React from 'react'

const TestHistory = () => {
  const item = {
    title: "20Jun2026",
    score: 30,
    accuracy: 50,
    right: 40,
    wrong: 30,
    attemptedQuestions: 65,
    totalQuestions: 65,
    timetaken: 5000,
  }
  return (
    <div>
      <h3>Test History</h3>
      <div className="history-card" key={item._id}>

    <h3>{item.title}</h3>

    <p>Score : {item.score}</p>

    <p>Accuracy : {item.accuracy}%</p>

    <p>Right : {item.right}</p>

    <p>Wrong : {item.wrong}</p>

    <p>Attempted : {item.attemptedQuestions}/{item.totalQuestions}</p>

    <p>Time Taken : {item.timeTaken} sec</p>

    <p>
        Date :
        {new Date(item.createdAt).toLocaleString()}
    </p>

</div>
    </div>
  )
}

export default TestHistory
