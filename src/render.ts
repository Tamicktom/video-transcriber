import type { Transcription, Chunk } from "./transcribe";

const renderChunk = (chunk: Chunk) => `
<div class="chunk">
  <time>${getMinutes(chunk.timestamp)}</time>
  <p>
    ${groupedText(chunk)}
  </p>
</div>
`;

function getMinutes(timestamp: [number, number]) {
  const date = new Date();
  date.setTime(timestamp[0] * 1000);
  return date.toISOString().slice(14, 19);
}

//@ts-ignore
window.seek = function seek(event) {
  //@ts-ignore
  const seekTo = event.currentTarget?.dataset?.seekTo;
  //@ts-ignore
  window.YTPlayer.seekTo(seekTo);
  //@ts-ignore
  window.YTPlayer.playVideo();
};

function groupedText({ text, timestamp }: Chunk) {
  const words = text.split(" ");
  const groups: string[] = [];
  for (let i = 0; i < words.length; i++) {
    if (i % 3 === 0) {
      groups.push(words.slice(i, i + 3).join(" "));
    }
  }

  return groups
    .map((item, index) => {
      const [initialTime, finalTime] = timestamp;
      const seekTo =
        index === 0
          ? initialTime
          : (finalTime - initialTime) / groups.length - index + initialTime;

      return `<span onclick=seek(event) data-seek-to=${seekTo}>${item}</span>`;
    })
    .join(" ");
}

export function renderText({ chunks }: Transcription) {
  const formattedTranscription = chunks.map(renderChunk);
  const content = document.querySelector<HTMLDivElement>(
    ".transcription .content"
  )!;
  content.innerHTML = formattedTranscription.join("");
}
