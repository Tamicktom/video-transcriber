export function startLoading() {
  document.documentElement.classList.add("loading");
  console.log("startLoading");
}

export function stopLoading() {
  document.documentElement.classList.remove("loading");
  console.log("stopLoading");
}

export function loadingMessage(msg: string) {
  document.documentElement.dataset.message = msg;
}
