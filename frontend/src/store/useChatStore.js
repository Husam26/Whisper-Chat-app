import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });

    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    // Listen for new messages
    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  clearChat: async () => {
    const { selectedUser } = get();
    if (!selectedUser) {
      toast.error("No user selected to clear the chat.");
      return;
    }

    try {
      await axiosInstance.delete(`/messages/clear/${selectedUser._id}`);
      set({ messages: [] });
      toast.success("Chat cleared successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to clear chat.");
    }
  },

  markMessagesAsRead: async () => {
    const { messages, selectedUser } = get();
  
    // Filter unread messages for the selected user only
    const unreadMessages = messages.filter(
      (message) => !message.isRead && message.senderId === selectedUser?._id
    );
  
    if (unreadMessages.length > 0) {
      try {
        console.log("Unread Messages for selected user:", unreadMessages);
  
        // Send a PATCH request for each unread message
        for (const message of unreadMessages) {
          const response = await axiosInstance.patch(`/messages/mark-read/${message._id}`);
          console.log(`Message ${message._id} marked as read. Response:`, response.data);
        }
  
        // Update the messages in the state to reflect the read status
        set({
          messages: messages.map((message) =>
            unreadMessages.some((unread) => unread._id === message._id)
              ? { ...message, isRead: true }
              : message
          ),
        });
  
        
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to mark messages as read.");
      }
    }
  },
}));
