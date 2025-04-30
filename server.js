import express from "express";
import cors from "cors";
import "dotenv/config";
const app = express();
const { PORT, BACKEND_URL, CORS_ORIGIN } = process.env;

// Fallback to allow all origins in development
const allowedOrigin = CORS_ORIGIN || "http://localhost:5173";  // Default to local if CORS_ORIGIN is not set

// Middleware to handle CORS and JSON data
console.log("CORS_ORIGIN from .env:", CORS_ORIGIN);
console.log("Allowed Origin used for CORS:", allowedOrigin);
app.use(cors({ origin: allowedOrigin }));
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
