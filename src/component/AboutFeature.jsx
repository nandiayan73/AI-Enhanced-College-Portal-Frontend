// import React from 'react'

// function AboutFeature({ title, content, elementId, items }) {
//     return (
//         <>

//             <div class="card">
//                 <div class="card-header">
//                     Featured
//                 </div>
//                 <div class="card-body">
//                     <h5 class="card-title">{title}</h5>
//                     <p class="card-text">{content}</p>
//                     <p>
//                         {/* <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target={"#" + elementId} aria-expanded="false" aria-controls="collapseWidthExample">
//                             Benifits
//                         </button> */}
//                         <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target={"#" + elementId} aria-expanded="false" aria-controls="collapseExample">
//                             Benifits
//                         </button>
//                     </p>
                    
//                     <div class="collapse" id={elementId}>
//                         <div class="card card-body">
//                             <ul>
//                                 {items && items.map((item, index) => (
//                                     <li key={index}>{item}</li>
//                                 ))}
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </>
//     )
// }

// export default AboutFeature


import React, { useState } from 'react';

function AboutFeature({ title, content,  items }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex flex-col w-full  bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
        Featured
      </div>
      <div className="p-6 ">
        <h5 className="text-xl font-semibold text-gray-800 mb-2">{title}</h5>
        <p className="text-gray-600 mb-4">{content}</p>
        <div className="mb-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-150 ease-in-out"
            type="button"
            onClick={toggleCollapse}
            aria-expanded={!isCollapsed}
          >
            Benefits
          </button>
        </div>
        
        <div 
          className={`transition-all duration-300 ease-in-out overflow-hidden ${isCollapsed ? 'max-h-0' : 'max-h-96'}`}
          aria-hidden={isCollapsed}
        >
          <div className="bg-gray-50 rounded-lg p-4 shadow-inner">
            <ul className="space-y-2">
              {items && items.map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutFeature;


