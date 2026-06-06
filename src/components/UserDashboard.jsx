import React from 'react'
import { Link } from 'react-router-dom'
// import Tests from './Tests'

const UserDashboard = () => {
  return (
    <div>
      <h3 className='text-center'>Dashboard</h3>
      <Link to='/tests' className="text-dark text-decoration-none"><div className="container">Attempt Test</div></Link> 
      <Link to='/daily-leaderboard' className="text-dark text-decoration-none"><div className="container">Daily Leaderboard</div></Link>
      <Link to='/monthly-leaderboard' className="text-dark text-decoration-none"><div className="container">Monthly Leaderboard</div></Link>
      <Link to='/leaderboard' className="text-dark text-decoration-none"><div className="container">All Time Leaderboard</div></Link>
      <Link to='/user-profile' className="text-dark text-decoration-none"><div className="container">Profile</div></Link> 
      <Link to='/test-history' className="text-dark text-decoration-none"><div className="container">History</div></Link>
    </div>
  )
}

export default UserDashboard
