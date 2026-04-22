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
    const titulo = work.querySelector(".info").textContent.trim();
    const detalles = work.dataset.detalles ? JSON.parse(work.dataset.detalles) : [];
    secuencia.push({ src: img.getAttribute("src"), titulo });
    detalles.forEach(src => secuencia.push({ src, titulo: "detalle de: " + titulo }));
  });
}

// Delegación de eventos: un solo listener en el documento
document.addEventListener("click", function(e) {
  const work = e.target.closest(".work");
  if (!work) return;
  const img = work.querySelector("img");
  if (!img) return;

  buildSecuencia();
  const clickedSrc = img.getAttribute("src");
  const idx = secuencia.findIndex(item => item.src === clickedSrc);
  if (idx === -1) return;
  currentIndex = idx;
  abrirImagen();
});

function abrirImagen() {
  lightbox.style.display = "flex";
  imgGrande.style.opacity = 0;
  setTimeout(() => {
    imgGrande.src = secuencia[currentIndex].src;
    info.textContent = secuencia[currentIndex].titulo;
    imgGrande.style.opacity = 1;
  }, 100);

  // Agrega un estado al historial para que el botón "atrás" cierre el lightbox
  if (!history.state || !history.state.lightboxAbierto) {
    history.pushState({ lightboxAbierto: true }, "");
  }
}

flechaDer.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % secuencia.length;
  abrirImagen();
});

flechaIzq.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + secuencia.length) % secuencia.length;
  abrirImagen();
});

document.addEventListener("keydown", (e) => {
  if (lightbox.style.display !== "flex") return;
  if (e.key === "ArrowRight") { currentIndex = (currentIndex + 1) % secuencia.length; abrirImagen(); }
  if (e.key === "ArrowLeft") { currentIndex = (currentIndex - 1 + secuencia.length) % secuencia.length; abrirImagen(); }
  if (e.key === "Escape") cerrarLightbox();
});

cerrar.addEventListener("click", cerrarLightbox);

lightbox.addEventListener("click", (e) => {
  if (e.target !== imgGrande && e.target !== flechaIzq && e.target !== flechaDer) cerrarLightbox();
});

function cerrarLightbox() {
  lightbox.style.display = "none";
  imgGrande.src = "";

  // Si hay un estado de lightbox en el historial, lo saca sin navegar afuera
  if (history.state && history.state.lightboxAbierto) {
    history.back();
  }
}

// Intercepta el botón "atrás" del navegador/móvil
window.addEventListener("popstate", (e) => {
  if (lightbox.style.display === "flex") {
    lightbox.style.display = "none";
    imgGrande.src = "";
  }
});

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

// ===== VER MÁS =====
function toggleVerMas() {
  const contenido = document.getElementById("series-ocultas");
  const flecha = document.getElementById("flecha-ver-mas");
  const texto = document.getElementById("texto-ver-mas");
  const visible = contenido.style.display !== "none";
  contenido.style.display = visible ? "none" : "block";
  flecha.textContent = visible ? "↓" : "↑";
  texto.textContent = visible ? "ver más" : "ver menos";
}
