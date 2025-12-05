import express from "express";
import cors from "cors";
import getDataRouter from "./routes/getData.js";


const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/sensor", getDataRouter);

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
