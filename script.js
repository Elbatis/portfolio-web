const imagenes = document.querySelectorAll(".work img");
const lightbox = document.getElementById("lightbox");
const imgGrande = document.getElementById("img-grande");
const cerrar = document.getElementById("cerrar");

imagenes.forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    imgGrande.src = img.src;
  });
});

cerrar.addEventListener("click", () => {
  lightbox.style.display = "none";
});

lightbox.addEventListener("click", (e) => {
  if (e.target !== imgGrande) {
    lightbox.style.display = "none";
  }
});
