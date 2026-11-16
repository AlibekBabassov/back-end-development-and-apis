import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import weatherRouter from "./weather.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/info", (req, res) => {
  res.json({
    name: "Weather Service API",
    endpoints: [
      "GET /api/info",
      "GET /api/status",
      "GET /api/weather",
      "GET /api/weather/:city",
    ],
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/status", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/docs", (req, res) => {
  res.redirect("/api/info");
});

app.get("/api/greet/:name", (req, res) => {
  const { name } = req.params;
  res.json({ message: `Hello, ${name}!` });
});

app.route("/api/data")
  .get((req, res) => {
    res.json({ data: "Weather data" });
  })
  .post((req, res) => {
    res.status(201).json({ message: "Data created" });
  });

app.use("/api/weather", weatherRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});