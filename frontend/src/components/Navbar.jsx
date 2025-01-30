import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore'; // Import the Zustand store
import { Link } from 'react-router-dom';
import { User, LogIn, LogOut, Settings, MessageCircle, Home } from 'lucide-react'; // Import icons from lucide-react
import toast from 'react-hot-toast'; // Import react-hot-toast
import ConfirmationModal from './ConfirmationModal '; // Import the confirmation modal

const Navbar = ({ theme }) => {
  const { authUser, logout } = useAuthStore(); // Get authUser and logout from the store
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open/close state

  // Dynamic styles for the Navbar based on the selected theme
  const navbarStyle =
    theme === 'dark'
      ? 'bg-gray-800 text-white'
      : theme === 'light'
      ? 'bg-white text-gray-800'
      : theme === 'cupcake'
      ? 'bg-pink-500 text-white'
      : 'bg-gray-900 text-white'; // Fallback theme

  const handleLogoutClick = () => {
    setIsModalOpen(true); // Open the confirmation modal
  };

  const handleLogoutConfirm = () => {
    logout();
    
    setIsModalOpen(false); // Close the modal
  };

  const handleLogoutCancel = () => {
    setIsModalOpen(false); // Close the modal if user cancels
  };

  return (
    <div className={`${navbarStyle} px-4 py-2 flex justify-between items-center`}>
      <div className="text-2xl font-bold flex items-center">
        {/* Brand Name with MessageCircle Icon */}
        <MessageCircle className="mr-2 text-primary" />
        <Link to="/login">Whisper</Link>
      </div>
      <div className="space-x-4 flex items-center">
        {/* Conditional rendering based on authentication status */}
        {authUser ? (
          // Authenticated user options
          <>
            <Link to="/" className="hover:text-gray-300 flex items-center">
              <Home className="mr-2" /> Home
            </Link>
            <Link to="/profile" className="hover:text-gray-300 flex items-center">
              <User className="mr-2" /> Profile
            </Link>
            <Link to="/settings" className="hover:text-gray-300 flex items-center">
              <Settings className="mr-2" /> Settings
            </Link>
            <button onClick={handleLogoutClick} className="hover:text-gray-300 flex items-center">
              <LogOut className="mr-2" /> Logout
            </button>
          </>
        ) : (
          // Non-authenticated user options
          <>
            <Link to="/settings" className="hover:text-gray-300 flex items-center">
              <Settings className="mr-2" /> Settings
            </Link>
            <Link to="/login" className="hover:text-gray-300 flex items-center">
              <LogIn className="mr-2" /> Login
            </Link>
            <Link to="/signup" className="hover:text-gray-300 flex items-center">
              <LogIn className="mr-2" /> Sign Up
            </Link>
          </>
        )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
};

export default Navbar;
