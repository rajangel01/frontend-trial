import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Tests = () => {
  const [attempted, setAttempted] = useState(false);
  const today = new Date();

  const formattedDate = `${today.getDate()}${today.toLocaleString("default", {
    month: "long",
  })}${today.getFullYear()}`;
  const userData = JSON.parse(localStorage.getItem("isLoggedIn"));
  const userId = userData.userId;
  const testId = formattedDate;

  useEffect(() => {
    handleCheckSubmit();
  }, []);

  const handleCheckSubmit = async () => {
    try {
      const res = await fetch(
        "https://gateprocs.vercel.app/find-users-todays-test",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            testId,
          }),
        },
      );

      const data = await res.json();

      if (data.userId) {
        setAttempted(true);
      } else {
        setAttempted(false);
      }
    } catch (err) {
      alert(err.message);
    }
  };
  // console.log(handleCheckSubmit)

  return (
    <div className="container-fluid">
      <h3>Today's Test</h3>
      <div className="d-flex flex-wrap gap-3 p-3">
        <div className="container">
          <div className="image img-fluid">
            <img
              src="https://res.cloudinary.com/drpeeigze/image/upload/v1779894490/testfrontimage_ymyr6q.png"
              alt=""
              className="img-fluid"
            />
          </div>
          <div className="text">
            <h5>{formattedDate} || Computer Science</h5>
          </div>
          {attempted ? (
            <Link to="/result">
              <button className="btn btn-success">Result</button>
            </Link>
          ) : (
            <Link to="/testinterface">
              <button className="btn btn-success">Attempt Now</button>
            </Link>
          )}
        </div>
        {/* <Link to='/result'>Result</Link> */}
      </div>
    </div>
  );
};

export default Tests;
