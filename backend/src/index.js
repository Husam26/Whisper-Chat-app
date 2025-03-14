  import express from "express";
  import dotenv from "dotenv";
  import authRoutes from "./routes/auth.route.js";
  import messageRoutes from "./routes/message.route.js";
  import cookieParser from "cookie-parser";
  import { connectDB } from "./lib/db.js";
  import cors from "cors";
  import { app, server } from "./lib/socket.js";
  import path from "path";

  dotenv.config();

  const PORT = process.env.PORT;
  const __dirname = path.resolve();

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

  if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));
    
    app.get("*",(req,res)=>{
      res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));

    })
  }

  server.listen(PORT, () => {
    console.log("Server is running on port :" + PORT);
    connectDB();
  });
