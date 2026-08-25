/* ============================================
   Pauline Zoe Tillmann — Portfolio
   Work data + behaviour
   ============================================ */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* cat: "art" = freie künstlerische Arbeit (inkl. eigener Kunstfilme)
        "film" = Auftragsarbeit in der Filmproduktion
   images: Liste der Fotos zu diesem Werk (erstes Bild = Titelbild) */
const WORKS = [
  { id: 1, title: "kopfraum", year: 20123 cat: "art",
    medium: "Fotografie",
    images: ["images/DSC1639.jpg"],
    desc: "Eine frühe Arbeit über das Rauschen zwischen Formen — entstanden aus Skizzen, die über mehrere Wochen im Atelierfenster liegen blieben, bevor die eigentliche Leinwand begann. [Platzhaltertext]" },
  { id: 2, title: "Nachtfahrt", year: 2020, cat: "art",
    medium: "Kunstfilm · Regie · 14 Min.",
    images: ["images/P1067474.jpg"],
    desc: "Ein nächtlicher Kunstfilm über zwei Fremde in einem Nachtbus. Eigenständig entwickelt, Regie und Montage in eigener Hand. [Platzhaltertext]" },
  { id: 3, title: "Fragmente I–IV", year: 2020, cat: "art",
    medium: "Tuschezeichnung, Serie aus 4 Blättern",
    images: ["images/Fluidity_01.jpg"],
    desc: "Eine vierteilige Serie, die sich mit Unvollständigkeit als Formprinzip beschäftigt. [Platzhaltertext]" },
  { id: 4, title: "Lichtspiel", year: 2021, cat: "film",
    medium: "Musikvideo · Produktionsleitung",
    images: ["images/work-4.svg"],
    desc: "Produktionsleitung für ein Musikvideo mit aufwendiger Lichtchoreografie im Kundenauftrag. [Platzhaltertext]" },
  { id: 5, title: "Stillleben No. 7", year: 2021, cat: "art",
    medium: "Öl auf Leinwand, 50 × 50 cm",
    images: ["images/work-5.svg"],
    desc: "Teil einer fortlaufenden Stillleben-Reihe, die Alltagsobjekte in ungewohnte Kompositionen setzt. [Platzhaltertext]" },
  { id: 6, title: "Wurzelwerk", year: 2022, cat: "film",
    medium: "Dokumentarfilm · Produktionsleitung · 42 Min.",
    images: ["images/work-6.svg"],
    desc: "Ein dokumentarisches Langformat über drei Generationen einer Gärtnerfamilie, realisiert im Auftrag einer Produktionsfirma. [Platzhaltertext]" },
  { id: 7, title: "Übergänge", year: 2022, cat: "art",
    medium: "Mixed Media auf Holz, 90 × 120 cm",
    images: ["images/work-7.svg"],
    desc: "Eine großformatige Arbeit, die Malerei mit gefundenem Material kombiniert. [Platzhaltertext]" },
  { id: 8, title: "Schattenriss", year: 2023, cat: "art",
    medium: "Kunstfilm · Kamera · 9 Min.",
    images: ["images/work-8.svg"],
    desc: "Kameraarbeit für einen eigenen, experimentellen Kunstfilm, gedreht mit natürlichem Licht. [Platzhaltertext]" },
  { id: 9, title: "Innenräume", year: 2023, cat: "art",
    medium: "Öl auf Leinwand, 70 × 100 cm",
    images: ["images/work-9.svg"],
    desc: "Eine Untersuchung von Innenräumen als emotionale Landschaften. [Platzhaltertext]" },
  { id: 10, title: "Zwischenzeit", year: 2024, cat: "art",
    medium: "Experimentalfilm · Regie & Schnitt · 21 Min.",
    images: ["images/work-10.svg"],
    desc: "Die bisher persönlichste Arbeit: ein essayistischer Kunstfilm über Zeit und Erinnerung. [Platzhaltertext]" }
];

const sortedWorks = [...WORKS].sort((a, b) => a.year - b.year);

function catLabel(cat) {
  return cat === "art" ? "Freie Arbeit" : "Auftragsarbeit";
}

/* ---------- Landing page / photo stage ---------- */
(function stage() {
  const photoWrap = document.getElementById("stagePhotoWrap");
  if (!photoWrap) return;

  const photo = document.getElementById("stagePhoto");
  const landingName = document.getElementById("landingName");
  const prevArrow = document.getElementById("prevArrow");
  const nextArrow = document.getElementById("nextArrow");

  let current = 0;
  let hasNavigated = false;

  function render() {
    const work = sortedWorks[current];
    photo.src = work.images[0];
    photo.alt = work.title;
  }

  function goTo(newIndex) {
    current = ((newIndex % sortedWorks.length) + sortedWorks.length) % sortedWorks.length;
    photo.classList.add("is-fading");
    window.setTimeout(() => {
      render();
      photo.classList.remove("is-fading");
    }, prefersReducedMotion ? 0 : 150);
  }

  function hideLandingName() {
    if (hasNavigated) return;
    hasNavigated = true;
    landingName.classList.add("is-hidden");
  }

  function next() { hideLandingName(); goTo(current + 1); }
  function prev() { hideLandingName(); goTo(current - 1); }

  render();

  nextArrow.addEventListener("click", (e) => { e.stopPropagation(); next(); });
  prevArrow.addEventListener("click", (e) => { e.stopPropagation(); prev(); });

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });

  photoWrap.addEventListener("click", () => {
    const work = sortedWorks[current];
    window.location.href = `werk.html?id=${work.id}`;
  });

  /* Wave distortion on hover (SVG filter) */
  const waveDisplace = document.getElementById("waveDisplace");
  const waveTurb = document.getElementById("waveTurb");

  if (waveDisplace && waveTurb && !prefersReducedMotion) {
    let scale = 0;
    let targetScale = 0;
    let t = 0;
    let raf = null;

    function tick() {
      scale += (targetScale - scale) * 0.12;
      waveDisplace.setAttribute("scale", scale.toFixed(2));
      t += 0.006;
      const bf = 0.012 + Math.sin(t) * 0.004;
      waveTurb.setAttribute("baseFrequency", `${bf.toFixed(4)} ${(bf * 1.6).toFixed(4)}`);
      if (Math.abs(targetScale - scale) > 0.05 || targetScale > 0) {
        raf = requestAnimationFrame(tick);
      } else {
        waveDisplace.setAttribute("scale", "0");
        raf = null;
      }
    }
    function kick() { if (!raf) raf = requestAnimationFrame(tick); }

    photoWrap.addEventListener("pointerenter", () => { targetScale = 14; kick(); });
    photoWrap.addEventListener("pointerleave", () => { targetScale = 0; kick(); });
  }
})();

/* ---------- Work detail page ---------- */
(function workDetail() {
  const galleryEl = document.getElementById("workGallery");
  if (!galleryEl) return;

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  const work = WORKS.find(w => w.id === id) || sortedWorks[0];

  document.title = `${work.title} — Pauline Zoe Tillmann`;
  galleryEl.innerHTML = work.images
    .map(src => `<img src="${src}" alt="${work.title}" />`)
    .join("");
  document.getElementById("workTitle").textContent = work.title;
  document.getElementById("workMeta").textContent = `${work.year} · ${work.medium} · ${catLabel(work.cat)}`;
  document.getElementById("workDesc").textContent = work.desc;
})();
