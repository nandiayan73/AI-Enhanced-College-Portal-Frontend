import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdministrationRegistration() {
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    collegeName: '',
    email: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      collegeName, email, mobile,
      address, city, state, zip,
      password, confirmPassword
    } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/user/register', {
        name: collegeName,
        email,
        password,
        role: 'Principal',
      });

      alert(response.data.message || "Registration successful!");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="container mt-5">
      <h5>Principal Registration Page</h5>
      <form className="row g-3 mt-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Mobile Number</label>
          <input
            type="text"
            className="form-control"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">State</label>
          <input
            type="text"
            className="form-control"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-2">
          <label className="form-label">Zip</label>
          <input
            type="text"
            className="form-control"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Set Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-12 d-flex justify-content-center mb-4">
          <button type="submit" className="btn btn-primary" style={{ width: "150px" }}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdministrationRegistration;
