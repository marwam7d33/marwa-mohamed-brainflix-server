import express from "express";
import cors from "cors";
import "dotenv/config";
const app = express();
const { PORT, BACKEND_URL, CORS_ORIGIN } = process.env;

// Fallback to allow all origins in development
// const allowedOrigin = CORS_ORIGIN || "http://localhost:5173";  // Default to local if CORS_ORIGIN is not set
const allowedOrigins = [
  "http://localhost:5173",
  "https://marwa-mohamed-brainflix.onrender.com"
];

// Middleware to handle CORS and JSON data
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  }
}));

// app.use(cors({ origin: allowedOrigin }));
app.use(express.json());
app.use(express.static("public")); // Serve static files like images from the 'public' folder

// Root route
app.get("/", (req, res) => {
  res.send("Hi 👋 you're connected to your server");
});

// Import and use video routes
import videoRoutes from "./routes/videos.js";
app.use("/videos", videoRoutes);

//comment

import commentRoutes from "./routes/comments.js";
//unified route
app.use("/videos", commentRoutes);
// Start the server and listen
app.listen(PORT, () => {
  console.log(`The server is listening on ${BACKEND_URL}:${PORT}`);
});
