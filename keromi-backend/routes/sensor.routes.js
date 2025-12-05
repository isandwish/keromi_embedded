import express from "express";
import {
  getAllSensor,
  getLatestSensor,
  getLatestFormattedSensor,
} from "../controllers/sensor.controller.js";

const router = express.Router();

router.get("/", getAllSensor);
router.get("/latest", getLatestSensor);
router.get("/latest/formatted", getLatestFormattedSensor);

export default router;
