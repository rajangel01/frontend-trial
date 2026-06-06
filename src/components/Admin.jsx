import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <div>
      <h5 className='text-center'>Admin panel </h5>
      <div className="container"><Link to='/add-questions'>Add Questions</Link></div>
      <div className="container">Manage Comments</div>
      <div className="container">Send Test Notification to Users</div>
    </div>
  )
}

export default Admin
