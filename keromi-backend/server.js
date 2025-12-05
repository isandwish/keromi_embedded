import express from "express";
import cors from "cors";
import getDataRouter from "./routes/getData.js";

const app = express();

app.use(cors());
app.use(express.json());

// Add routes
app.use("/api/v1/sensor", getDataRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
