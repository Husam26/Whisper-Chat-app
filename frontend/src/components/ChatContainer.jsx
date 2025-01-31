import React, { useEffect, useRef, useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import { formatDate } from '../lib/utils';
import { toast } from 'react-hot-toast';
import { io } from 'socket.io-client';

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    clearChat,
    subscribeToMessages,
    unsubscribeFromMessages,
    markMessagesAsRead,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Initialize socket
  const socket = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    
    // Mark messages as read when the component mounts
    markMessagesAsRead(selectedUser._id);

    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessages, markMessagesAsRead, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages.length > 0) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Detect if user has scrolled to bottom & mark messages as read
  const handleScroll = () => {
    if (!chatContainerRef.current) return;
  
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const isAtBottom = scrollHeight - scrollTop <= clientHeight + 10;
  
    if (isAtBottom && selectedUser) {
      markMessagesAsRead(selectedUser._id); // Ensure it sends correct user ID
    }
  };

  const handleClearChat = async () => {
    try {
      await clearChat();
    } catch (error) {
      toast.error('Failed to clear chat.');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1a1a2e] text-white">
      <ChatHeader />
        
      <div className="flex-1 overflow-y-auto p-4 space-y-4"
      ref={chatContainerRef}
      onScroll={handleScroll}
      >
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message._id}
              className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
              ref={messageEndRef}
            >
              <div className="chat-image avatar">
                <div className="w-10 h-10 rounded-full border overflow-hidden">
                  <img
                    src={message.senderId === authUser._id
                      ? authUser.profilePic || '/avatar.png'
                      : selectedUser?.profilePic || '/avatar.png'}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="chat-content flex flex-col ml-3">
                <div className="chat-header mb-1">
                  <time className="text-xs opacity-50 ml-1">{formatDate(message.createdAt)}</time>
                </div>
                <div className="chat-bubble text-white max-w-[300px]">{message.text}</div>
                {message.image && (
                  <div className="chat-image mt-2 max-w-[200px]">
                    <img
                      src={message.image}
                      alt="attached"
                      className="max-w-full h-auto rounded-md"
                    />
                  </div>
                )}
                
                {/* Add "Seen" or "Unread" based on message's read status for YOUR messages only */}
                {message.senderId === authUser._id && message.isRead && (
                  <div className="text-xs text-gray-400 mt-1">Seen</div>
                )}
                {message.senderId === authUser._id && !message.isRead && (
                  <div className="text-xs text-gray-400 mt-1">Unread</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No messages yet.</p>
        )}
      </div>

      <div className="flex justify-between items-center p-4">
        <button
          onClick={handleClearChat}
          className="btn btn-sm btn-danger text-white hover:bg-red-600 transition duration-200"
        >
          Clear Chat
        </button>
        <MessageInput socket={socket.current} />
      </div>
    </div>
  );
};

export default ChatContainer;
