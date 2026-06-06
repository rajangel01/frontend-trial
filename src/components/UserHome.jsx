import React from 'react'

const UserHome = () => {
  const userData = JSON.parse(localStorage.getItem("isLoggedIn"))
  return (
    <div>
      <div className="container">
        <h4>Welcome Back {userData.name}</h4>
      </div>
      
       <div className="container-lg mt-4">
      <h3 className="mb-3">Watch This Before Starting the Test</h3>

      <div className="ratio ratio-16x9">
        <iframe
          src="https://www.youtube.com/embed/HTIkfuakV5Y?si=zBtPOKlWdXRBuwSF"
          title="YouTube video"
          allowFullScreen
        ></iframe>
      </div>
      <hr />
      <a
  href="https://www.youtube.com/@raj._angel"
  target="_blank"
  rel="noopener noreferrer"
  className="btn btn-danger btn-lg"
>
  📺 Subscribe on YouTube
</a>
    </div>
    </div>
  )
}

export default UserHome
