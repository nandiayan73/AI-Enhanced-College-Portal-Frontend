import React from 'react';

const Notifications = ({ notifications }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h4 className="text-xl font-semibold text-gray-800 mb-4">Notifications</h4>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification._id} className="border-l-4 border-blue-500 pl-4 py-2">
            <div className="flex justify-between items-start">
              <h5 className="font-medium text-gray-800">{notification.title}</h5>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {/* {notification.} */}
              </span>
            </div>
            <p className="text-gray-600 mt-1">{notification.caption}</p>
           <p className="text-sm text-gray-400 mt-2">
            {new Date(notification.date).toISOString().split("T")[0]}
          </p>
          </div>
        ))}
      </div>
      {/* <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
        View All Notifications
      </button> */}
    </div>
  );
};

export default Notifications;