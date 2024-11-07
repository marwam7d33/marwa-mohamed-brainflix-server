import express from "express";
import fs from "fs";
import { v4 as uuid } from "uuid"; // to create a unique id
const router = express.Router();

//GET videos
router.route("/").get((req, res) => {
  const displayVideos = JSON.parse(fs.readFileSync("data/video-details.json"));
  res.json(displayVideos);
});

//get a video by ID
router.route("/:id").get((req, res) => {
  const { id } = req.params;

  try {
    const videoData = fs.readFileSync("data/video-details.json", "utf8");
    const videoDetails = JSON.parse(videoData);

    console.log("Requesting video with id:", id); // Log the id you're trying to find
    console.log("All video data:", videoDetails); // Log all the video data

    const singleVideo = videoDetails.find((video) => video.id === id);

    if (!singleVideo) {
      return res.status(404).send(`Error: could not find video with id: ${id}`);
    }

    res.json(singleVideo); // Send the specific video data
  } catch (error) {
    console.error("Error reading video data:", error);
    res.status(500).json({ error: "Failed to fetch video" });
  }
});

//POST a video

router.post("/", (req, res) => {
  const videoData = fs.readFileSync("data/video-details.json", "utf8");
  const videos = JSON.parse(videoData);

  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).send("Error! you MUST add a title and description");
  }

  //new video
  const newVideo = {
    id: uuid(),
    title,
    description,
    image: "http://localhost:8080/images/Upload-video-preview.jpg", // Hardcoded image path
    views: 0,
    likes: 0,
    comments: [],
  };

  videos.push(newVideo);
  fs.writeFileSync("data/video-details.json", JSON.stringify(videos, null, 2));

  // Respond with the new video data
  res.status(201).json(newVideo);
});

export default router;
