import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="container-fluid">
      <h5 className='text-center'>Free test series plateform for all the mentioned aspirants</h5>
      <ul>
        <li>Computer Science</li>
        <li>General Competition</li>
        <li>Mathematics</li>
        <li>History</li>
        <li>State Board Exam(10th & 12th) objective questions(Currently available for Bihar only)</li>
      </ul>
      <hr />
      <h6>Practice with real exam level tests + Detailed analysis</h6>
      <hr />
      <h5 className='text-center'>Why choose us???</h5>
      <ul>
        <li>Smart Performance Analysis</li>
        <li>Exam level questions</li>
        <li>Hindi + English Support</li>
        <li>Attempting test series feels like you are in the exam right now</li>
        <li>Real Exam timer</li>
        <li>Rank and Leaderboard</li>
        <li>Topic wise test</li>
        <li>Per day 1 mock test</li>
        <hr />
        <li>2000+ signup on first day</li>
        <li>100+ test series in each branch</li>
      </ul>
      <div className="container">
        <Link to='/signup'>Signup</Link>  or <Link to='/login'>Login</Link>  to start your first test
      </div>
    </div>
  )
}

export default Home
