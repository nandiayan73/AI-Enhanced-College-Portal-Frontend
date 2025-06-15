import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.min.css";

function FacultyHome() {
  const navigate = useNavigate();
  const [facultyData, setFacultyData] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/auth", {
          withCredentials: true,
        });

        if (res.data.__t !== "Faculty") {
          navigate("/");
          setError("Unauthorized access");
          return;
        }

        setFacultyData(res.data);

        const subjectRes = await axios.get(
          `http://localhost:3000/subjects/by-faculty/${res.data._id}`,
          { withCredentials: true }
        );
        setSubjects(subjectRes.data);
      } catch (err) {
        setError("Session expired or unauthorized");
        console.error(err);
      }
    };

    fetchFacultyData();
  }, []);

  const postDetails = async (pic) => {
    console.log("ehhe");
    setLoading(true);
    if (!pic) {
      toast.warning("Please Select an Image");
      setLoading(false);
      return;
    }

    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "my_chat-app");
      data.append("cloud_name", "djmmkgei0");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/djmmkgei0/image/upload",
          {
            method: "post",
            body: data,
          }
        );

        const info = await response.json();

        await axios.post(
          "http://localhost:3000/faculty/updatephoto",
          { photo: info.url.toString() ,id:facultyData._id},
          { withCredentials: true }
        );

        setFacultyData((prev) => ({
          ...prev,
          photo: info.url.toString(),
        }));

        toast.success("Photo updated!");
      } catch (err) {
        console.error(err);
        toast.error("Image upload failed");
      } finally {
        setLoading(false);
      }
    } else {
      toast.warning(`${pic.type} is not supported`);
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">{error}</div>
      </div>
    );
  }

  if (!facultyData) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p>Loading faculty information...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 mb-5 text-center">
        <h2 className="mb-3">Welcome, {facultyData.name}</h2>

        <div className="position-relative d-inline-block mb-3">
          <center>
            <img
              src={facultyData.photo}
              alt="Faculty"
              className="rounded-circle"
              style={{
                width: "140px",
                height: "140px",
                objectFit: "cover",
                border: "3px solid #007bff",
              }}
            />
          </center>

        <label
          htmlFor="upload-photo"
          className="position-absolute top-50 start-50"
          style={{
            transform: "translate(-50%, -0%)", // Adjust this Y value to move down
            backgroundColor: "rgba(0,0,0,0.6)",
            borderRadius: "50%",
            padding: "10px",
            cursor: "pointer",
          }}
        >
        <i className="fas fa-camera text-white"></i>
      </label>

          <input
            type="file"
            id="upload-photo"
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
            style={{ display: "none" }}
            disabled={loading}
          />
        </div>

        <p><strong>Email:</strong> {facultyData.email}</p>
        <p><strong>Department:</strong> {facultyData.department}</p>
        <p><strong>Designation:</strong> {facultyData.designation}</p>
      </div>

      <div className="card shadow p-4">
        <h4 className="mb-3">Subjects Assigned</h4>
        {subjects.length === 0 ? (
          <p className="text-muted">No subjects assigned yet.</p>
        ) : (
          <ul className="list-group">
            {subjects.map((subject) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={subject._id}
              >
                <span>
                  <strong>{subject.subjectName}</strong> ({subject.subjectCode})
                </span>
                <span className="badge bg-secondary">
                  Credits: {subject.credits}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default FacultyHome;
