import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <>
    <div>
      <h5 className='text-center'>Admin panel </h5>
      <div className="container"><Link to='/add-questions' className='fw-bold text-light text-decoration-none'>Add Questions</Link></div>
      <div className="container">Manage Comments</div>
      <div className="container">Send Test Notification to Users</div>
      <div className="container"><Link to='/update-solution-video' className='fw-bold text-light text-decoration-none'>Update Solution Video</Link> </div>
      <br /><br /><br /><br /><br />
    </div>
    </>
  )
}

export default Admin
