import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AcademicYearDashboard = () => {
  const [academicYears, setAcademicYears] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [yearInput, setYearInput] = useState("");
  const [sessionInput, setSessionInput] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [formattedSession, setFormattedSession] = useState("");
  const [showUpdateSessionModal, setShowUpdateSessionModal] = useState(false);
  const [newSessionInput, setNewSessionInput] = useState("");
  const [updateSessionError, setUpdateSessionError] = useState("");
  const [updateSessionMsg, setUpdateSessionMsg] = useState("");
  const navigate = useNavigate();

  // Check auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/auth", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        console.error("Auth check failed:", err);
        navigate("/");
      }
    };
    checkAuth();
  }, []);

  // Fetch session from college singleton
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get("http://localhost:3000/college/session");
        setFormattedSession(res.data.session);
        console.log(res.data.session);
      } catch (err) {
        console.error("Failed to fetch session:", err);
      }
    };
    fetchSession();
  }, []);

  // Fetch academic years only after session is available
  useEffect(() => {
    if (!formattedSession) return;

    const fetchYears = async () => {
      try {
        const res = await axios.get("http://localhost:3000/allacademyyear", {
          params: { session: formattedSession },
        });
        setAcademicYears(res.data);
      } catch (err) {
        console.error("Failed to fetch academic years:", err);
      }
    };
    fetchYears();
  }, [formattedSession]);

  const handleYearClick = (year) => {
    navigate(`/academicyear/${year._id}/${year.session}`);
  };

  const handleCreateYear = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/user/createacademicyear",
        { year: yearInput, session: sessionInput },
        { withCredentials: true }
      );
      alert(response.data.message);
      setShowModal(false);
      setYearInput("");
      setSessionInput("");
      setAcademicYears((prev) => [...prev, response.data.data]);
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  const handleUpdateSession = async () => {
    try {
      const res = await axios.post("http://localhost:3000/college/updatesession", {
        session: newSessionInput,
      });
      setFormattedSession(newSessionInput);
      setUpdateSessionMsg("Session updated successfully.");
      setUpdateSessionError("");
      setTimeout(() => {
        setShowUpdateSessionModal(false);
        setUpdateSessionMsg("");
        setNewSessionInput("");
      }, 1500);
    } catch (err) {
      console.error(err);
      setUpdateSessionError(
        err.response?.data?.message || "Failed to update session."
      );
      setUpdateSessionMsg("");
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold text-indigo-800">Academic Dashboard</h2>
        <div className="text-md font-semibold bg-indigo-100 text-indigo-800 px-4 py-2 rounded-lg shadow-md">
          Session: {formattedSession.replace("-", "–")}
        </div>
      </div>

      {/* Conditional Create Button */}
      {user?.__t === "Principal" && (
        <div className="mb-6">
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition"
          >
            + Create New Academic Year
          </button>
        </div>
      )}

      {/* Academic Year Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {academicYears.map((year) => (
          <div
            key={year._id}
            onClick={() => handleYearClick(year)}
            className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col items-center transition-transform transform hover:scale-105 border border-indigo-100 hover:border-indigo-300"
          >
            <div className="text-5xl font-bold text-indigo-700 mb-2">{year.year}</div>
            <p className="text-gray-600 text-lg">Year {year.year}</p>
            <span className="mt-2 text-sm text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
              Session: {year.session}
            </span>
          </div>
        ))}
      </div>

      {academicYears.length === 0 && formattedSession && (
        <div className="text-center mt-12 text-gray-500 text-lg">
          No academic years found for session {formattedSession}.
        </div>
      )}

      {/* Update Session Button */}
      {user?.__t === "Principal" && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setShowUpdateSessionModal(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg shadow-md transition"
          >
            Complete the Current Session
          </button>
        </div>
      )}

      {/* Create Academic Year Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h3 className="text-xl font-bold mb-4 text-indigo-800">Create Academic Year</h3>

            {error && <div className="text-red-600 text-sm mb-2">{error}</div>}

            <input
              type="number"
              placeholder="Year (1-4)"
              className="w-full mb-3 p-2 border rounded-md"
              value={yearInput}
              onChange={(e) => setYearInput(e.target.value)}
            />

            <input
              type="text"
              placeholder="Session (YYYY-YY)"
              className="w-full mb-3 p-2 border rounded-md"
              value={sessionInput}
              onChange={(e) => setSessionInput(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateYear}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Session Modal */}
      {showUpdateSessionModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h3 className="text-xl font-bold mb-4 text-emerald-800">Update College Session</h3>

            {updateSessionMsg && (
              <div className="text-green-600 text-sm mb-2">{updateSessionMsg}</div>
            )}
            {updateSessionError && (
              <div className="text-red-600 text-sm mb-2">{updateSessionError}</div>
            )}

            <input
              type="text"
              placeholder="New Session (e.g., 2025-26)"
              className="w-full mb-3 p-2 border rounded-md"
              value={newSessionInput}
              onChange={(e) => setNewSessionInput(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowUpdateSessionModal(false);
                  setUpdateSessionError("");
                  setUpdateSessionMsg("");
                  setNewSessionInput("");
                }}
                className="text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateSession}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicYearDashboard;
