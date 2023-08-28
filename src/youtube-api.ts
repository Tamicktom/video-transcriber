import { loadingMessage } from "./loading";

var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

export function getVideoId(url: string) {
  const [, part2] = url.split("?v=");
  const [videoId] = part2.split("&");

  return videoId;
}

//@ts-ignore
window.YTPlayer = null;

export function loadVideo(url: string) {
  loadingMessage("Carregando o vídeo...");

  return new Promise<void>((resolve, reject) => {
    //@ts-ignore
    window.YTPlayer = new YT.Player("youtubeVideo", {
      videoId: getVideoId(url),
      events: {
        onReady: () => resolve(),
        onError: (e) => reject(e),
      },
    });
  });
}
