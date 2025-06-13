import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function FacultyRegistration() {
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    email: '',
    mobile: '',
    department: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    password: '',
    confirmPassword: '',
    role: 'Faculty',
    designation: 'Assistant Professor'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Auto-set designation if role is HOD
    if (name === 'role') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        designation: value === 'HOD' ? 'Head of Department' : 'Assistant Professor'
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      firstName, lastName, email, password,
      confirmPassword, department, role, designation
    } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/user/register", {
        name: `${firstName} ${lastName}`,
        email,
        password,
        department,
        role,
        designation
      });

      alert(res.data.message || "Registration successful.");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className='container mt-5'>
      <h5>{formData.role} Registration Page</h5>

      <form className="row g-3 mt-3" onSubmit={handleSubmit}>
        {/* Role Selector */}
        <div className="col-md-12">
          <label className="form-label">Registering As</label>
          <select className="form-select" name="role" onChange={handleChange} value={formData.role}>
            <option value="Faculty">Faculty</option>
            <option value="HOD">HOD</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">First Name</label>
          <input type="text" className="form-control" name="firstName" onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Last Name</label>
          <input type="text" className="form-control" name="lastName" onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Gender</label>
          <select className="form-select" name="gender" onChange={handleChange}>
            <option>Select Your Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Date of Birth</label>
          <input type="date" className="form-control" name="dob" onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Mobile Number</label>
          <input type="text" className="form-control" name="mobile" onChange={handleChange} />
        </div>

        <div className="col-md-12">
          <label className="form-label">Department</label>
          <select className="form-select" name="department" onChange={handleChange}>
            <option>Select Your Department</option>
            <option>CSE</option>
            <option>ECE</option>
            <option>EEE</option>
            <option>ME</option>
            <option>CE</option>
          </select>
        </div>

        <div className="col-12">
          <label className="form-label">Address</label>
          <input type="text" className="form-control" name="address" placeholder="1234 Main St" onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">City</label>
          <input type="text" className="form-control" name="city" onChange={handleChange} />
        </div>

        <div className="col-md-4">
          <label className="form-label">State</label>
          <input type="text" className="form-control" name="state" onChange={handleChange} />
        </div>

        <div className="col-md-2">
          <label className="form-label">Zip</label>
          <input type="text" className="form-control" name="zip" onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Set Password</label>
          <input type="password" className="form-control" name="password" onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name="confirmPassword" onChange={handleChange} />
        </div>

        <div className="col-md-12 d-flex justify-content-center mb-4">
          <button type="submit" className="btn btn-primary" style={{ width: "150px" }}>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default FacultyRegistration;
