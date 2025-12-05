import express from "express";
import db from "../firebaseAdmin.js";

const router = express.Router();

// ดึง sensor data ทั้งหมด (timestamp keys อยู่ root)
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.ref("/").once("value");  // root node
    const data = snapshot.val();
    res.json(data);
  } catch (err) {
    console.error("Firebase fetch error:", err);
    res.status(500).json({ error: "Failed to fetch sensor data" });
  }
});

export default router;
