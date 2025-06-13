import React from 'react';

const StudentProfile = ({ student }) => {
  return (
    <div className="bg-white w- rounded-lg shadow-md p-1 flex items-center">
      <div className="mr-4 ml-3">
        <img 
          src={student.photoUrl || "https://via.placeholder.com/80"} 
          alt="Student" 
          className="w-40 h-30 rounded-full object-cover border-2 border-blue-500"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/80";
          }}
        />
      </div>
      <div>
        <h2 className="text-xl ml-6 font-bold text-gray-800">{student.name}</h2>
        <p className="text-gray-600 ml-6">Roll No: {student.rollNumber}</p>
        <p className="text-gray-600 ml-6">B.Tech Computer Science</p>
      </div>
    </div>
  );
};

export default StudentProfile;