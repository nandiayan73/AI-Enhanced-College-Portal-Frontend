import React from 'react';
import { useNavigate } from 'react-router-dom';

const FacultyHome = () => {
  const navigate = useNavigate();
  
  // Faculty profile data
  const faculty = {
    name: "Brijit Bhattacharjee",
    designation: "Assistant Professor",
    department: "Computer Science & Engineering",
    email: "Brijit.svistclg@gmail.com",
    phone: "+91 9876543210",
    profileImage: "/facultyProfile.jpg",
    joiningDate: "15 July 2016",
    totalExperience: "8 years"
  };

  // Class information
  const classes = [
    {
      id: 1,
      courseCode: "CS301",
      courseName: "Data Structures & Algorithms",
      year: "2nd Year",
      section: "A",
      schedule: "Mon, Wed, Fri (10:00-11:00 AM)",
      room: "Block B-205",
      studentsEnrolled: 45
    },
    {
      id: 2,
      courseCode: "CS402",
      courseName: "Machine Learning",
      year: "3rd Year",
      section: "B",
      schedule: "Tue, Thu (2:00-3:30 PM)",
      room: "Lab 3 (AI Lab)",
      studentsEnrolled: 32
    },
    {
      id: 3,
      courseCode: "CS502",
      courseName: "Advanced Database Systems",
      year: "4th Year",
      section: "C",
      schedule: "Mon, Wed (3:00-4:30 PM)",
      room: "Block A-302",
      studentsEnrolled: 28
    }
  ];

  // Dashboard stats
  const dashboardStats = [
    { title: "Total Classes", value: classes.length, icon: "📚", color: "bg-blue-100 text-blue-600" },
    { title: "Students", value: classes.reduce((sum, cls) => sum + cls.studentsEnrolled, 0), icon: "👨‍🎓", color: "bg-green-100 text-green-600" },
    { title: "Pending Assignments", value: 12, icon: "📝", color: "bg-yellow-100 text-yellow-600" },
    { title: "Attendance to Mark", value: 3, icon: "✓", color: "bg-purple-100 text-purple-600" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h5 className="text-2xl font-bold text-gray-800">Faculty Dashboard</h5>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/profile')}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
            >
              
            </button>
          </div>
        </div>

        {/* Faculty Profile Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:flex-shrink-0 p-6 flex justify-center">
              <img 
                className="h-32 w-32 rounded-full object-cover border-4 border-blue-100" 
                src={faculty.profileImage} 
                alt={faculty.name}
                
              />
            </div>
            <div className="p-6 md:p-8 flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{faculty.name}</h2>
                  <p className="text-lg text-blue-600 font-medium">{faculty.designation}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                    {faculty.department}
                  </span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-600">{faculty.email}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-600">{faculty.phone}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-600">Joined: {faculty.joiningDate}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600">Experience: {faculty.totalExperience}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                </div>
                <div className={`h-12 w-12 rounded-full flex items-center justify-center text-2xl ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Class Schedule Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">Your Class Schedule</h3>
            <button 
              onClick={() => navigate('/classes')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
            >
              View All
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year/Section
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Schedule
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Room
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Students
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {classes.map((cls) => (
                  <tr key={cls.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{cls.courseCode}</div>
                      <div className="text-sm text-gray-500">{cls.courseName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{cls.year}</div>
                      <div className="text-sm text-gray-500">Section {cls.section}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cls.schedule}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cls.room}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cls.studentsEnrolled}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button 
                        onClick={() => navigate(`/attendance/${cls.id}`)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Attendance
                      </button>
                      <button 
                        onClick={() => navigate(`/materials/${cls.id}`)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Materials
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Classes */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800">Today's Classes</h4>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {classes.slice(0, 2).map((cls, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                    <h5 className="font-medium text-gray-800">{cls.courseCode} - {cls.courseName}</h5>
                    <p className="text-sm text-gray-600 mt-1">{cls.schedule}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">{cls.room}</span>
                      <button className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded hover:bg-blue-200">
                        Start Class
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full text-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Full Schedule
              </button>
            </div>
          </div>

          {/* Pending Assignments */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800">Pending Assignments</h4>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[1, 2].map((item) => (
                  <div key={item} className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mr-3">
                      📝
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800">Assignment {item}</h5>
                      <p className="text-sm text-gray-600 mt-1">Due: {new Date(Date.now() + item * 86400000).toLocaleDateString()}</p>
                      <div className="flex space-x-2 mt-2">
                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">CS30{item}</span>
                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">{5-item} days left</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full text-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All Assignments
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800">Quick Actions</h4>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => navigate('/upload-materials')}
                  className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition"
                >
                  <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Upload Materials</span>
                </button>
                <button 
                  onClick={() => navigate('/create-assignment')}
                  className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-200 transition"
                >
                  <div className="h-10 w-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Create Assignment</span>
                </button>
                
                <button 
                  onClick={() => navigate('/Attendance')}
                  className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-200 transition"
                >
                  <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Mark Attendance</span>
                </button>
                <button 
                  onClick={() => navigate('/announcements')}
                  className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-orange-50 hover:border-orange-200 transition"
                >
                  <div className="h-10 w-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Post Announcement</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyHome;