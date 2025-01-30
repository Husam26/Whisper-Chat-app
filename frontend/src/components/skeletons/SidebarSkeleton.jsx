  import React from 'react';

  const SidebarSkeleton = () => {
    return (
      <aside className="w-64 bg-gray-800 text-white h-full p-4">
        {/* Skeleton for the header */}
        <div className="mb-4 text-xl font-semibold animate-pulse">
          <div className="h-6 bg-gray-600 rounded w-32"></div>
        </div>

        {/* Skeleton for the user list */}
        <ul className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <li
              key={index}
              className="flex items-center space-x-4 p-2 rounded-lg cursor-pointer animate-pulse"
            >
              <div className="w-10 h-10 bg-gray-500 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-600 rounded w-24"></div>
                <div className="h-3 bg-gray-500 rounded w-16"></div>
              </div>
            </li>
          ))}
        </ul>
      </aside>
    );
  };

  export default SidebarSkeleton;
