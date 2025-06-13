import React from 'react';

// NavigationBar component - designed to work with a parent component for navigation
const NavigationBar = ({ onNavigate }) => { // Accepts an onNavigate function as a prop
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h5 className="text-xl font-semibold text-gray-800 mb-4">Student's Section</h5>
      <nav>
        <ul className="space-y-2">
          <li>
            {/* The anchor tag now uses onClick to trigger the onNavigate prop */}
            <button
              onClick={() => onNavigate('dashboard')} // Call onNavigate with a key for dashboard
              className="flex items-center p-2 text-gray-700 hover:bg-blue-50 rounded-md transition w-full text-left" // Added w-full and text-left for button styling
            >
              <span>Dashboard</span>
            </button>
          </li>
          {/* New navigation item for "Prep with AI" */}
          <li>
          <a href="/Suggestion/QuestionSuggestion" style={{textDecoration:"none"}}><button
              onClick={() => onNavigate('prepWithAI')} // Call onNavigate with a key for "prepWithAI"
              className="flex items-center p-2 text-gray-700 hover:bg-blue-50 rounded-md transition w-full text-left"
            >
              <span>Prep with AI</span>
            </button></a>  
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavigationBar;