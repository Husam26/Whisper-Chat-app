import Message from '../models/message.model.js';

// Function to fetch messages for a user (receiverId is the user we're fetching messages for)
export const getMessagesForUser = async (receiverId) => {
    try {
        // Query the database to get all messages for the user where the receiverId matches
        const messages = await Message.find({ receiverId }).sort({ createdAt: -1 }); // Sorting by newest message first
        return messages;
    } catch (err) {
        console.error("Error fetching messages:", err);
        throw new Error("Failed to fetch messages");
    }
};

// Function to mark all messages as read for a user
export const markMessagesAsRead = async (receiverId) => {
    try {
        const result = await Message.updateMany(
            { receiverId, isRead: false }, // Only mark unread messages
            { $set: { isRead: true } } // Set the 'isRead' field to true
        );
        return result;
    } catch (err) {
        console.error("Error marking messages as read:", err);
        throw new Error("Failed to mark messages as read");
    }
};
