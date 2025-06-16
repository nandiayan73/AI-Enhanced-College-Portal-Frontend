import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ManageHODs() {
  const [hods, setHods] = useState([]);

  useEffect(() => {
    fetchHODs();
  }, []);

  const fetchHODs = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/HOD", {
        withCredentials: true,
      });
      setHods(res.data);
    } catch (err) {
      toast.error("Failed to fetch HODs.");
    }
  };

  const removeHOD = async (id) => {
    if (!window.confirm("Are you sure you want to delete this HOD?")) return;

    try {
      await axios.delete(`http://localhost:3000/user/delete/${id}`, {
        withCredentials: true,
      });
      toast.success("HOD removed successfully.");
      setHods((prev) => prev.filter((hod) => hod._id !== id));
    } catch (err) {
      toast.error("Failed to remove HOD.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Manage HODs</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {hods.map((hod) => (
          <div key={hod._id} className="bg-white shadow rounded p-4 relative">
            <img
              src={hod.photo}
              alt={hod.name}
              className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
            />
            <h3 className="text-lg font-semibold text-center">{hod.name}</h3>
            <p className="text-center text-gray-600">{hod.email}</p>
            <p className="text-center text-gray-500 text-sm">Dept: {hod.department}</p>

            <button
              onClick={() => removeHOD(hod._id)}
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

export default ManageHODs;
