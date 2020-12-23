const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.get("/api/audio/", (req, res) => {
  res.sendFile("audio/24kGoldn - Mood ft. Iann Dior.mp3", { root: __dirname });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
