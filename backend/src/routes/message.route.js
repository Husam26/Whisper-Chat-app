import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUserForSidebar, getMessages, sendMessage, clearChat, markMessageAsRead } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUserForSidebar);

router.get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessage);

router.delete("/clear/:userId", protectRoute, clearChat);

// New route to mark messages as read
router.patch("/mark-read/:messageId", protectRoute, markMessageAsRead);

export default router;
