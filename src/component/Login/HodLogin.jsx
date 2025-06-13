import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function HODLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/user/login',
        { email, password },
        { withCredentials: true }
      );

      const user = response.data.user;

      // Check if the user is HOD
      if (user && user.__t === 'HOD') {
        alert('Login successful!');
        navigate('/HODHome');
      } else {
        setError('Access denied: Not a HOD.');
      }

    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Login failed. Please try again later.');
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-10">
      <div className="card p-4" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">HOD Login</h2>

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
            <Link to="/Registration/FacultyRegistration" className="text-decoration-none">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HODLogin;
