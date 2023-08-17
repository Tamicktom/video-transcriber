//* Libraries imports
import axios from "axios";

//* Local imports
import { startLoading, stopLoading, loadingMessage } from "./loading";
import { loadVideo, getVideoId } from "./youtube-api";
import { transcribeAudio } from "./transcribe";

const form = document.querySelector<HTMLFormElement>("#form")!;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    loadingMessage("Iniciando a aplicação...");
    startLoading();

    const formData = new FormData(form);
    const url = formData.get("url")!.toString();

    await loadVideo(url);

    loadingMessage("Baixando o video...");
    // await axios.get("http://localhost:3333/audio?v=" + getVideoId(url));

    const data = await transcribeAudio(getVideoId(url));

    console.log(data);
  } catch (error) {
    console.error("[SUBMIT ERROR]", error);
  } finally {
    stopLoading();
    loadingMessage("");
  }
});
