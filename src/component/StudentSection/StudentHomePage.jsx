import React, { useState } from 'react';
// Correct relative imports for files within the same 'src/components/' directory
import NavigationBar from './NavigationBar';
import StudentDashboard from './StudentDashboard';
import YearSelection from './YearSelection'; // This will now be directly rendered for 'home' view
import Notifications from './Notifications';
import StudentProfile from './StudentProfile';


const StudentHomePage = () => {
  // State to manage the currently displayed content area within the StudentHomePage
  // It will now only toggle between 'home' (YearSelection) and 'dashboard' (StudentDashboard)
  const [currentPage, setCurrentPage] = useState('home');

  const student = {
    name: "Mohammad Shamsuzzaman",
    photoUrl: "/studentProfile.jpg",
    rollNumber: "24100121006 ",
  };

  const notifications = [
    {
      id: 1,
      title: "Principal's Message",
      content: "Mid-term exams will begin from next Monday. All students are requested to prepare accordingly.",
      from: "Principal",
      date: "2023-05-15"
    },
    {
      id: 2,
      title: "HOD Notice",
      content: "Project submissions for 3rd year students are due by Friday.",
      from: "HOD",
      date: "2023-05-10"
    }
  ];

  // Function to handle internal navigation within StudentHomePage
  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className=" bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col font-sans text-gray-800 mt-3"  >
      {/* Header Section: College Title and Student Quick Info */}
      <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white  shadow-xl">
        <div className="container mt-1 mx-auto flex flex-col md:flex-row justify-between items-center">
          <h3 className="text-4xl font-extrabold mb-4 md:mb-0 text-center md:text-left drop-shadow-md">
            Student's Dashboard
          </h3>
        </div>
      </header>

      {/* Main Content Area: Sidebar + Dynamic Content */}
      <div className="flex flex-1 flex-col lg:flex-row" >
        {/* Left Side: Student Profile, Navigation, and Notifications */}
        <div className="w-m  p-4 md:p-6 flex flex-col gap-3">
          <StudentProfile student={student} />
          {/* NavigationBar will toggle between 'home' (YearSelection) and 'dashboard' (StudentDashboard) */}
          <NavigationBar onNavigate={handleNavigate} />
          <Notifications notifications={notifications} />
        </div>

        {/* Right Side: Conditionally rendered main content based on currentPage */}
        <main className="flex-grow container  mx-auto p-4 md:p-8" >
          {/* When currentPage is 'home', directly display the YearSelection component */}
          {currentPage === 'home' && <YearSelection />}

          {/* When currentPage is 'dashboard', display the StudentDashboard component */}
          {currentPage === 'dashboard' && <StudentDashboard onNavigate={handleNavigate} />}
        </main>
      </div>

      
      
    </div>
  );
};

export default StudentHomePage;
