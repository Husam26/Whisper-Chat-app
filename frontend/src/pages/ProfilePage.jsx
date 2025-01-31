import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, User, Mail } from "lucide-react"; // import icons from Lucide
import { useThemeStore } from "../store/useThemeStore"; // Import theme store

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const { theme } = useThemeStore(); // Get current theme from store

  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const formatDate = (date) => {
    return date?.split("T")[0]; // Extracts only the date part (yyyy-mm-dd)
  };

  return (
    <div
      className={`h-screen pt-3 ${
        theme === "dark" ? "bg-gradient-to-b from-gray-900 to-black text-white" : "bg-gradient-to-b from-gray-50 to-white text-black"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="max-w-2xl mx-auto p-2 py-2">
        <div
          className={`bg-opacity-60 backdrop-blur-md rounded-xl p-6 space-y-8 shadow-xl border-2 ${
            theme === "dark" ? "border-gray-700 bg-base-800" : "border-gray-300 bg-base-100"
          } transition-all duration-500 ease-in-out`}
        >
          <div className="text-center">
            <h1
              className={`text-3xl font-semibold text-gradient bg-clip-text text-transparent bg-gradient-to-r ${
                theme === "dark" ? "from-cyan-400 to-blue-500" : "from-blue-400 to-cyan-500"
              }`}
            >
              Profile
            </h1>
            <p className="mt-2 text-lg text-gray-300">Your profile information</p>
          </div>

          {/* Profile Picture Section */}
          <div className="flex flex-col items-center">
            <div className="relative">
              {/* Profile picture preview */}
              <div
                className={`w-40 h-40 rounded-full overflow-hidden border-4 shadow-xl transition-all hover:border-blue-500 ${
                  theme === "dark" ? "border-gray-600" : "border-gray-300"
                }`}
              >
                <img
                  src={selectedImg || authUser.profilePic || "/avatar.png"} // Change this to your default or uploaded image URL
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Camera Icon with Label for file input */}
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 p-3 rounded-full cursor-pointer transition-all duration-200 ${
                  theme === "dark" ? "bg-blue-500 hover:scale-110" : "bg-gray-500 hover:scale-110"
                }`}
              >
                <Camera className="w-6 h-6 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>

            <p className="mt-2 text-lg">
              {isUpdatingProfile ? "Uploading..." : "Upload your profile picture"}
            </p>
          </div>

          {/* User Information Section with Modern Design */}
          <div
            className={`mt-8 p-6 rounded-xl shadow-lg border-2 ${
              theme === "dark" ? "bg-gradient-to-br from-gray-800 via-gray-900 to-black border-gray-700" : "bg-gradient-to-br from-gray-100 via-gray-200 to-white border-gray-300"
            }`}
          >
            <h2 className="text-2xl font-semibold text-gray-100">User Information</h2>

            {/* Full Name Section */}
            <div className="flex items-center space-x-4 mt-6">
              <User className={`text-cyan-400 w-6 h-6 ${theme === "dark" ? "hover:text-blue-400" : "hover:text-cyan-500"}`} />
              <div
                className={`${
                  theme === "dark" ? "text-gray-200" : "text-gray-800"
                }`}
              >
                <h3 className="text-sm font-medium">Full Name</h3>
                <p className="text-xl font-semibold">{authUser?.fullName || "Your full name"}</p>
              </div>
            </div>

            {/* Email Section */}
            <div className="flex items-center space-x-4 mt-4">
              <Mail className={`text-cyan-400 w-6 h-6 ${theme === "dark" ? "hover:text-blue-400" : "hover:text-cyan-500"}`} />
              <div
                className={`${
                  theme === "dark" ? "text-gray-200" : "text-gray-800"
                }`}
              >
                <h3 className="text-sm font-medium">Email</h3>
                <p className="text-xl font-semibold">{authUser?.email || "Your email"}</p>
              </div>
            </div>

            {/* Member Since Section */}
            <div className="mt-4 flex items-center text-sm text-gray-400">
              <span>Member Since:</span>
              <span className="ml-2 font-medium text-gray-300">{formatDate(authUser?.createdAt) || "N/A"}</span>
            </div>

            {/* Account Status Section */}
            <div className="mt-2 flex items-center text-sm text-gray-400">
              <span>Account Status:</span>
              <div className="flex items-center ml-2 font-medium text-green-500">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 mr-2"></span> Active
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
