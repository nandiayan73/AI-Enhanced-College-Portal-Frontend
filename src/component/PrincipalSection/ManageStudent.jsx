import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ManageStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/Student", {
        withCredentials: true,
      });
      setStudents(res.data);
      console.log(res.data);
    } catch (err) {
      toast.error("Failed to fetch students.");
    }
  };

  const removeStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Student?")) return;

    try {
      await axios.delete(`http://localhost:3000/user/delete/${id}`, {
        withCredentials: true,
      });
      toast.success("Student removed successfully.");
      setStudents((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      toast.error("Failed to remove Student.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Manage Students</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {students.map((student) => (
          <div key={student._id} className="bg-white shadow rounded p-4 relative">
            <img
              src={student.photo}
              alt={student.name}
              className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
            />
            <h3 className="text-lg font-semibold text-center">{student.name}</h3>
            <p className="text-center text-gray-600">{student.email}</p>
            <p className="text-center text-gray-500 text-sm">Dept: {student.department}</p>
            <p className="text-center text-gray-400 text-xs italic">
              Academic Year: {student.academicYear?.year || "N/A"}
            </p>

            <button
              onClick={() => removeStudent(student._id)}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded w-full"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageStudents;
