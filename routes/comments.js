import express from "express";
import fs from "fs";
import { v4 as uuid } from "uuid";

const router = express.Router();
const videosFilePath = "data/video-details.json";

// POST a comment on a specific video by ID
router.post("/:id/comments", (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  if (!comment) {
    return res.status(400).json({ error: "Comment is required" });
  }

  const videoData = fs.readFileSync(videosFilePath, "utf8");
  const videos = JSON.parse(videoData);
  //find video which comment will be added
  const video = videos.find((video) => video.id === id);

  if (!video) {
    return res.status(404).json({ error: "Video not found." });
  }

  //   new comment
  const newComment = {
    id: uuid(),
    comment,
    timestamp: Date.now(),
  };

  video.comments.push(newComment);

  // Save   updated videos
  fs.writeFileSync(videosFilePath, JSON.stringify(videos, null, 2));

  //   the new comment
  res.status(201).json(newComment);
});

export default router;
