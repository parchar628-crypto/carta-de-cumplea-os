(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function typeText(element, text, speed = 28) {
    if (reduceMotion) {
      element.textContent = text;
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      let i = 0;
      element.textContent = "";
      const tick = () => {
        element.textContent += text[i++];
        if (i < text.length) setTimeout(tick, speed);
        else resolve();
      };
      tick();
    });
  }

  function setContent() {
    const edad = CARTA.edad ? ` ${CARTA.edad} años` : "";
    $("saludo").textContent = CARTA.saludo;
    $("subtitulo").textContent = `${CARTA.nombre}${edad ? ` · ${edad.trim()}` : ""} — ${CARTA.subtitulo}`;
    $("portada").src = CARTA.portada;
    $("portada").alt = `Foto de ${CARTA.nombre}`;
    $("mensaje").textContent = CARTA.mensaje;
    $("firma").textContent = CARTA.firma;
    $("finalName").textContent = `¡Feliz cumpleaños, ${CARTA.nombre}!`;

    const gallery = $("gallery");
    gallery.innerHTML = "";
    CARTA.galeria.forEach((item, index) => {
      const button = document.createElement("button");
      button.className = "gallery-item";
      button.type = "button";
      button.innerHTML = `<img src="${item.src}" alt="Recuerdo ${index + 1}"><span>${item.texto}</span>`;
      button.addEventListener("click", () => openLightbox(item.src, item.texto));
      gallery.appendChild(button);
    });

    const wishList = $("wishList");
    wishList.innerHTML = "";
    CARTA.frases.forEach((frase, index) => {
      const div = document.createElement("div");
      div.className = "wish";
      div.textContent = `✨ ${frase}`;
      wishList.appendChild(div);
      if (!reduceMotion) setTimeout(() => div.classList.add("visible"), 120 * index);
      else div.classList.add("visible");
    });
  }

  function openLightbox(src, text) {
    $("lightboxImg").src = src;
    $("lightboxText").textContent = text;
    $("lightbox").classList.remove("hidden");
  }

  function closeLightbox() {
    $("lightbox").classList.add("hidden");
  }

  function makeParticles(count = 16) {
    if (reduceMotion) return;
    const icons = ["♡", "✦", "♥", "✧"];
    const root = $("particles");
    for (let i = 0; i < count; i++) {
      const p = document.createElement("span");
      p.className = "particle";
      p.textContent = icons[Math.floor(Math.random() * icons.length)];
      p.style.left = `${Math.random() * 100}%`;
      p.style.animationDuration = `${7 + Math.random() * 7}s`;
      p.style.animationDelay = `${Math.random() * 5}s`;
      p.style.fontSize = `${12 + Math.random() * 15}px`;
      root.appendChild(p);
      setTimeout(() => p.remove(), 16000);
    }
  }

  function launchConfetti(count = 110) {
    if (reduceMotion) {
      showToast("🎉 ¡Feliz cumpleaños!");
      return;
    }
    for (let i = 0; i < count; i++) {
      const piece = document.createElement("span");
      piece.className = "confetti";
      piece.style.left = `${Math.random() * 100}vw`;
      piece.style.setProperty("--x", `${-160 + Math.random() * 320}px`);
      piece.style.animationDuration = `${2.4 + Math.random() * 2.5}s`;
      piece.style.animationDelay = `${Math.random() * .5}s`;
      piece.style.background = `hsl(${Math.random() * 360}, 85%, 70%)`;
      piece.style.transform = `rotate(${Math.random() * 180}deg)`;
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 5200);
    }
    showToast("🎉 ¡Que empiece la celebración!");
  }

  let toastTimer;
  function showToast(message) {
    const toast = $("toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
  }

  $("openEnvelope").addEventListener("click", async () => {
    const wrap = $("envelopeWrap");
    if (wrap.classList.contains("open")) return;
    wrap.classList.add("open");
    await new Promise(r => setTimeout(r, reduceMotion ? 50 : 720));
    $("inicio").classList.add("hidden");
    $("letter").classList.remove("hidden");
    makeParticles();
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  $("surpriseBtn").addEventListener("click", () => {
    $("wishes").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    showToast("💖 Estos son mis deseos para ti...");
  });

  $("confettiBtn").addEventListener("click", () => launchConfetti());
  $("topBtn").addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));
  $("closeLightbox").addEventListener("click", closeLightbox);
  $("lightbox").addEventListener("click", (e) => { if (e.target === $("lightbox")) closeLightbox(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

  setContent();
})();
