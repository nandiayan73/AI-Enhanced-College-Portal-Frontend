import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationBar from './NavigationBar';
import Notifications from './Notifications';
import StudentProfile from './StudentProfile';

const StudentHomePage = () => {
  const [student, setStudent] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [notices, setNotices] = useState([]);
  const [year, setYear] = useState();
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authRes = await axios.get("http://localhost:3000/user/auth", {
          withCredentials: true,
        });
        if (authRes.data.__t !== "Student") {
          navigate("/");
          setError("Unauthorized access");
          return;
        }

        const studentData = authRes.data;
        setStudent(studentData);

        const subjectsRes = await axios.post("http://localhost:3000/student/allsubjects", {
          studentId: studentData._id,
        });
        setSubjects(subjectsRes.data.subjects);
        setYear(subjectsRes.data.academicYear.year);

        const noticeRes = await axios.get("http://localhost:3000/notice/getnotices");
        setNotices(noticeRes.data);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchData();
  }, []);

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  if (!student) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col font-sans text-gray-800 mt-3">
      <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-xl">
        <div className="container mt-1 mx-auto flex flex-col md:flex-row justify-between items-center">
          <h3 className="text-4xl font-extrabold mb-4 md:mb-0 text-center md:text-left drop-shadow-md">
            Student's Dashboard
          </h3>
        </div>
      </header>

      <div className="flex flex-1 flex-col lg:flex-row">
        <div className="w-m p-4 md:p-6 flex flex-col gap-3">
          <StudentProfile student={student} />
          {/* <NavigationBar onNavigate={handleNavigate} /> */}
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
                      {subject.faculty && (
                        <p><strong>Faculty:</strong> {subject.faculty.name}</p>
                      )}
                    </div>
                  </div>
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
