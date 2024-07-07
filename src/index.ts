import express, { Request, Response } from "express";
import db from "./db"; // Import the database connection
import router from "./routes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}/api/v1`);
});
