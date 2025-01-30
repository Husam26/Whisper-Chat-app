import React from 'react';

const NoChatSelected = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">
          Welcome to the Chat App!
        </h2>
        <p className="text-lg text-gray-500">
          Please select a user from the left sidebar to start a conversation.
        </p>
      </div>

      <div className="w-full max-w-lg p-6 bg-blue-100 rounded-lg shadow-lg flex flex-col items-center justify-center">
        <p className="text-sm text-gray-600 mb-4">
          Once a user is selected, you will be able to send and receive messages with them.
        </p>
        <div className="flex justify-center items-center w-20 h-20 rounded-full bg-blue-200 mb-4">
          <span className="text-xl text-blue-500">👤</span>
        </div>
        <p className="text-sm text-gray-600 text-center">
          Ready to chat? Select someone and start the conversation!
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
