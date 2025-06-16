import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ManageFaculties() {
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/Faculty", {
        withCredentials: true,
      });
      setFaculties(res.data);
    } catch (err) {
      toast.error("Failed to fetch faculties.");
    }
  };

  const removeFaculty = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Faculty?")) return;

    try {
      await axios.delete(`http://localhost:3000/user/delete/${id}`, {
        withCredentials: true,
      });
      toast.success("Faculty removed successfully.");
      setFaculties((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      toast.error("Failed to remove Faculty.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Manage Faculties</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {faculties.map((faculty) => (
          <div key={faculty._id} className="bg-white shadow rounded p-4 relative">
            <img
              src={faculty.photo}
              alt={faculty.name}
              className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
            />
            <h3 className="text-lg font-semibold text-center">{faculty.name}</h3>
            <p className="text-center text-gray-600">{faculty.email}</p>
            <p className="text-center text-gray-500 text-sm">Dept: {faculty.department}</p>
            <p className="text-center text-gray-400 text-xs italic">{faculty.designation}</p>

            <button
              onClick={() => removeFaculty(faculty._id)}
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

export default ManageFaculties;
