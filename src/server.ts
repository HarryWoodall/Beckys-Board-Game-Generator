import express from "express";
import path from "path";
import game from "./game";

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.get("/game", (req, res) => {
  res.send(game());
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
