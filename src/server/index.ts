//* Libraries imports
import express from "express";
import cors from "cors";
import z from "zod";

//* Local imports
import { downloader } from "./donwload.js";
import { convertToMP3 } from "./create-mp3.js";

const port = 3333;

const app = express();
app.use(cors());

app.get("/audio", async (req, res) => {
  const videoId = z.string().safeParse(req.query.v);

  try {
    //@ts-ignore
    if (!videoId.success) return res.status(400).json(videoId.error); // wtf typescript!!!???

    //download
    await downloader(videoId.data);

    //convert
    await convertToMP3(`v${videoId.data}.mp4`);

    return res.json({ videoId: videoId.data });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
