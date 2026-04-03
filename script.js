// ===== ELEMENTOS =====

const lightbox = document.getElementById("lightbox");
const imgGrande = document.getElementById("img-grande");
const cerrar = document.getElementById("cerrar");
const info = document.querySelector(".overlay-info");

let secuencia = [];
let currentIndex = 0;

// ===== PRELOAD =====

function preload(srcArray) {
  srcArray.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// ===== ABRIR IMAGEN =====

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

    // 🔥 preload de toda la secuencia
    preload(secuencia.map(i => i.src));

    currentIndex = 0;
    mostrar(true);
  });
});

// ===== MOSTRAR CON FADE SUAVE =====

function mostrar(first = false) {
  lightbox.style.display = "flex";

  if (!first) {
    imgGrande.style.opacity = 0;
  }

  setTimeout(() => {
    imgGrande.src = secuencia[currentIndex].src;
    info.textContent = secuencia[currentIndex].titulo;

    requestAnimationFrame(() => {
      imgGrande.style.opacity = 1;
    });
  }, first ? 0 : 200);
}

// ===== NAVEGACIÓN =====

function siguiente() {
  currentIndex = (currentIndex + 1) % secuencia.length;
  mostrar();
}

function anterior() {
  currentIndex = (currentIndex - 1 + secuencia.length) % secuencia.length;
  mostrar();
}

// ===== TECLADO =====

document.addEventListener("keydown", (e) => {
  if (lightbox.style.display !== "flex") return;

  if (e.key === "ArrowRight") siguiente();
  if (e.key === "ArrowLeft") anterior();
  if (e.key === "Escape") cerrarLightbox();
});

// ===== SWIPE MOBILE =====

let startX = 0;

imgGrande.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

imgGrande.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      siguiente(); // swipe izquierda
    } else {
      anterior(); // swipe derecha
    }
  }
});

// ===== CERRAR =====

cerrar.addEventListener("click", cerrarLightbox);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) cerrarLightbox();
});

function cerrarLightbox() {
  lightbox.style.display = "none";
}
