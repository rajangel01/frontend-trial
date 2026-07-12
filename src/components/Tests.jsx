// import React from "react";
// import { Link } from "react-router-dom";
// import { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";

// const Tests = () => {
//   const [disabled, setDisabled]=useState(true);
//   const [attempted, setAttempted] = useState(false);
//   const today = new Date();
//   const navigate = useNavigate();

//   const formattedDate = `${today.getDate()}${today.toLocaleString("default", {
//     month: "long",
//   })}${today.getFullYear()}`;
//   const userData = JSON.parse(localStorage.getItem("isLoggedIn"));
//   const userId = userData.userId;
//   const testId = formattedDate;

  

//   const handleCheckSubmit = useCallback( async () => {
//     try {
//       const res = await fetch(
//         "https://gateprocs.vercel.app/find-users-todays-test",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             userId,
//             testId,
//           }),
//         },
//       );

//       const data = await res.json();

//       if (data.userId) {
//         setAttempted(true);
//       } else {
//         setAttempted(false);
//       }
//     } catch (err) {
//       alert(err.message);
//     }finally{
//       setDisabled(false);
//     }
//   }, [userId, testId]);;

//   useEffect(() => {
//     handleCheckSubmit();
//   }, [handleCheckSubmit]);
//   // console.log(handleCheckSubmit)

//   const TestInterface = ()=>{
//     navigate("/testinterface");
//     // window.location.reloaad();
//   }

//   return (
//     <div className="container-fluid">
//       <h3>Today's Test</h3>
//       <div className="d-flex flex-wrap gap-3 p-3">
//         <div className="container">
//           <div className="image img-fluid">
//             <img
//               src="https://res.cloudinary.com/drpeeigze/image/upload/v1779894490/testfrontimage_ymyr6q.png"
//               alt=""
//               className="img-fluid"
//             />
//           </div>
//           <div className="text">
//             <h5>{formattedDate} || Computer Science</h5>
//           </div>
//           {attempted ? (
//             <Link to="/result">
//               <button className="btn btn-success">Result</button>
//             </Link>
//           ) : (
//             <button className="btn btn-success" disabled={disabled} onClick={TestInterface}>{disabled?"Loading...":"Attempt Now"}</button>
            
//           )}
//         </div>
//         {/* <Link to='/result'>Result</Link> */}
//       </div>
//     </div>
//   );
// };

// export default Tests;
import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

const Tests = () => {
  const [disabled, setDisabled] = useState(true);
  const [attempted, setAttempted] = useState(false);

  const navigate = useNavigate();

  const today = new Date();
  const formattedDate = `${today.getDate()} ${today.toLocaleString("default", {
    month: "long",
  })} ${today.getFullYear()}`;

  const userData = JSON.parse(localStorage.getItem("isLoggedIn"));
  const userId = userData.userId;
  const testId = formattedDate.replace(/\s/g, "");

  const handleCheckSubmit = useCallback(async () => {
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
        }
      );

      const data = await res.json();

      if (data.userId) {
        setAttempted(true);
      } else {
        setAttempted(false);
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setDisabled(false);
    }
  }, [userId, testId]);

  useEffect(() => {
    handleCheckSubmit();
  }, [handleCheckSubmit]);

  const TestInterface = () => {
    navigate("/testinterface");
  };

  return (
    <div className="container-fluid py-4">

      <div className="text-center mb-4">
        <h2 className="fw-bold">Today's Test</h2>
        <p className=" mb-4">
          Practice daily and improve your GATE Computer Science score.
        </p>
      </div>

      <div className="row justify-content-center">

        <div className="col-lg-7 col-md-9">

          <div className="card shadow border-0 rounded-4">

            <img
              src="https://res.cloudinary.com/drpeeigze/image/upload/v1779894490/testfrontimage_ymyr6q.png"
              className="card-img-top rounded-top-4"
              alt="Today's Test"
            />

            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center mb-3">

                <div>
                  <h4 className="fw-bold mb-1">
                    Daily Mock Test
                  </h4>

                  <small className="text-muted">
                    {formattedDate}
                  </small>
                </div>

                <span className="badge bg-primary fs-6">
                  Computer Science
                </span>

              </div>

              <hr />

              <div className="row text-center mb-4">

                <div className="col">
                  <h5 className="fw-bold mb-0">65</h5>
                  <small className="text-muted">
                    Questions
                  </small>
                </div>

                <div className="col">
                  <h5 className="fw-bold mb-0">180</h5>
                  <small className="text-muted">
                    Minutes
                  </small>
                </div>

                <div className="col">
                  <h5 className="fw-bold mb-0">100</h5>
                  <small className="text-muted">
                    Marks
                  </small>
                </div>

              </div>

              {attempted ? (
                <Link to="/result" className="d-grid">
                  <button className="btn btn-primary btn-lg">
                    View Result
                  </button>
                </Link>
              ) : (
                <button
                  className="btn btn-success btn-lg w-100"
                  disabled={disabled}
                  onClick={TestInterface}
                >
                  {disabled ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Loading...
                    </>
                  ) : (
                    "Attempt Now"
                  )}
                </button>
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Tests;
