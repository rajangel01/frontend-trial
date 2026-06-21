import React from 'react'
import { Link } from 'react-router-dom'

const Tests = () => {
  const today = new Date();

  const formattedDate = `${today.getDate()}${today.toLocaleString('default', {
    month: 'long',
  })}${today.getFullYear()}`;
  return (
    <div className="container-fluid">
        <h3>Today's Test</h3>
        <div className="d-flex flex-wrap gap-3 p-3">
          <div className="container">
              <div className="image img-fluid">
                <img src="https://res.cloudinary.com/drpeeigze/image/upload/v1779894490/testfrontimage_ymyr6q.png" alt=""  className='img-fluid'/>
              </div>
              <div className="text">
                <h5>{formattedDate} || Computer Science</h5>
              </div>
              <Link to='/testinterface'><button className='btn btn-success'>Attempt Now</button></Link>
            </div>
        </div>
    </div>
  )
}

export default Tests
