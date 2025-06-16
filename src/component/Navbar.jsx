import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [dashboardRoute,setDashboard]=useState();
  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/auth", { withCredentials: true });
        setUser(res.data);
        const role=res.data.__t;
        if(role=='Student')
          setDashboard("/login/StudentHomePage");
        else if(role=='HOD')
          setDashboard("/login/HODHome")
        else if(role=='Faculty')
          setDashboard("/login/FacultyHome")
        else if(role=='Principal')
          setDashboard("/login/PrincipalHome")
      } catch (err) {
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/user/logout", { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  return (
    <nav className="bg-[#e3f2fd] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center space-x-6">
            <a href="/" className="text-2xl font-semibold text-gray-800" style={{ textDecoration: "none" }}>
              AI Enhanced College Portal
            </a>
            <div className="hidden md:flex items-center space-x-4">
              

              {user ? (
                 <></>
              ) : (
                <>
                <a href="/" className="text-blue-700 hover:text-blue-50 px-3 py-2 rounded-md text-l font-medium" style={{ textDecoration: "none" }}>
                Home
              </a>
                </>
              )}  
             
            
              <a href="/About" className="text-gray-800 hover:text-blue-50 px-3 py-2 rounded-md text-l font-medium" style={{ textDecoration: "none" }}>
                About
              </a>
              <a href="/chat-college-bot" className="text-gray-800 hover:text-blue-50 px-3 py-2 rounded-md text-l font-medium" style={{ textDecoration: "none" }}>
                ChatBot
              </a>
               {user ? (
                  <a href={dashboardRoute} className="text-blue-700 hover:text-blue-50 px-3 py-2 rounded-md text-l font-medium" style={{ textDecoration: "none"}}>
                    Dashboard
                  </a>
              ) : (
                <></>
              )}
              {user && (
                <a href="/courses/dashboard" className="text-gray-800 hover:text-blue-50 px-3 py-2 rounded-md text-l font-medium" style={{ textDecoration: "none" }}>
                  Course
                </a>
              )}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center">
            <div className="hidden md:block">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              ) : (
                <a
                  href="/RegistrationPage"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  style={{ textDecoration: "none" }}
                >
                  Register
                </a>
              )}
              
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="/" className="text-blue-700 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium" style={{ textDecoration: "none" }}>
            Home
          </a>
          <a href="/About" className="text-gray-800 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium" style={{ textDecoration: "none" }}>
            About
          </a>
          {user && (
            <a href="/course/dashboard" className="text-gray-800 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium" style={{ textDecoration: "none" }}>
              Course
            </a>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white w-full px-3 py-2 rounded-md text-base font-medium"
            >
              Logout
            </button>
          ) : (
            <a href="/RegistrationPage" className="bg-green-600 hover:bg-green-700 text-white block px-3 py-2 rounded-md text-base font-medium text-center mx-2" style={{ textDecoration: "none" }}>
              Register
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
