const lightbox = document.getElementById("lightbox");
const imgGrande = document.getElementById("img-grande");
const cerrar = document.getElementById("cerrar");
const info = document.querySelector(".overlay-info");

let secuencia = [];
let currentIndex = 0;

document.querySelectorAll(".work img").forEach(img => {
  img.addEventListener("click", () => {

    const work = img.parentElement;
    const titulo = work.querySelector(".info").textContent;

    const detalles = work.dataset.detalles
      ? JSON.parse(work.dataset.detalles)
      : [];

    secuencia = [
      { src: img.src, titulo },
      ...detalles.map(src => ({ src, titulo: titulo + " — detalle" }))
    ];

    currentIndex = 0;
    mostrar();
  });
});

function mostrar() {
  lightbox.style.display = "flex";
  imgGrande.src = secuencia[currentIndex].src;
  info.textContent = secuencia[currentIndex].titulo;
}

cerrar.addEventListener("click", () => {
  lightbox.style.display = "none";
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});
