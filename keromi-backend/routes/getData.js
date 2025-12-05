import express from "express";
import { realtimeDB } from "../config/db.js";

const router = express.Router();

// GET latest sensor entry only
router.get("/", async (req, res) => {
  try {
    const snapshot = await realtimeDB
      .ref("/")
      .orderByKey()
      .limitToLast(1)
      .once("value");

    const data = snapshot.val();

    const latestKey = Object.keys(data)[0];
    const latestRecord = data[latestKey];

    res.json({
      key: latestKey,
      ...latestRecord
    });

  } catch (err) {
    console.error("Firebase fetch error:", err);
    res.status(500).json({ error: "Failed to fetch latest sensor data" });
  }
});

export default router;
