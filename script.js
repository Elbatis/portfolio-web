let bloqueando = false;

// ===== LIGHTBOX CON NAVEGACIÓN GLOBAL =====

const lightbox = document.getElementById("lightbox");
const imgGrande = document.getElementById("img-grande");
const cerrar = document.getElementById("cerrar");

const info = document.createElement("div");
info.classList.add("overlay-info");
lightbox.appendChild(info);

const flechaIzq = document.createElement("span");
flechaIzq.textContent = "←";
flechaIzq.style.cssText = "position:absolute;left:40px;top:50%;transform:translateY(-50%);font-size:22px;cursor:pointer;color:#111;user-select:none;";
lightbox.appendChild(flechaIzq);

const flechaDer = document.createElement("span");
flechaDer.textContent = "→";
flechaDer.style.cssText = "position:absolute;right:40px;top:50%;transform:translateY(-50%);font-size:22px;cursor:pointer;color:#111;user-select:none;";
lightbox.appendChild(flechaDer);

let secuencia = [];
let currentIndex = 0;

function buildSecuencia() {
  secuencia = [];
  document.querySelectorAll(".work").forEach(work => {
    const img = work.querySelector("img");
    const titulo = work.querySelector(".info").textContent;
    const detalles = work.dataset.detalles ? JSON.parse(work.dataset.detalles) : [];
    secuencia.push({ src: img.src, titulo });
    detalles.forEach(src => secuencia.push({ src, titulo: titulo + " — detalle" }));
  });
}

document.querySelectorAll(".work").forEach(work => {
  work.querySelector("img").addEventListener("click", () => {
    buildSecuencia();
    const clickedSrc = work.querySelector("img").src;
    currentIndex = secuencia.findIndex(item => item.src === clickedSrc);
    abrirImagen();
  });
});

function abrirImagen() {
  lightbox.style.display = "flex";
  document.body.classList.add("lightbox-open");
  ...
}

function cerrarLightbox() {
  lightbox.style.display = "none";
  document.body.classList.remove("lightbox-open");
}

  imgGrande.style.transition = "opacity 0.6s ease";
  imgGrande.style.opacity = 0;

  setTimeout(() => {
    imgGrande.src = secuencia[currentIndex].src;
    info.textContent = secuencia[currentIndex].titulo;
    imgGrande.style.opacity = 1;
  }, 200);
}
flechaDer.addEventListener("click", (e) => {
  e.stopPropagation();
  cambiarImagen(1);
});

flechaIzq.addEventListener("click", (e) => {
  e.stopPropagation();
  cambiarImagen(-1);
});

document.addEventListener("keydown", (e) => {
  if (lightbox.style.display !== "flex") return;
if (e.key === "ArrowRight") cambiarImagen(1);
if (e.key === "ArrowLeft") cambiarImagen(-1);
  if (e.key === "Escape") cerrarLightbox();
});

cerrar.addEventListener("click", cerrarLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target !== imgGrande && e.target !== flechaIzq && e.target !== flechaDer) cerrarLightbox();
});

function cerrarLightbox() {
  lightbox.style.display = "none";
}

// ===== HERO SLIDESHOW =====

const heroImgs = [
  "images/arriba2.jpg", "images/arriba3.jpg", "images/arriba4.jpg",
  "images/arriba5.jpg", "images/arriba6.jpg", "images/arriba7.jpg",
  "images/arriba8.jpg", "images/arriba9.jpg", "images/arriba10.jpg",
  "images/arriba11.jpg", "images/arriba12.jpg", "images/arriba13.jpg",
  "images/arriba14.jpg", "images/arriba15.jpg", "images/arriba16.jpg"
];

let heroIndex = 0;
const heroEl = document.getElementById("hero-img");

setInterval(() => {
  heroIndex = (heroIndex + 1) % heroImgs.length;
  heroEl.style.opacity = 0;
  setTimeout(() => {
    heroEl.src = heroImgs[heroIndex];
    heroEl.style.opacity = 1;
  }, 600);
}, 10000);

// ===== FADE IN =====

const faders = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.1 });
faders.forEach(el => observer.observe(el));
