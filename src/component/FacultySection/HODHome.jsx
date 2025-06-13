import React, { useState } from 'react';

const HodDashboard = () => {
  // Dummy HOD data
  const hodData = {
    photo: "https://placehold.co/150x150/7A3D7B/FFFFFF?text=HOD", // Professional placeholder image for HOD
    name: "Dr. Anya Sharma",
    department: "Computer Science & Engineering",
    facultyId: "FCS007",
    email: "anya.sharma@college.edu",
    phone: "+91 91234 56789",
  };

  // Dummy data for new candidates awaiting approval
  const [pendingCandidates, setPendingCandidates] = useState([
    { id: 'CAND001', name: 'Alisha Khan', branch: 'Computer Science', status: 'Pending' },
    { id: 'CAND002', name: 'Veer Singh', branch: 'Computer Science', status: 'Pending' },
    { id: 'CAND003', name: 'Priya Reddy', branch: 'Computer Science', status: 'Pending' },
    { id: 'CAND004', name: 'Samir Joshi', branch: 'Computer Science', status: 'Pending' },
  ]);

  // Function to handle accepting a candidate
  const handleAccept = (candidateId) => {
    setPendingCandidates(prevCandidates =>
      prevCandidates.filter(candidate => candidate.id !== candidateId)
    );
    // In a real application, you'd send an API request to update the candidate's status in the database
    console.log(`Candidate ${candidateId} Accepted`);
    // You might want to move accepted candidate to a separate 'accepted' list or display a success message
  };

  // Function to handle rejecting a candidate
  const handleReject = (candidateId) => {
    setPendingCandidates(prevCandidates =>
      prevCandidates.filter(candidate => candidate.id !== candidateId)
    );
    // In a real application, you'd send an API request to update the candidate's status in the database
    console.log(`Candidate ${candidateId} Rejected`);
    // You might want to add a reason for rejection or display a rejection message
  };

  // Helper function to render a detail item
  const DetailItem = ({ label, value }) => (
    <div className="flex items-center p-2 border-b border-gray-200 last:border-b-0">
      <span className="font-semibold text-gray-600 w-1/3 flex-shrink-0">{label}:</span>
      <span className="text-gray-800 ml-2">{value}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex flex-col items-center py-10 font-sans text-gray-800">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Header Section: HOD Profile and Department */}
        <div className="relative bg-gradient-to-r from-purple-700 to-indigo-800 p-8 text-white flex flex-col md:flex-row items-center justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-8">
          <img
            src={hodData.photo}
            alt="HOD Profile"
            className="w-36 h-36 md:w-48 md:h-48 rounded-full border-4 border-white shadow-lg object-cover"
          />
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-extrabold drop-shadow-md">{hodData.name}</h1>
            <p className="text-xl font-light opacity-90 mt-1">{hodData.department} (HOD)</p>
            <p className="text-md opacity-80 mt-1">Faculty ID: {hodData.facultyId}</p>
          </div>
        </div>

        {/* Main Content Areas */}
        <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* HOD Information Card */}
          <div className="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-100">
            <h3 className="text-2xl font-bold text-purple-700 mb-5 border-b pb-3 border-purple-200">My Information</h3>
            <DetailItem label="Email" value={hodData.email} />
            <DetailItem label="Phone" value={hodData.phone} />
            <DetailItem label="Department" value={hodData.department} />
            <DetailItem label="Faculty ID" value={hodData.facultyId} />
            {/* Add more HOD specific info here */}
          </div>

          {/* Candidate Approval Section */}
          <div className="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-100">
            <h3 className="text-2xl font-bold text-purple-700 mb-5 border-b pb-3 border-purple-200">New Candidate Approvals</h3>
            {pendingCandidates.length === 0 ? (
              <p className="text-gray-600 text-center py-4">No new candidates pending approval.</p>
            ) : (
              <ul className="space-y-4">
                {pendingCandidates.map(candidate => (
                  <li key={candidate.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-lg text-gray-800">{candidate.name}</p>
                      <p className="text-sm text-gray-600">Branch: {candidate.branch}</p>
                      <p className="text-xs text-gray-500">ID: {candidate.id}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAccept(candidate.id)}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full transition-all duration-200 shadow-md"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(candidate.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full transition-all duration-200 shadow-md"
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

        {/* Action Buttons (Optional) */}
        <div className="p-6 md:p-10 bg-gray-100 border-t border-gray-200 flex flex-wrap justify-center gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            Manage Courses
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            View Faculty List
          </button>
        </div>
      </div>
    </div>
  );
};

export default HodDashboard;
