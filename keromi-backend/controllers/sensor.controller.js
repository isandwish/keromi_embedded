import {
  getAllSensorService,
  getLatestSensorService,
  getLatestFormattedService,
} from "../services/sensor.service.js";

export const getAllSensor = async (req, res) => {
  try {
    const data = await getAllSensorService();
    res.json(data);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

export const getLatestSensor = async (req, res) => {
  try {
    const data = await getLatestSensorService();
    res.json(data);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to fetch latest" });
  }
};

export const getLatestFormattedSensor = async (req, res) => {
  try {
    const data = await getLatestFormattedService();
    res.json(data);
  } catch (err) {
    console.error("Format error:", err);
    res.status(500).json({ error: "Failed to format latest" });
  }
};
