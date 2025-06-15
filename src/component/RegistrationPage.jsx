import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegistrationPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/auth", { withCredentials: true });
        const user = res.data;

        if (user.__t === "Student") {
          navigate("/Login/StudentHomePage");
        } else if (user.__t === "Faculty") {
          navigate("/Login/FacultyHome");
        } else if (user.__t === "HOD") {
          navigate("/Login/HODHome");
        } else if (user.__t === "Principal") {
          navigate("/Login/PrincipalHome");
        }
      } catch (err) {
        console.log("User not authenticated yet.");
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <>
      <div className="list-group container">
        <a href="/Registration/StudentRegistration" className="list-group-item list-group-item-action">
          <div className="d-flex w-100 justify-content-center text-center">
            <h5 className="mb-1">Student Registration</h5>
          </div>
          <p className="mb-1 text-center">Some placeholder content in a paragraph.</p>
        </a>
        <a href="/Registration/FacultyRegistration" className="list-group-item list-group-item-action">
          <div className="d-flex w-100 justify-content-center">
            <h5 className="mb-1">Faculty/HOD Registration</h5>
          </div>
          <p className="mb-1 text-center">Some placeholder content in a paragraph.</p>
        </a>
        <a href="/Registration/AdminstrationRegistration" className="list-group-item list-group-item-action">
          <div className="d-flex w-100 justify-content-center">
            <h5 className="mb-1">Admin Registration</h5>
          </div>
          <p className="mb-1 text-center">Some placeholder content in a paragraph.</p>
        </a>
      </div>
    </>
  );
}

export default RegistrationPage;
