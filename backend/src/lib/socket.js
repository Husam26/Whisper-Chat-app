import { Server } from "socket.io";
import http from "http";
import express from "express";
import { getMessagesForUser, markMessagesAsRead } from "../services/messageService.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5176"], // Frontend URL
    },
});

export function getReceiverSocketId(userId) {
    return userSocketMap[userId]; // Return the socket ID for the user
}
// Store online users' socket IDs
const userSocketMap = {};

// Handle user connection
io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId; // Extract userId from the connection query

    // Add user to the userSocketMap
    if (userId) {
        userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // Mark messages as read when a user selects a contact
    socket.on('markMessagesAsRead', async (receiverId) => {
        try {
            const messages = await getMessagesForUser(receiverId); // Fetch messages for the receiverId
            messages.forEach(async (message) => {
                if (message.receiverId === receiverId && !message.isRead) {
                    message.isRead = true; // Update message status
                    await message.save();  // Persist the change to the database
                }
            });

            // After marking messages as read, update the database
            await markMessagesAsRead(receiverId);

            io.to(receiverId).emit('messagesRead', receiverId); // Notify the user their messages are marked as read
        } catch (err) {
            console.error("Error marking messages as read:", err);
        }
    });
    // Listen for disconnect event
    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getUsersOnline", Object.keys(userSocketMap));
    });
});

// Export the io, app, and server instances
export { io, app, server };
