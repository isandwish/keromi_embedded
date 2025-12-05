import express from "express";
import cors from "cors";
import sensorRoutes from "./routes/sensor.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/sensor", sensorRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
