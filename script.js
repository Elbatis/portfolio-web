let imagenes = Array.from(document.querySelectorAll(".work img"));
let currentIndex = 0;

const lightbox = document.getElementById("lightbox");
const imgGrande = document.getElementById("img-grande");
const cerrar = document.getElementById("cerrar");

// Crear overlay de info
const info = document.createElement("div");
info.classList.add("overlay-info");
lightbox.appendChild(info);

// Abrir imagen
imagenes.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    abrirImagen();
  });
});

function abrirImagen() {
  lightbox.style.display = "flex";
  imgGrande.style.opacity = 0;

  setTimeout(() => {
    imgGrande.src = imagenes[currentIndex].src;
    info.textContent = imagenes[currentIndex].nextElementSibling?.textContent || "";
    imgGrande.style.opacity = 1;
  }, 100);
}

// Navegación con teclado
document.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % imagenes.length;
      abrirImagen();
    }
    if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + imagenes.length) % imagenes.length;
      abrirImagen();
    }
    if (e.key === "Escape") {
      lightbox.style.display = "none";
    }
  }
});

// Click para cerrar
cerrar.addEventListener("click", () => {
  lightbox.style.display = "none";
});

lightbox.addEventListener("click", (e) => {
  if (e.target !== imgGrande) {
    lightbox.style.display = "none";
  }
});
