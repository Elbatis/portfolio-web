// ===== GALERÍA / LIGHTBOX =====

let imagenes = Array.from(document.querySelectorAll(".work img"));
let currentIndex = 0;

const lightbox = document.getElementById("lightbox");
const imgGrande = document.getElementById("img-grande");
const cerrar = document.getElementById("cerrar");

// Overlay de info
const info = document.createElement("div");
info.classList.add("overlay-info");
lightbox.appendChild(info);

// Flechas de navegación
const flechaIzq = document.createElement("span");
flechaIzq.textContent = "←";
flechaIzq.style.cssText = "position:absolute;left:40px;top:50%;transform:translateY(-50%);font-size:22px;cursor:pointer;color:#111;user-select:none;letter-spacing:0;";
lightbox.appendChild(flechaIzq);

const flechaDer = document.createElement("span");
flechaDer.textContent = "→";
flechaDer.style.cssText = "position:absolute;right:40px;top:50%;transform:translateY(-50%);font-size:22px;cursor:pointer;color:#111;user-select:none;letter-spacing:0;";
lightbox.appendChild(flechaDer);

// Abrir imagen al hacer click
imagenes.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    abrirImagen();
    iniciarAutoplay();
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
  if (lightbox.style.display !== "flex") return;

  if (e.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % imagenes.length;
    abrirImagen();
    reiniciarAutoplay();
  }
  if (e.key === "ArrowLeft") {
    currentIndex = (currentIndex - 1 + imagenes.length) % imagenes.length;
    abrirImagen();
    reiniciarAutoplay();
  }
  if (e.key === "Escape") {
    cerrarLightbox();
  }
});

// Navegación con flechas visuales
flechaDer.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % imagenes.length;
  abrirImagen();
  reiniciarAutoplay();
});

flechaIzq.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + imagenes.length) % imagenes.length;
  abrirImagen();
  reiniciarAutoplay();
});

// Cerrar
function cerrarLightbox() {
  lightbox.style.display = "none";
  detenerAutoplay();
}

cerrar.addEventListener("click", cerrarLightbox);

lightbox.addEventListener("click", (e) => {
  if (e.target !== imgGrande && e.target !== flechaIzq && e.target !== flechaDer) {
    cerrarLightbox();
  }
});

// ===== AUTOPLAY =====

let autoplay;

function iniciarAutoplay() {
  clearInterval(autoplay);
  autoplay = setInterval(() => {
    currentIndex = (currentIndex + 1) % imagenes.length;
    abrirImagen();
  }, 5000);
}

function reiniciarAutoplay() {
  detenerAutoplay();
  iniciarAutoplay();
}

function detenerAutoplay() {
  clearInterval(autoplay);
}

// ===== FADE IN AL HACER SCROLL =====

const faders = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.1 });

faders.forEach(el => observer.observe(el));
