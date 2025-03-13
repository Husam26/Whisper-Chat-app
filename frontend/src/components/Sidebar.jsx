import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Search, Menu } from "lucide-react"; // Import Menu icon for the hamburger
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading, markMessagesAsRead } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(true); // State to toggle sidebar visibility on small screens

  useEffect(() => {
    getUsers(); // Fetch users
  }, [getUsers]);

  const handleUserSelect = (user) => {
  if (selectedUser?._id !== user._id) {
    setSelectedUser(user);
  }
  markMessagesAsRead(user._id); // Always mark messages as read, even if the user is already selected
};


  const filteredUsers = users
    .filter((user) => user.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((user) => (showOnlineOnly ? onlineUsers.includes(user._id) : true));

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside
      className={`h-full transition-all duration-300 ease-in-out ${
        sidebarVisible ? "w-72" : "w-0"
      } lg:w-72 border-r border-gray-700 bg-gray-800 text-white flex flex-col shadow-lg fixed lg:relative top-0 left-0 bottom-0`}
    >
      {/* Hamburger Menu for Small Screens */}
      <div
        className="lg:hidden absolute top-4 left-4 p-2 rounded-full cursor-pointer text-white"
        onClick={() => setSidebarVisible(!sidebarVisible)}
      >
        <Menu className="w-6 h-6" />
      </div>

      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-5 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-indigo-400" />
          <span className="font-semibold text-lg text-indigo-200">Contacts</span>
        </div>
        <div className="hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2 text-sm text-gray-400">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm border-gray-600"
            />
            Show online only
          </label>
        </div>
      </div>

      {/* Search Box */}
      <div className="p-4 bg-gray-900 border-b border-gray-700">
        <div className="relative">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 text-sm rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="w-4 h-4 absolute top-3 right-4 text-gray-400" />
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {filteredUsers.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">No users available</div>
        ) : (
          filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => handleUserSelect(user)}
              className={`w-full p-3 flex items-center gap-3 rounded-lg hover:bg-indigo-500 hover:ring-1 ring-indigo-400 transition-all ease-in-out ${
                selectedUser?._id === user._id ? "bg-indigo-600 ring-2 ring-indigo-500" : ""
              }`}
            >
              <div className="relative mx-auto lg:max-w-[50px]">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="w-12 h-12 object-cover rounded-full"
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                )}
              </div>

              <div className="flex-1 ml-3">
                <div className="font-medium text-lg text-indigo-100">{user.fullName}</div>
                <div className="text-sm text-gray-400">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
