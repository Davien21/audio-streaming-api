const express = require("express");
const app = express();
const fs = require("fs");
const port = process.env.PORT || 5000;
const audios = require("./audios");

const error = { status: false, data: null };

app.get("/api/audio/:id", (req, res) => {
  let audio = audios.find((audio) => audio.id === parseInt(req.params.id));
  if (!audio) return res.send({ ...error, message: "Invalid File Request" });

  const path = `audio/${audio.title}`;
  const stat = fs.statSync(path);
  const fileSize = stat.size;

  const range = req.headers.range;
  const fileContentType = "audio/mp3"

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    console.log(range)
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;

    const file = fs.createReadStream(path, { start, end });

    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": `${fileContentType}`,
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": `${fileContentType}`,
    };
    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
});

app.use(express.json())

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
