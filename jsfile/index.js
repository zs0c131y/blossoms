(() => {
  const dialog = document.querySelector(".film-dialog");
  const video = dialog.querySelector("video");
  let previousFocus;
  document.querySelectorAll("[data-open-film]").forEach((button) => {
    button.addEventListener("click", () => {
      previousFocus = button;
      dialog.showModal();
      document.body.style.overflow = "hidden";
      video
        .play()
        .then(() => {
          if (!dialog.open) video.pause();
        })
        .catch(() => {});
    });
  });
  dialog
    .querySelector(".dialog-close")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      )
        dialog.close();
    }
  });
  dialog.addEventListener("close", () => {
    video.pause();
    document.body.style.overflow = "";
    previousFocus?.focus();
  });
})();
