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
import { Server } from "socket.io";
import User from "./models/user.model.js";
dotenv.config();
const app = express();
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 10,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    },
  })
);
app.use(express.json({ limit: "5mb" }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const io = new Server({
  cors: { origin: "http://localhost:5173", credentials: true },
  methods: ["GET", "POST"],
});


io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Associate socket ID with user ID
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

  // Handle sending notifications
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
io.listen(3000);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_API_KEY,
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", NotificationRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "404 not found, Page not found" });
});

const PORT = process.env.PORT || 8000;
connectMongo()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:8000 on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error.message);
  });
