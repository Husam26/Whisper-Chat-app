import React from 'react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import { X } from 'lucide-react'; // Assuming this is an icon you are using

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-4 border-b border-base-300 flex items-center justify-between bg-[#1a1a2e] text-white">
      <div className="flex items-center gap-4 flex-1">
        {/* Avatar */}
        <div className="relative">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden">
            <img
              src={selectedUser.profilePic || '/avatar.png'}
              alt={selectedUser.fullName}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Online Status Indicator */}
          {onlineUsers.includes(selectedUser._id) && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1a1a2e]"></span>
          )}
        </div>

        {/* User Info */}
        <div className="hidden sm:block">
          <h3 className="text-lg font-semibold">{selectedUser.fullName}</h3>
          <p className="text-sm text-gray-400">
            {onlineUsers.includes(selectedUser._id) ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={() => setSelectedUser(null)}
        className="p-2 rounded-lg hover:bg-gray-700 transition duration-200 focus:outline-none ml-auto sm:hidden"
      >
        <X className="w-6 h-6 text-gray-300 hover:text-white transition duration-200" />
      </button>
    </div>
  );
}

export default ChatHeader;
