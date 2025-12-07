import express from "express";
import {
  getAllSensor,
  getLatestSensor,
  getLatestFormattedSensor,
  getEnvironmentScore
} from "../controllers/sensor.controller.js";

const router = express.Router();

router.get("/", getAllSensor);
router.get("/latest", getLatestSensor);
router.get("/latest/formatted", getLatestFormattedSensor);

// POST /sensor/score
router.post("/score", getEnvironmentScore);

export default router;
