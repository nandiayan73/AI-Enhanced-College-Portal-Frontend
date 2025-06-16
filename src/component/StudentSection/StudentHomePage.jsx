import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Notifications from './Notifications';
import StudentProfile from './StudentProfile';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";

const StudentHomePage = () => {
  const [student, setStudent] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [notices, setNotices] = useState([]);
  const [year, setYear] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authRes = await axios.get("http://localhost:3000/user/auth", {
          withCredentials: true,
        });
        if (authRes.data.__t !== "Student") {
          navigate("/");
          toast.error("Unauthorized access");
          return;
        }

        const studentData = authRes.data;
        setStudent(studentData);

        const subjectsRes = await axios.post("http://localhost:3000/student/allsubjects", {
          studentId: studentData._id,
        });
        setSubjects(subjectsRes.data.subjects);
        setYear(subjectsRes.data.academicYear.year);

        const noticeRes = await axios.post("http://localhost:3000/student/getnotices", {
          studentId: studentData._id,
        }, {
          withCredentials: true
        });
        setNotices(noticeRes.data.notices);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchData();
  }, []);

  const postDetails = async (pic) => {
    if (!pic) {
      toast.warning("Please select an image");
      return;
    }

    setLoading(true);
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "my_chat-app");
      data.append("cloud_name", "djmmkgei0");

      try {
        const res = await fetch("https://api.cloudinary.com/v1_1/djmmkgei0/image/upload", {
          method: "post",
          body: data,
        });
        const info = await res.json();

        await axios.post(
          "http://localhost:3000/student/update-photo",
          { photo: info.url.toString(), id: student._id },
          { withCredentials: true }
        );

        setStudent((prev) => ({
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

  if (!student) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col font-sans text-gray-800 mt-3">
      <ToastContainer position="top-right" autoClose={3000} />
      <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-xl">
        <div className="container mt-1 mx-auto flex flex-col md:flex-row justify-between items-center">
          <h3 className="text-4xl font-extrabold mb-4 md:mb-0 text-center md:text-left drop-shadow-md">
            Student's Dashboard
          </h3>
        </div>
      </header>

      <div className="flex flex-1 flex-col lg:flex-row">
        <div className="w-m p-4 md:p-6 flex flex-col gap-3">
          {/* Profile Section with Upload */}
          <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center gap-4 border border-gray-200">
            <div className="relative">
              <img
                src={student.photo}
                alt="Student"
                className="w-36 h-36 rounded-full object-cover border-4 border-indigo-300 shadow-lg"
              />
              <label
                htmlFor="upload-photo"
                className="absolute bottom-1 right-1 bg-black bg-opacity-60 p-2 rounded-full cursor-pointer"
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
            <div className="text-center">
              <h4 className="text-xl font-bold">{student.name}</h4>
              <p className="text-gray-600">{student.email}</p>
              <p className="text-sm text-gray-500">ID: {student._id}</p>
            </div>
          </div>

          <Notifications notifications={notices} />
        </div>

        <main className="flex-grow container mx-auto p-4 md:p-8">
          <h4 className="text-2xl font-bold text-gray-800 mb-2">Your Academic Year</h4>
          <p className="text-gray-600 mb-4">Hello {student.name}, here's your current year information</p>
          <p className="text-gray-600 mb-2">Branch: {student.department}</p>
          <p className="text-gray-600 mb-6">Academic Year: {year}</p>

          {/* Subjects Section */}
          <section className="mb-8">
            <h4 className="text-2xl font-bold text-gray-800 mb-4">📚 Your Subjects</h4>
            {subjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects.map((subject) => (
                  <Link to={`/${subject.subjectName}/${subject._id}`}>
                  <div
                    key={subject._id}
                    className="bg-white rounded-2xl shadow-md border border-gray-200 p-5 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="text-xl font-semibold text-indigo-700">{subject.subjectName}</h5>
                      <span className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded text-xs font-medium">
                        {subject.subjectCode}
                      </span>
                    </div>
                    <div className="text-gray-600 text-sm space-y-1">
                      <p><strong>Session:</strong> {subject.session}</p>
                    </div>
                  </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No subjects found.</p>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default StudentHomePage;
