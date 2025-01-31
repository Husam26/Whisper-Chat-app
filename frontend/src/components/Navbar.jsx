import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore'; // Import the Zustand store
import { Link } from 'react-router-dom';
import { User, LogIn, LogOut, Settings, MessageCircle, Home, Menu, X } from 'lucide-react'; // Import the X icon for close button
import toast from 'react-hot-toast'; // Import react-hot-toast
import ConfirmationModal from './ConfirmationModal '; // Import the confirmation modal

const Navbar = ({ theme }) => {
  const { authUser, logout } = useAuthStore(); // Get authUser and logout from the store
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open/close state
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu toggle

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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className={`${navbarStyle} px-4 py-2 flex justify-between items-center`}>
      <div className="text-2xl font-bold flex items-center">
        {/* Brand Name with MessageCircle Icon */}
        <MessageCircle className="mr-2 text-primary" />
        <Link to="/login">Whisper</Link>
      </div>

      {/* Hamburger Menu Button with Menu Icon */}
      <button
        onClick={toggleMenu}
        className="md:hidden flex items-center text-xl"
        aria-label="Toggle menu" // Adds accessibility for screen readers
      >
        <Menu />
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 md:hidden">
          <div className="flex justify-between items-center p-4">
            <span className="text-2xl font-bold text-white">Whisper</span>
            <button
              onClick={toggleMenu}
              className="text-white text-2xl"
              aria-label="Close menu"
            >
              <X />
            </button>
          </div>

          <div className="flex flex-col items-center space-y-6">
            {/* Conditional rendering based on authentication status */}
            {authUser ? (
              <>
                <Link
                  to="/"
                  className="text-white text-xl hover:text-gray-300"
                  onClick={toggleMenu}
                >
                  <Home className="mr-2 inline" /> Home
                </Link>
                <Link
                  to="/profile"
                  className="text-white text-xl hover:text-gray-300"
                  onClick={toggleMenu}
                >
                  <User className="mr-2 inline" /> Profile
                </Link>
                <Link
                  to="/settings"
                  className="text-white text-xl hover:text-gray-300"
                  onClick={toggleMenu}
                >
                  <Settings className="mr-2 inline" /> Settings
                </Link>
                <button
                  onClick={() => {
                    handleLogoutClick();
                    toggleMenu();
                  }}
                  className="text-white text-xl hover:text-gray-300"
                >
                  <LogOut className="mr-2 inline" /> Logout
                </button>

              </>
            ) : (
              <>
                <Link
                  to="/settings"
                  className="text-white text-xl hover:text-gray-300"
                  onClick={toggleMenu}
                >
                  <Settings className="mr-2 inline" /> Settings
                </Link>
                <Link
                  to="/login"
                  className="text-white text-xl hover:text-gray-300"
                  onClick={toggleMenu}
                >
                  <LogIn className="mr-2 inline" /> Login
                </Link>
                <Link
                  to="/signup"
                  className="text-white text-xl hover:text-gray-300"
                  onClick={toggleMenu}
                >
                  <LogIn className="mr-2 inline" /> Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Regular Horizontal Navbar Links (Visible only on medium and larger screens) */}
      <div className="md:flex md:items-center space-x-4 ml-auto hidden">
        {/* Conditional rendering based on authentication status */}
        {authUser ? (
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
