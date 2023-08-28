import { pipeline } from "@xenova/transformers";
import { loadingMessage } from "./loading";

export type Chunk = {
  timestamp: [number, number];
  text: string;
};

export type Transcription = {
  text: string;
  chunks: Chunk[];
};

let data = null;
// import data from "./data.json";

export async function transcribeAudio(videoId: string) {
  const options = {
    chunk_lenght_s: 30,
    stride_length_s: 5,
    language: "portuguese",
    task: "transcribe",
    return_timestamps: true,
  };

  try {
    console.time();
    loadingMessage("Transcribing audio...");
    console.log("[START_TRANSCRIPTION]");

    const transcriber = await pipeline(
      "automatic-speech-recognition",
      "Xenova/whisper-small"
    );

    console.log("[TRANSCRIBING_AUDIO]", videoId);
    data = await transcriber(`../vv${videoId}.mp3`, options);
  } catch (error) {
    console.error("[ERROR_TRANSCRIBE]", error);
    //@ts-ignore
    throw new Error(error);
  } finally {
    console.timeEnd();
    loadingMessage("Transcription complete!");
    console.log("[END_TRANSCRIPTION]");
  }

  return data as Transcription;
}
