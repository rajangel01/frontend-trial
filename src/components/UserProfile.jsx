import React from 'react'

const UserProfile = () => {
  const userData = JSON.parse(
  localStorage.getItem("isLoggedIn")
);
  const user = {
    name: userData.name,
    email: userData.email,
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqf0Wx4wmsKfLYsiLdBx6H4D8bwQBurWhx5g&s",
    rank: 25,
    tests: 48,
    avgScore: 67,
    bestScore: 89,
    streak: 0,
  };
  return (
    
      <div className="container-lg mt-5">
      <div className="card shadow-lg border-0">
        <div className="card-body">

          <div className="row align-items-center">

            {/* Profile Image */}
            <div className="col-md-3 text-center">
              <img
                src={user.photo}
                alt="Profile"
                className="rounded-circle img-fluid border border-3"
                style={{ width: "150px", height: "150px" }}
              />
            </div>

            {/* User Details */}
            <div className="col-md-9">
              <h2 className="fw-bold">{user.name}</h2>
              <p className="text-muted">{user.email}</p>

              <div className="row mt-4">

                <div className="col-6 col-md-3 mb-3">
                  <div className="card text-center bg-primary text-white">
                    <div className="card-body">
                      <h4>{user.rank}</h4>
                      <small>Rank</small>
                    </div>
                  </div>
                </div>

                <div className="col-6 col-md-3 mb-3">
                  <div className="card text-center bg-success text-white">
                    <div className="card-body">
                      <h4>{user.tests}</h4>
                      <small>Tests</small>
                    </div>
                  </div>
                </div>

                <div className="col-6 col-md-3 mb-3">
                  <div className="card text-center bg-warning text-dark">
                    <div className="card-body">
                      <h4>{user.avgScore}%</h4>
                      <small>Avg Score</small>
                    </div>
                  </div>
                </div>

                <div className="col-6 col-md-3 mb-3">
                  <div className="card text-center bg-danger text-white">
                    <div className="card-body">
                      <h4>{user.bestScore}%</h4>
                      <small>Best Score</small>
                    </div>
                  </div>
                </div>

              </div>

              <div className="mt-3">
                <span className="badge bg-dark p-2 fs-6">
                  🔥 {user.streak} Days Streak
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
    
  )
}

export default UserProfile
