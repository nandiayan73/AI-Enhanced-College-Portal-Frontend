//import React, { useState } from 'react';

const YearSelection = () => {
  // Sample student data
  const student = {
    currentYear: 1, // Only the current year matters now
    name: "Mohammad Shamsuzzaman",
    branch: "Computer Science Engineering"
  };

  const currentYearData = {
    name: "1st Year",
    description: "Foundation Courses",
    subjects: [
      "Mathematics I",
      "Physics",
      "Chemistry",
      "Basic Electrical Engineering",
      "Programming Fundamentals",
      "Engineering Drawing"
    ]
  };

  //const [showSubjects, setShowSubjects] = useState(true); // Show subjects by default

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h4 className="text-2xl font-bold text-gray-800 mb-2">Your Academic Year</h4>
      <p className="text-gray-600 mb-4">Hello {student.name}, here's your current year information</p>
      <p className="text-gray-600 mb-6">Branch: {student.branch}</p>
      
      {/* Current Year Card - Always visible */}
      <div className="border border-blue-500 rounded-lg p-6 bg-blue-50">
        <div className="flex justify-between items-start">
          <div>
            <h5 className="text-xl font-semibold text-blue-600 mb-1">
              {currentYearData.name}
            </h5>
            <p className="text-gray-600">{currentYearData.description}</p>
          </div>
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            Current Year
          </span>
        </div>
      </div>

      {/* Subjects Panel - Always visible */}
      <div className="mt-6 bg-gray-50 rounded-lg p-6">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">
          Subjects for {currentYearData.name} - {student.branch}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentYearData.subjects.map((subject, index) => (
            <div key={index} className="flex items-start p-3 bg-white rounded-md shadow-sm border-l-4 border-blue-500">
              <div className="flex items-center justify-center bg-blue-100 text-blue-800 rounded-full w-8 h-8 mr-3 flex-shrink-0">
                {index + 1}
              </div>
              <div>
                <h5 className="font-medium text-gray-800">{subject}</h5>
                <div className="flex space-x-2 mt-1">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Core</span>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">4 Credits</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Download Syllabus
          </button>
        </div>
      </div>
    </div>
  );
};

export default YearSelection;