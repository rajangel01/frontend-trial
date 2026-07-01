import React from "react";
import { useState, useEffect } from "react";

const Info = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    fetch("https://gateprocs.vercel.app/total-questions")
      .then((res) => res.json())
      .then((data) => {
        setTotalQuestions(data.totalQuestions);
      });
  }, []);

  useEffect(() => {
    fetch("https://gateprocs.vercel.app/total-users")
      .then((res) => res.json())
      .then((data) => {
        setTotalUsers(data.totalUsers);
      });
  }, []);
  return (
    <div className="containerer py-5">
      <div className="bg-primary text-white rounded-4 p-5 text-center shadow-lg mb-5">
        <h1 className="fw-bold">GateProCS</h1>
        <p className="lead">
          India's Modern GATE Computer Science Test Series Platform
        </p>

        <div className="row mt-4">
          <div className="col-md-6">
            <div className="bg-white text-dark rounded-3 p-3 shadow-sm">
              <h2 className="fw-bold">{totalUsers}+</h2>
              <p className="mb-0">Registered Students</p>
            </div>
          </div>

          <div className="col-md-6 mt-3 mt-md-0">
            <div className="bg-white text-dark rounded-3 p-3 shadow-sm">
              <h2 className="fw-bold">{totalQuestions}+</h2>
              <p className="mb-0">Practice Questions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow border-0 rounded-4 mb-5">
        <div className="card-body p-5">
          <h2 className="fw-bold text-primary mb-4">About GateProCS</h2>

          <p className="text-secondary">
            GateProCS is an online platform dedicated to helping GATE Computer
            Science aspirants prepare through high-quality mock tests,
            performance analytics, and a real exam-like experience. GateProCS is
            more than just a test series platform—it's a continuously evolving
            learning ecosystem built to help GATE Computer Science aspirants
            prepare with confidence.
          </p>

          <p className="text-secondary">
            Our goal is to make exam preparation structured, accessible, free
            and effective for every student.
          </p>
          <br />
          <br />

          {/* <h2 className="fw-bold text-primary mb-4">
            <i class="fa-solid fa-laptop-code"></i> {" "}
             About the Developer
          </h2> */}
          <div className="d-flex align-items-center mb-4">
            <div
              className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center me-3"
              style={{ width: "55px", height: "55px" }}
            >
              <i className="fa-solid fa-laptop-code fs-4"></i>
            </div>

            <div>
              <h2 className="fw-bold mb-0 text-dark">About the Developer</h2>
              <small className="text-muted">
                Meet the creator of GateProCS
              </small>
            </div>
          </div>

          <p>
            Hi, I'm <strong>Raj Kumar</strong>, Founder & Full Stack Developer
            of GateProCS.
          </p>

          <p>
            I independently designed and developed this platform including the
            frontend, backend, authentication system, database, test engine,
            performance analytics, deployment, and administration panel.
          </p>
          <br />
          <br />
          <h2 className="fw-bold text-primary mb-4">Our Team</h2>

          <p>
            Our team works continuously to ensure the platform remains reliable,
            up-to-date, and useful for every student. We are responsible for:
          </p>

          <ul>
            <li>Developing and maintaining the platform</li>
            <li>Adding and reviewing new GATE questions</li>
            <li>Publishing important announcements and notifications</li>
            <li>Monitoring user feedback and improving the platform</li>
            <li>Fixing bugs and introducing new features</li>
            <li>Managing the question database and test content</li>
            <li>Enhancing the overall user experience</li>
          </ul>
          <br />
          <br />
          <br />

          <h3 className="fw-bold text-primary mb-4">Team Members</h3>
          <div className="row g-4 mt-3">
            {/* Founder */}
            <div className="col-lg-6">
              <div className="card border-0 shadow-lg h-100 rounded-4">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center me-3"
                      style={{ width: "65px", height: "65px" }}
                    >
                      <i className="fa-solid fa-user-tie fs-3"></i>
                    </div>

                    <div>
                      <h4 className="fw-bold mb-0">Raj Kumar</h4>
                      <span className="badge bg-primary mt-2">
                        Founder & Full-Stack Developer
                      </span>
                    </div>
                  </div>

                  <hr />

                  <p className="text-muted mb-0">
                    Responsible for the complete design, development,
                    deployment, maintenance, and continuous improvement of the{" "}
                    <b>GateProCS </b>
                    platform. This includes the frontend, backend,
                    authentication, database, APIs, performance analytics, and
                    overall system architecture.
                  </p>
                </div>
              </div>
            </div>

            {/* Content Contributor */}
            <div className="col-lg-6">
              <div className="card border-0 shadow-lg h-100 rounded-4">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="bg-success text-white rounded-circle d-flex justify-content-center align-items-center me-3"
                      style={{ width: "65px", height: "65px" }}
                    >
                      <i className="fa-solid fa-user fs-3"></i>
                    </div>

                    <div>
                      <h4 className="fw-bold mb-0">Mahtab Alam</h4>
                      <span className="badge bg-success mt-2">
                        Questions & Content Contributor
                      </span>
                    </div>
                  </div>

                  <hr />

                  <p className="text-muted mb-0">
                    Responsible for creating, organizing, reviewing, and
                    maintaining high-quality GATE-level questions to ensure
                    accurate, reliable, and exam-oriented practice content for
                    students.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />

          <p>
            Our goal is to build one of the most reliable online preparation
            platforms for GATE CSE students while continuously adding Questions
            & New features to improve the learning experience.
          </p>
        </div>
      </div>

      
        
          {/* <h3 className="text-primary mb-4">
            <i class="fa-solid fa-address-card"></i>
            Contact Us
          </h3> */}
          <div className="bg-light rounded-4 p-4 shadow-sm border-start border-5 border-primary mb-4">
            <h2 className="fw-bold text-dark mb-2">
              <i className="fa-solid fa-address-card text-primary me-2"></i>
              Contact Us
            </h2>
            <p className="text-muted mb-0">
              Feel free to reach out for any queries, feedback, or collaboration
              opportunities.
            </p>
          

          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <b>
                <i class="fa-solid fa-map-pin"></i> Address
              </b>
              <br />
              Dumraon, Buxar, Bihar - 802119
            </li>

            <li className="list-group-item">
              <b>📧 Email</b>
              <br />
              <a href="mailto:rajkumar.cs.2025@bhu.ac.in">
                rajkumar.cs.2025@bhu.ac.in
              </a>
            </li>

            <li className="list-group-item">
              <b>📱 Phone</b>
              <br />
              <a href="tel:+918207644020">+91 8207644020</a>
            </li>
          </ul>
          </div>
        
      {/* </div> */}

      <h2 className="text-center fw-bold mb-4">Connect With Us</h2>

      <div className="d-flex justify-content-center flex-wrap gap-4 mb-5">
        <div className="connect-section d-flex justify-content-center gap-4 mt-4">
          <a
            href="https://t.me/c_programming_language1"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaAFxpi9LR19aEycVcxzOtz5PlsQaS5YNRyg&s"
              alt="Telegram"
              className="social-icon"
            />
          </a>

          <a
            href="https://youtube.com/@raj._angel"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSib0Gamq_4cGDz-YDg8067CPA6L3IhqYMzhw&s"
              alt="YouTube"
              className="social-icon"
            />
          </a>

          <a
            href="https://linkedin.com/in/rajangel"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0bGEl9v47XieEtHyj0TqTr1tOXJmib-KHtw&s"
              alt="LinkedIn"
              className="social-icon"
            />
          </a>

          <a
            href="https://github.com/rajangel01"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="GitHub"
              className="social-icon"
            />
          </a>

          <a
            href="https://instagram.com/raj._angel"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuH7c5cLpGehi0b4iQk90fXUzC9p7Ebla13w&s"
              alt="Instagram"
              className="social-icon"
            />
          </a>
        </div>
      </div>

      <div className="card shadow border-0 rounded-4 mb-5">
        <div className="card-body">
          <h3 className="text-primary">🔗 Important Links</h3>

          <div className="list-group">
            <a className="list-group-item list-group-item-action" href="...">
              Telegram Group
            </a>

            <a className="list-group-item list-group-item-action" href="...">
              WhatsApp Group
            </a>

            <a className="list-group-item list-group-item-action" href="...">
              Discussion Group
            </a>
          </div>
        </div>
      </div>

      <div className="card shadow-lg border-0 rounded-4 my-5">
  <div className="card-body p-5">

    <div className="text-center mb-5">
      <h2 className="fw-bold text-primary">
        <i className="fa-solid fa-star me-2"></i>
        Why Choose GateProCS?
      </h2>
      <p className="text-muted mb-0">
        Everything you need to prepare for GATE CSE in one place.
      </p>
    </div>

    <div className="row">

      <div className="col-md-6">
        <ul className="list-unstyled">
          <li className="mb-4">
            <i className="fa-solid fa-circle-check text-success me-3 fs-5"></i>
            <strong>Exam-Level Questions</strong><br />
            <small className="text-muted">
              Carefully designed questions following the latest GATE pattern.
            </small>
          </li>

          <li className="mb-4">
            <i className="fa-solid fa-chart-line text-primary me-3 fs-5"></i>
            <strong>Smart Performance Analytics</strong><br />
            <small className="text-muted">
              Analyze accuracy, speed and subject-wise performance.
            </small>
          </li>

          <li className="mb-4">
            <i className="fa-solid fa-book text-danger me-3 fs-5"></i>
            <strong>Previous Year Questions</strong><br />
            <small className="text-muted">
              Practice GATE PYQs with detailed solutions.
            </small>
          </li>
        </ul>
      </div>

      <div className="col-md-6">
        <ul className="list-unstyled">
          <li className="mb-4">
            <i className="fa-solid fa-ranking-star text-warning me-3 fs-5"></i>
            <strong>Leaderboard</strong><br />
            <small className="text-muted">
              Compare your performance with other aspirants.
            </small>
          </li>

          <li className="mb-4">
            <i className="fa-solid fa-clock text-info me-3 fs-5"></i>
            <strong>Real Exam Experience</strong><br />
            <small className="text-muted">
              Same timer and interface as the actual GATE exam.
            </small>
          </li>

          
        </ul>
      </div>

    </div>

  </div>
</div>

      <footer className="bg-dark text-white rounded-4 p-4 mt-5">
        <div className="text-center">
          <h5 className="fw-bold">GateProCS</h5>

          <p className="mb-1">Helping GATE CSE Aspirants Prepare Smarter.</p>

          <small>© 2026 GateProCS. All Rights Reserved.</small>
        </div>
      </footer>
    </div>
  );
};

export default Info;
