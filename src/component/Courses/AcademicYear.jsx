import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BookOpenIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

const AcademicYearSubjects = () => {
  const { id, session } = useParams(); // academicYear ID and session
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    subjectName: "",
    subjectCode: "",
    credits: "",
    department: "",
    faculty: [],
    facultyRole: "",
  });

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/subjects/by-academicyear/${id}`);
        setSubjects(res.data);
      } catch (err) {
        console.error("Error fetching subjects:", err);
      }
    };

    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/auth", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchSubjects();
    fetchUser();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSubject = async () => {
    try {
      const payload = {
        ...form,
        academicYearId: id,
        session,
      };

      const res = await axios.post("http://localhost:3000/subjects/createsubjects", payload,{ withCredentials: true });
      alert("Subject created successfully!");
      setShowModal(false);
      setForm({
        subjectName: "",
        subjectCode: "",
        credits: "",
        department: "",
        faculty: [],
        facultyRole: "",
      });
      setSubjects((prev) => [...prev, res.data.data]);
    } catch (err) {
      console.error("Error creating subject:", err);
      alert(err.response?.data?.message || "Something went wrong!");
    }
  };

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-6 font-sans">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-indigo-800">Subjects</h1>

        {(user?.__t === "HOD" || user?.__t === "Principal") && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg shadow"
          >
            <PlusIcon className="h-5 w-5" />
            Create Subject
          </button>
        )}
      </div>

      {/* Grid of Subjects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {subjects
          .filter((subject) => {
            if (user?.__t === "Student" || user?.__t === "Faculty") {
              return subject.department === user.department;
            }
            return true; // HoD and Principal see all
          })
          .map((subject) => {
            const subjectSlug = slugify(subject.subjectName);
            return (
              <div
                key={subject._id}
                onClick={() => navigate(`/${subjectSlug}/${subject._id}`)}
                className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-indigo-300 transition-all duration-300 p-6 flex flex-col gap-3 border border-indigo-100 transform hover:-translate-y-1 hover:bg-indigo-50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpenIcon className="h-6 w-6 text-indigo-600" />
                    <h3 className="text-xl font-semibold text-indigo-700">
                      {subject.subjectName}
                    </h3>
                  </div>
                  <span className="bg-indigo-100 text-indigo-700 text-sm px-2 py-1 rounded-full font-medium">
                    {subject.credits} credits
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Code:</span> {subject.subjectCode}
                </p>
                <div className="mt-2">
                  <span className="inline-block bg-indigo-200 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {subject.department}
                  </span>
                </div>
              </div>
            );
          })}
      </div>

      {subjects.length === 0 && (
        <div className="mt-16 text-center text-gray-500 text-lg">
          No subjects found for this academic year.
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white animate-fadeInUp p-6 rounded-2xl shadow-2xl w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
              onClick={() => setShowModal(false)}
            >
              <XMarkIcon className="h-5 w-5" />
            </button>

            <h2 className="text-2xl font-semibold text-indigo-700 mb-6 text-center">
              Create New Subject
            </h2>

            <div className="space-y-5">
              <input
                type="text"
                name="subjectName"
                placeholder="Subject Name"
                value={form.subjectName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              />
              <input
                type="text"
                name="subjectCode"
                placeholder="Subject Code"
                value={form.subjectCode}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              />
              <input
                type="number"
                name="credits"
                placeholder="Credits"
                value={form.credits}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              />

              {/* Department dropdown */}
              <select
                name="department"
                value={form.department}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-white text-gray-700"
              >
                <option value="" disabled>Select Department</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="ME">ME</option>
                <option value="EEE">EEE</option>
              </select>
            </div>

            <button
              onClick={handleCreateSubject}
              className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicYearSubjects;
