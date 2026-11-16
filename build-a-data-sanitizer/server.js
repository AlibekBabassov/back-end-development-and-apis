import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { inputCleaner, inputValidator } from "./middleware.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.redirect("/form");
});

app.get("/form", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/submit", inputCleaner, inputValidator, (req, res) => {
  const { username, comment } = req.body;
  res.send(`Username: ${username}, Comment: ${comment}`);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});