import React from 'react'

const Info = () => {
  return (
    <div className="container-fluid">
        <div className="about">
            <h4>About us</h4>
            <ul>
                
                <li>This platform is developed by two MCA Students. <br />
                 Raj Kumar(MCA student at BHU) and Mahtab Alam(MCA student at Anurag University, Hyderabad). <br />
                <ol>
                    <li>Subject Matter Expert and Content Creater: Mahtab Alam</li>
                    <ul>
                        <b>Responsibilities:</b>
                        <li>Create new questions</li>
                        <li>Solving the Question using internet or books and writing the solution</li>
                        <li>Testing the project</li>
                    </ul>
                    <li>Full Stack Developer: Raj Kumar</li>
                    <ul>
                        <b>Responsibilities:</b>
                        <li>Managing the authentication system, student dashboard, 
                            test interface, admin dashboard, Backend APIs, Database, Deployment, etc.</li>

                    </ul>
                    
                </ol>
                </li>
                <li>This platform is designed for GATE Computer Science Engineering exam preparation. Students can take mock tests, analyze performance, improve weak subjects, and experience a real exam environment.</li>
                <li>We have a team for managing this project.</li>
                <li>Your small contribution makes this test series free. <a href="https://upilinks.in/payment-link/upi1247705275" target='_blank' rel="noreferrer" >Click to contribute</a>  </li>
            </ul>
        </div>
        <hr />
        {/* Contact Info */}
        <h4>Contact us</h4>
            <ul>
                <li>Address: Dumraon, Buxar, Bihar, 802119</li>
                <li >Mail us : <a href="mailto:rajkumar.cs.2025@bhu.ac.in">rajkumar.cs.2025@bhu.ac.in</a></li>
                <li>Call: <a href="tel:+918207644020">+91 8207644020</a></li>
            </ul>
        <h4>Connect with us</h4>
        <div class="connect-section d-flex justify-content-center gap-4 mt-4">

  <a href="https://t.me/c_programming_language1" rel="noreferrer" target="_blank">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaAFxpi9LR19aEycVcxzOtz5PlsQaS5YNRyg&s" alt="Telegram" width="50" />
  </a>

  <a href="https://youtube.com/@raj._angel" rel="noreferrer" target="_blank">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSib0Gamq_4cGDz-YDg8067CPA6L3IhqYMzhw&s" alt="YouTube" width="50"/>
  </a>

  <a href="https://linkedin.com/in/rajangel" rel="noreferrer" target="_blank">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0bGEl9v47XieEtHyj0TqTr1tOXJmib-KHtw&s" alt="LinkedIn" width="50"/>
  </a>

  <a href="https://github.com/rajangel01" rel="noreferrer" target="_blank">
    <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" width="50"/>
  </a>
  <a href="https://instagram.com/raj._angel" rel="noreferrer" target="_blank">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuH7c5cLpGehi0b4iQk90fXUzC9p7Ebla13w&s" alt="Instagram" width="50" />
  </a>

</div>
        <hr />
        {/* Important Links  and all social media link*/}
        <h4>Links</h4>
        <ol>
            <li>Join our Telegram Group to keep yourself updated about upcoming test series.( <a href="https://t.me/c_programming_language1">Join now</a> )</li>
            <li>Join our WhatsApp Group to keep yourself updated about upcoming test series.( <a href="https://chat.whatsapp.com/DWqT6jZXZkvGWP0U8mLrzd">Join now</a> )</li>
            <li>Discussion group.( <a href="https://t.me/c_programming_language1">Join now</a> )</li>
        </ol>
        <hr />
        <h4>Why you should choose us?</h4>
        <ul>
          <li>Practice with real exam level tests + detailed analysis.</li>
          <li>Smart performance analysis</li>
          <li>Exam level Questions</li>
          <li>Attempting test series feels like you are in the exam right now</li>
          <li>Real Exam timer</li>
          <li>Rank and Leaderboard support</li>
          <li>Per day only 1 mock test</li>
        </ul>
        <hr />
        {/* Address  */}
        {/* Copyright  */}
        <h4 className='text-center'>Copyright</h4>
        <p className='text-center'>© 2026 GateProCS. All rights reserved.</p>
    </div>
  )
}

export default Info
