import React, { useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import Sidebar from '../components/Sidebar';
import NoChatSelected from '../components/NoChatSelected';
import ChatContainer from '../components/ChatContainer';
import Typewriter from 'react-typewriter-effect';

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const { authUser } = useAuthStore();
  const [cursorVisible, setCursorVisible] = useState(true);

  const handleTypingEnd = () => {
    // Hide the cursor after typing is finished
    setCursorVisible(false);
  };

  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header Section */}
      <header className="w-full py-6 px-8 shadow-md">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-text flex items-center">
            Welcome to Whisper,
            {authUser && authUser.fullName && (
              <span className="ml-3 text-gray-200">
                <Typewriter
                  text={authUser.fullName} // Username to be typed
                  cursor={cursorVisible ? '|' : ''} // Hide cursor when typing ends
                  cursorColor="white"
                  typeSpeed={100} // Typing speed
                  delay={500} // Delay before typing starts
                  onTypingEnd={handleTypingEnd} // Callback when typing ends
                />
              </span>
            )}
          </h1>
          <p className="mt-2 text-gray-400 text-sm font-light text-center">
            Start chatting by selecting a contact from the sidebar.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-center pt-4 px-4">
        <div className="bg-base-100 rounded-lg shadow-2xl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex flex-col md:flex-row h-full">
            {/* Left Sidebar */}
            <div className="w-full md:w-1/4 bg-gray-800 text-white">
              <Sidebar />
            </div>

            {/* Right Main Content */}
            <div className="flex-1 p-4">
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
