onload = () => {
  document.body.classList.remove("container");

  setTimeout(() => {
    window.scrollTo({
      top: document.body.scrollHeight, // posición final de la página
      behavior: "smooth", // scroll animado
    });
  }, 8500);
};
