//* Libraries imports
import ffmpeg from "fluent-ffmpeg";
import ffmpegStatic from "ffmpeg-static";

if (!ffmpegStatic) throw new Error("ffmpeg-static is undefined");

ffmpeg.setFfmpegPath(ffmpegStatic);

/**
 * Convert an mp4 video to mp3
 */

export const convertToMP3 = (videoPath: string) =>
  new Promise<void>((resolve, reject) => {
    ffmpeg()
      .input(videoPath)
      .outputOptions("-ab", "20k")
      .saveToFile(`v${videoPath.replace(".mp4", "")}.mp3`)
      .on("end", () => {
        console.log("[END_CONVERT]", videoPath);
        resolve();
      })
      .on("error", (err) => {
        console.log("[ERROR_CONVERT]", videoPath);
        reject(err);
      });
  });
