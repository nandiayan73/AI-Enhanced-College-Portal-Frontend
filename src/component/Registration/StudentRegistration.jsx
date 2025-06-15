import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StudentRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    regNo: '',
    rollNo: '',
    email: '',
    mobile: '',
    department: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    password: '',
    confirmPassword: '',
    session: '',
    year: '', // manually entered year (1 to 4)
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
      firstName, lastName, email, password, confirmPassword,
      department, regNo, rollNo, session, year
    } = formData;

    if (password !== confirmPassword) {
      return alert("Passwords do not match.");
    }

    if (!session) {
      return alert("Please select session.");
    }

    if (!["1", "2", "3", "4"].includes(year)) {
      return alert("Year must be between 1 and 4.");
    }

    try {
      const res = await axios.post("http://localhost:3000/user/register", {
        name: `${firstName} ${lastName}`,
        email,
        password,
        role: "Student",
        department,
        regNo,
        rollNo,
        session,
        year: parseInt(year),
      });

      alert(res.data.message || "Student registered successfully.");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className='container mt-5'>
      <h5>Student Registration Page</h5>

      <form className="row g-3 mt-3" onSubmit={handleSubmit}>
        {/* Basic Info */}
        <div className="col-md-6">
          <label className="form-label">First Name</label>
          <input type="text" className="form-control" name="firstName" onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Last Name</label>
          <input type="text" className="form-control" name="lastName" onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Gender</label>
          <select className="form-select" name="gender" onChange={handleChange} required>
            <option value="">Select Your Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Date of Birth</label>
          <input type="date" className="form-control" name="dob" onChange={handleChange} required />
        </div>

        {/* University Info */}
        <div className="col-md-6">
          <label className="form-label">University Registration Number</label>
          <input type="text" className="form-control" name="regNo" onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">University Roll Number</label>
          <input type="text" className="form-control" name="rollNo" onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Mobile Number</label>
          <input type="text" className="form-control" name="mobile" onChange={handleChange} required />
        </div>

        {/* Department and Session */}
        <div className="col-md-6">
          <label className="form-label">Department</label>
          <select className="form-select" name="department" onChange={handleChange} required>
            <option value="">Select Your Department</option>
            <option>CSE</option>
            <option>ECE</option>
            <option>EEE</option>
            <option>ME</option>
            <option>CE</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Session (e.g., 2023-24)</label>
          <select className="form-select" name="session" onChange={handleChange} required>
            <option value="">Select Session</option>
            <option>2024-25</option>
            <option>2025-26</option>
            <option>2026-27</option>
            <option>2027-28</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Year (1 to 4)</label>
          <select className="form-select" name="year" onChange={handleChange} required>
            <option value="">Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </div>

        {/* Address */}
        <div className="col-md-12">
          <label className="form-label">Address</label>
          <input type="text" className="form-control" name="address" onChange={handleChange} placeholder="1234 Main St" required />
        </div>
        <div className="col-md-6">
          <label className="form-label">City</label>
          <input type="text" className="form-control" name="city" onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <label className="form-label">State</label>
          <input type="text" className="form-control" name="state" onChange={handleChange} required />
        </div>
        <div className="col-md-2">
          <label className="form-label">Zip</label>
          <input type="text" className="form-control" name="zip" onChange={handleChange} required />
        </div>

        {/* Password */}
        <div className="col-md-6">
          <label className="form-label">Set Password</label>
          <input type="password" className="form-control" name="password" onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name="confirmPassword" onChange={handleChange} required />
        </div>

        {/* Submit */}
        <div className="col-md-12 d-flex justify-content-center mb-4">
          <button type="submit" className="btn btn-primary" style={{ width: "150px" }}>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default StudentRegistration;
