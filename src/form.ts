import { startLoading, stopLoading, loadingMessage } from "./loading";
import { loadVideo } from "./youtube-api";

const form = document.querySelector<HTMLFormElement>("#form")!;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    loadingMessage("Iniciando a aplicação...");
    startLoading();

    const formData = new FormData(form);
    const url = formData.get("url")!;

    await loadVideo(url.toString());
  } catch (error) {
    console.error("[SUBMIT ERROR]", error);
  } finally {
    stopLoading();
    loadingMessage("");
  }
});
