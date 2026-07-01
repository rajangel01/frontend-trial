import { Link } from "react-router-dom";

export default function AuthPage() {
  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center"
      style={{
        background:
          "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
      }}
    >
      <div className="container-fluid">

        <div className="row justify-content-center">

          <div className="col-lg-11">

            <div
              className="card border-0 shadow-lg overflow-hidden"
              style={{
                borderRadius: "25px",
                background: "rgba(255,255,255,.08)",
                backdropFilter: "blur(20px)"
              }}
            >

              <div className="row g-0">

                {/* Left */}

                <div className="col-lg-6 p-5 text-white d-flex flex-column justify-content-center">

                  <h6 className="text-info fw-bold mb-3">
                    GATEProCS
                  </h6>

                  <h1
                    className="fw-bold mb-4"
                    style={{ fontSize: "55px" }}
                  >
                    Welcome Back
                  </h1>

                  <p
                    className="text-light"
                    style={{
                      fontSize: "18px",
                      lineHeight: "32px"
                    }}
                  >
                    India's Modern GATE Preparation Platform.

                    Practice thousands of previous year questions,
                    monitor your progress, compete on leaderboard,
                    analyze your performance and crack GATE with
                    confidence.
                  </p>

                  <div className="mt-5">

                    <div className="d-flex mb-3">

                      <div
                        className="bg-success rounded-circle d-flex justify-content-center align-items-center"
                        style={{
                          width: 45,
                          height: 45
                        }}
                      >
                        <i className="fa-solid fa-lock"></i>
                      </div>

                      <div className="ms-3">

                        <h5>Secure Authentication</h5>

                        <small>
                          OTP Based Login System
                        </small>

                      </div>

                    </div>

                    <div className="d-flex mb-3">

                      <div
                        className="bg-warning rounded-circle d-flex justify-content-center align-items-center"
                        style={{
                          width: 45,
                          height: 45
                        }}
                      >
                        <i className="fa-solid fa-user-check"></i>
                      </div>

                      <div className="ms-3">

                        <h5>Verified Users</h5>

                        <small>
                          Safe and trusted environment
                        </small>

                      </div>

                    </div>

                    <div className="d-flex">

                      <div
                        className="bg-danger rounded-circle d-flex justify-content-center align-items-center"
                        style={{
                          width: 45,
                          height: 45
                        }}
                      >
                        <i className="fa-solid fa-chart-line"></i>
                      </div>

                      <div className="ms-3">

                        <h5>Track Progress</h5>

                        <small>
                          Personalized dashboard
                        </small>

                      </div>

                    </div>

                  </div>

                </div>

                {/* Right */}

                <div
                  className="col-lg-6 bg-white d-flex align-items-center justify-content-center"
                >

                  <div className="p-5 w-100">

                    <div className="text-center mb-5">

                      <div
                        className="rounded-circle bg-primary text-white d-inline-flex justify-content-center align-items-center mb-4"
                        style={{
                          width: 90,
                          height: 90,
                          fontSize: "35px"
                        }}
                      >
                        <i className="fa-solid fa-user"></i>
                      </div>

                      <h2 className="fw-bold">
                        Authentication
                      </h2>

                      <p className="text-muted">
                        Login or create a new account
                      </p>

                    </div>

                    <Link
                      to="/login"
                      className="btn btn-primary btn-lg w-100 mb-4 py-3 fw-bold"
                    >
                      <i className="fa-solid fa-right-to-bracket me-2"></i>

                      Login
                    </Link>

                    <Link
                      to="/signup"
                      className="btn btn-outline-primary btn-lg w-100 py-3 fw-bold"
                    >
                      <i className="fa-solid fa-user-plus me-2"></i>

                      Create Account
                    </Link>

                    <div className="text-center mt-5">

                      <small className="text-muted">
                        By continuing you agree to our
                        Terms & Privacy Policy
                      </small>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}