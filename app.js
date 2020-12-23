const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.get("/api/audio/", (req, res) => {
  res.send("Hi, audio isn't ready yet 😉");
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
