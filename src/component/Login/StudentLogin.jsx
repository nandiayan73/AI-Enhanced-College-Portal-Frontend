import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { GiConsoleController } from 'react-icons/gi';

function LoginPage() {
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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/user/login', {
        email,
        password
      }, {
        withCredentials: true // allow cookies (token)
      });

      const user = res.data.user;

      // Make sure the role is Student
      console.log(user);
      if (user.role !== "Student") {
        return setError("Only students can log in from this page.");
      }
      alert("Login successful");
      navigate('/login/StudentHomePage');
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div className="card p-4" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Student Login</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>

          <div className="text-center">
            <span className="text-muted">New User? </span>
            <Link to="/Registration/StudentRegistration" className="text-decoration-none">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
