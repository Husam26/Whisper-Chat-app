import React from 'react';

const MessageSkeleton = () => {
  return (
    <div className="flex flex-col space-y-6 p-6 bg-[#1a1a2e] h-full">
      {/* Skeleton for received messages */}
      {[...Array(3)].map((_, index) => (
        <div
          key={`received-${index}`}
          className="flex items-start space-x-4 animate-pulse"
        >
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 shadow-lg"></div>

          {/* Message Bubble */}
          <div className="flex flex-col space-y-3 max-w-xs">
            <div className="w-48 h-5 rounded-lg bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 shadow-md"></div>
            <div className="w-32 h-5 rounded-lg bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 shadow-md"></div>
          </div>
        </div>
      ))}

      {/* Skeleton for sent messages */}
      {[...Array(3)].map((_, index) => (
        <div
          key={`sent-${index}`}
          className="flex items-end justify-end space-x-4 animate-pulse"
        >
          {/* Message Bubble */}
          <div className="flex flex-col space-y-3 text-right">
            <div className="w-44 h-5 rounded-lg bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 shadow-md"></div>
            <div className="w-36 h-5 rounded-lg bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 shadow-md"></div>
          </div>

          {/* Avatar (Optional for sent messages) */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 shadow-lg"></div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
