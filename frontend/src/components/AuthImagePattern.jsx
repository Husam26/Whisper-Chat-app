import React from 'react';
import { MessageSquare } from 'lucide-react'; // Import MessageSquare from lucide-react

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div
      className="relative w-full h-full bg-cover bg-center"
      style={{ backgroundImage: 'url(/path-to-your-image.jpg)' }}
    >
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60"></div>

      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6 sm:px-12">
        {/* Title with Shadow for Depth */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-shadow-lg">
          {title}
        </h2>
        <p className="text-lg sm:text-xl mb-6 text-opacity-90">
          {subtitle}
        </p>

        {/* Floating Circles with Hover Effects */}
        <div className="relative w-full h-full flex justify-center items-center">
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className={`absolute transition-all transform rounded-full w-20 h-20 flex justify-center items-center p-4 shadow-lg hover:scale-110 hover:rotate-12 ${
                index % 2 === 0
                  ? 'bg-gray-800 opacity-90'
                  : 'bg-gray-700 opacity-80 animate-pulse'
              }`}
              style={{
                top: `${Math.random() * 80 + 10}%`, // Random top position
                left: `${Math.random() * 80 + 10}%`, // Random left position
                animationDuration: `${Math.random() * 3 + 2}s`, // Random animation speed
              }}
            >
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;
