import React, { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#e3f2fd] shadow-sm">
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and menu items */}
          <div className="flex items-center space-x-6">
            {/* Logo/Brand */}
            <a href="/" className="text-2xl font-semibold text-gray-800" style={{textDecoration:"none"}}>
              AI Enhanced College Portal
            </a>
            
            {/* Desktop Menu Items (hidden on mobile) */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="/"
                className="text-blue-700 hover:text-blue-50 px-3 py-2 rounded-md text-l font-medium"
                style={{textDecoration:"none"}}
              >
                Home
              </a>
              <a
                href="/About"
                className="text-gray-800 hover:text-blue-50 px-3 py-2 rounded-md text-l font-medium"
                style={{textDecoration:"none"}}
              >
                About
              </a>
            </div>
          </div>
          
          {/* Right side - Register button and mobile menu */}
          <div className="flex items-center">
            {/* Register button (hidden on mobile) */}
            <div className="hidden md:block">
              <a
                href="/RegistrationPage"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                style={{textDecoration:"none"}}
              >
                Register
              </a>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu (hidden by default) */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="/"
            className="text-blue-700 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium"
            style={{textDecoration:"none"}}
          >
            Home
          </a>
          <a
            href="/About"
            className="text-gray-800 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium"
            style={{textDecoration:"none"}}
          >
            About
          </a>
          <a
            href="/RegistrationPage"
            className="bg-green-600 hover:bg-green-700 text-white block px-3 py-2 rounded-md text-base font-medium text-center mx-2"
            style={{textDecoration:"none"}}
          >
            Register
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;