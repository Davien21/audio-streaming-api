const express = require("express");
const app = express();

app.get("/api/audio", (req, res) => {
  res.send("Hi, audio isn't ready yet 😉");
});
 