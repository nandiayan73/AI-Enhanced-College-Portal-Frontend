import React from 'react';

// StudentDashboard component to display comprehensive student information
// It now accepts an 'onNavigate' prop to allow navigation back to the home page.
const StudentDashboard = ({ onNavigate }) => {
  // Dummy student data - you would replace this with actual data fetched from an API
  const studentData = {
    photo: "/studentProfile.jpg", // Professional placeholder image
    name: "Mohammad Shamsuzzaman",
    branch: "CSE",
    registrationNumber: " 21241001210049",
    registrationYear: " 2021",
    rollNumber: " 24100121026",
    email: "shams@college.edu",
    phone: "+919876543210",
    dateOfBirth: "15/07/2005",
    address: "Baruipur",
    currentSem: "2nd",
  };

  // Helper function to render a detail item
  const DetailItem = ({ label, value }) => (
    <div className="flex flex-col items-center p-2 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors duration-200 rounded-md">
      <span className="font-semibold  text-gray-600   flex-shrink-0">{label}: </span>
      <span className="text-gray-800 font-medium ml-1 flex-grow ">{value}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center py-10 font-sans text-gray-800">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden my-8 transform transition-all duration-300 hover:scale-[1.005]">
        {/* Header Section: Profile Picture and Name */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white flex flex-col md:flex-row items-center justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-8">
          <div className="relative">
            <img
              src={studentData.photo}
              alt="Student Profile"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <span className="absolute bottom-2 right-2 bg-green-400 w-6 h-6 rounded-full border-2 border-white animate-pulse" title="Online"></span>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-4xl font-extrabold drop-shadow-md">{studentData.name}</h3>
            <p className="text-xl font-light opacity-90 mt-1">{studentData.branch}</p>
          </div>
        </div>

        {/* Main Details Section */}
        <div className=" md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Academic Information */}
          <div className="bg-gray-50 w-full  rounded-xl p-6 shadow-md border border-gray-100">
            <h3 className="text-xl font-bold text-blue-700 mb-5 border-b pb-3 border-blue-200">Academic Information</h3>
            <DetailItem label="Branch" value={studentData.branch} />
            <DetailItem label="Registration No." value={studentData.registrationNumber} />
            <DetailItem label="Registration Year" value={studentData.registrationYear} />
            <DetailItem label="Roll Number" value={studentData.rollNumber} />
            <DetailItem label="Current Semester" value={studentData.currentSem} />
          </div>

          {/* Personal Information */}
          <div className="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-100">
            <h3 className="text-xl font-bold text-blue-700 mb-5 border-b pb-3 border-blue-200">Personal Information</h3>
            <DetailItem label="Email" value={studentData.email} />
            <DetailItem label="Phone" value={studentData.phone} />
            <DetailItem label="Date of Birth" value={studentData.dateOfBirth} />
            <DetailItem label="Address" value={studentData.address} />
            {/* You can add more personal details here if needed */}
          </div>
        </div>

        {/* Action Buttons / Quick Links and Back Button */}
        <div className="p-6 md:p-10 bg-gray-100 border-t border-gray-200 flex flex-wrap justify-center gap-4">
          {/* The new "Return to Home Page" button */}
          <button
            onClick={() => onNavigate('./StudentHomePage.jsx')} // This calls the onNavigate prop with 'home'
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            Return to Home Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
