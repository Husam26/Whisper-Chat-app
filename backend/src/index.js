  import express from "express";
  import dotenv from "dotenv";
  import authRoutes from "./routes/auth.route.js";
  import messageRoutes from "./routes/message.route.js";
  import cookieParser from "cookie-parser";
  import { connectDB } from "./lib/db.js";
  import cors from "cors";
  import { app, server } from "./lib/socket.js";

  dotenv.config();

  const PORT = process.env.PORT;

  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: "http://localhost:5176",
      methods: ["GET", "POST", "PUT", "DELETE","PATCH"], // Allowed methods
      credentials: true, // If you need to send cookies or authorization headers
    })
  );

  app.use("/api/auth", authRoutes);
  app.use("/api/messages", messageRoutes);

  server.listen(PORT, () => {
    console.log("Server is running on port :" + PORT);
    connectDB();
  });
