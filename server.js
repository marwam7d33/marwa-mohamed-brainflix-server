import express from "express";
import cors from "cors";
import "dotenv/config";
const app = express();
const { PORT, BACKEND_URL, CORS_ORIGIN } = process.env;

// Middleware to handle CORS and JSON data
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
app.use(express.static("public")); // Serve static files like images from the 'public' folder

// Root route
app.get("/", (req, res) => {
  res.send("Hi 👋 you're connected to your server");
});

// Import and use video routes
import videoRoutes from "./routes/videos.js";
app.use("/videos", videoRoutes);

// Start the server and listen
app.listen(PORT, () => {
  console.log(`The server is listening on ${BACKEND_URL}:${PORT}`);
});
