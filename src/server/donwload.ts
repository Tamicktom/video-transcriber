//* Libraries imports
import ytdl from "ytdl-core";
import fs from "fs";

export const downloader = async (videoId: string) =>
  new Promise<void>((resolve, reject) => {
    const videoURL = `https://www.youtube.com/watch?v=${videoId}`;
    console.log("[START_DOWNLOAD]", videoURL);

    ytdl(videoURL, {
      quality: "lowestaudio",
      filter: "audioonly",
    })
      .on("end", () => {
        console.log("[END_DOWNLOAD]", videoURL);
        resolve();
      })
      .on("error", (err) => {
        console.log("[ERROR_DOWNLOAD]", videoURL);
        reject(err);
      })
      .pipe(fs.createWriteStream(`v${videoId}.mp4`));
  });
