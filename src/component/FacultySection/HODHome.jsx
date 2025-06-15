import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function HodDashboard() {
  const navigate = useNavigate();
  const [hodData, setHodData] = useState(null);
  const [pendingCandidates, setPendingCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/auth", {
          withCredentials: true,
        });

        if (res.data.__t !== "HOD") {
          navigate("/");
          setError("Unauthorized access");
          return;
        }

        setHodData(res.data);

        const pendingRes = await axios.post(
          "http://localhost:3000/user/getpendingstudents",
          { hodId: res.data._id },
          { withCredentials: true }
        );

        setPendingCandidates(pendingRes.data.students || []);
      } catch (err) {
        setError("Session expired or unauthorized");
        console.error(err);
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
          "http://localhost:3000/hod/update-photo",
          { photo: info.url.toString(), id: hodData._id },
          { withCredentials: true }
        );

        setHodData((prev) => ({
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

  const handleAccept = async (candidateId) => {
    try {
      await axios.post(
        "http://localhost:3000/user/approvestudent",
        { studentId: candidateId },
        { withCredentials: true }
      );

      setPendingCandidates((prev) => prev.filter((c) => c._id !== candidateId));
      toast.success("Candidate approved");
    } catch (err) {
      console.error(err);
      toast.error("Approval failed");
    }
  };

  const handleReject = (candidateId) => {
    setPendingCandidates((prev) => prev.filter((c) => c._id !== candidateId));
    toast.info("Candidate rejected");
    // Add actual backend rejection logic here if needed
  };

  if (error) {
    return (
      <div className="container mt-5">
        <ToastContainer />
        <div className="alert alert-danger text-center">{error}</div>
      </div>
    );
  }

  if (!hodData) {
    return (
      <div className="container mt-5 text-center">
        <ToastContainer />
        <div className="spinner-border text-primary" role="status" />
        <p>Loading HOD information...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex flex-col items-center py-10 font-sans text-gray-800">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* HOD Profile Header */}
        <div className="relative bg-gradient-to-r from-purple-700 to-indigo-800 p-8 text-white flex flex-col md:flex-row items-center justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-8">
          <div className="relative">
            <img
              src={hodData.photo}
              alt="HOD"
              className="w-36 h-36 md:w-48 md:h-48 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <label
              htmlFor="upload-photo"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 p-2 rounded-full cursor-pointer"
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
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-extrabold drop-shadow-md">{hodData.name}</h1>
            <p className="text-xl font-light opacity-90 mt-1">{hodData.department} (HOD)</p>
            <p className="text-md opacity-80 mt-1">Faculty ID: HOD{hodData.department}123</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Info */}
          <div className="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-100">
            <h3 className="text-2xl font-bold text-purple-700 mb-5 border-b pb-3 border-purple-200">
              My Information
            </h3>
            <p><strong>Email:</strong> {hodData.email}</p>
            <p><strong>Phone:</strong> 8910363144</p>
            <p><strong>Department:</strong> {hodData.department}</p>
            <p><strong>Faculty ID:</strong> HOD{hodData.department}123</p>
          </div>

          {/* Pending Approvals */}
          <div className="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-100">
            <h3 className="text-2xl font-bold text-purple-700 mb-5 border-b pb-3 border-purple-200">
              New Candidate Approvals
            </h3>
            {pendingCandidates.length === 0 ? (
              <p className="text-gray-600 text-center py-4">
                No new candidates pending approval.
              </p>
            ) : (
              <ul className="space-y-4">
                {pendingCandidates.map((candidate) => (
                  <li key={candidate._id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div>
                      <img src={candidate.photo} alt="Candidate" className="w-16 h-16 rounded-full mb-2" />
                      <p className="font-semibold text-lg text-gray-800">{candidate.name}</p>
                      <p className="text-sm text-gray-600">Branch: {candidate.department}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAccept(candidate._id)}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(candidate._id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full"
                      >
                        Reject
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 md:p-10 bg-gray-100 border-t border-gray-200 flex flex-wrap justify-center gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-transform hover:-translate-y-1">
            Manage Courses
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-transform hover:-translate-y-1">
            View Faculty List
          </button>
        </div>
      </div>
    </div>
  );
}

export default HodDashboard;
