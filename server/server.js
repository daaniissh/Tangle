import express from "express";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import NotificationRoutes from "./routes/notification.routes.js";
import dotenv from "dotenv";
import session from "express-session";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import connectMongo from "./db/databaseConnection.js";
import cookieParser from "cookie-parser";
import { createServer } from "http"; // Import HTTP server
import { Server } from "socket.io";
// import {MongoStore}
import User from "./models/user.model.js";
import MongoStore from "connect-mongo";

dotenv.config();
const app = express();

// Create HTTP server
const server = createServer(app);

// Attach Socket.io to the server
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173","https://tanglee.vercel.app"], // Allow frontend
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

// WebSocket connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("addUser", async (userId) => {
    try {
      if (userId) {
        await User.findByIdAndUpdate(userId, { socketId: socket.id });
        console.log(`Socket ID ${socket.id} associated with user ${userId}`);
      } else {
        console.log("Invalid user ID");
      }
    } catch (error) {
      console.error("Failed to update socket ID:", error.message);
    }
  });

  socket.on("sendNotification", async ({ from, to, type }) => {
    try {
      const recipient = await User.findById(to);
      if (recipient && recipient.socketId) {
        io.to(recipient.socketId).emit("getNotification", { from, type });
        console.log(`Notification sent to user ${to}`);
      } else {
        console.log(`User with ID ${to} not found or no socket ID associated.`);
      }
    } catch (error) {
      console.error("Error fetching user:", error.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_API_KEY,
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'fallback-secret-for-dev',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      collectionName: "sessions",
      ttl: 14 * 24 * 60 * 60, // Session TTL (14 days)
      autoRemove: 'native' // Automatic cleanup
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production'
    }
  })
);

app.use(express.json({ limit: "5mb" }));
app.use(
  cors({
    origin: ["http://localhost:5173","https://tanglee.vercel.app"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.get("/debug-session", (req, res) => {
  res.json({ session: req.session });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", NotificationRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "404 not found, Page not found" });
});

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 8000;
connectMongo()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error.message);
  });
