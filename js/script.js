/* ============================================
   Pauline Zoe Tillmann — Portfolio
   Shared data + behaviour
   ============================================ */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* cat: "art" = freie künstlerische Arbeit (inkl. eigener Kunstfilme)
        "film" = Auftragsarbeit in der Filmproduktion */
const WORKS = [
  { id: 1, title: "Kleines Rauschen", year: 2019, cat: "art",
    medium: "Öl auf Leinwand, 60 × 80 cm", img: "images/_DSC1659.jpg",
    desc: "Eine frühe Arbeit über das Rauschen zwischen Formen — entstanden aus Skizzen, die über mehrere Wochen im Atelierfenster liegen blieben, bevor die eigentliche Leinwand begann. [Platzhaltertext]" },
  { id: 2, title: "Nachtfahrt", year: 2020, cat: "art",
    medium: "Kunstfilm · Regie · 14 Min.", img: "images/work-2.svg",
    desc: "Ein nächtlicher Kunstfilm über zwei Fremde in einem Nachtbus. Eigenständig entwickelt, Regie und Montage in eigener Hand. [Platzhaltertext]" },
  { id: 3, title: "Fragmente I–IV", year: 2020, cat: "art",
    medium: "Tuschezeichnung, Serie aus 4 Blättern", img: "images/work-3.svg",
    desc: "Eine vierteilige Serie, die sich mit Unvollständigkeit als Formprinzip beschäftigt. [Platzhaltertext]" },
  { id: 4, title: "Lichtspiel", year: 2021, cat: "film",
    medium: "Musikvideo · Produktionsleitung", img: "images/work-4.svg",
    desc: "Produktionsleitung für ein Musikvideo mit aufwendiger Lichtchoreografie im Kundenauftrag. [Platzhaltertext]" },
  { id: 5, title: "Stillleben No. 7", year: 2021, cat: "art",
    medium: "Öl auf Leinwand, 50 × 50 cm", img: "images/work-5.svg",
    desc: "Teil einer fortlaufenden Stillleben-Reihe, die Alltagsobjekte in ungewohnte Kompositionen setzt. [Platzhaltertext]" },
  { id: 6, title: "Wurzelwerk", year: 2022, cat: "film",
    medium: "Dokumentarfilm · Produktionsleitung · 42 Min.", img: "images/work-6.svg",
    desc: "Ein dokumentarisches Langformat über drei Generationen einer Gärtnerfamilie, realisiert im Auftrag einer Produktionsfirma. [Platzhaltertext]" },
  { id: 7, title: "Übergänge", year: 2022, cat: "art",
    medium: "Mixed Media auf Holz, 90 × 120 cm", img: "images/work-7.svg",
    desc: "Eine großformatige Arbeit, die Malerei mit gefundenem Material kombiniert. [Platzhaltertext]" },
  { id: 8, title: "Schattenriss", year: 2023, cat: "art",
    medium: "Kunstfilm · Kamera · 9 Min.", img: "images/work-8.svg",
    desc: "Kameraarbeit für einen eigenen, experimentellen Kunstfilm, gedreht mit natürlichem Licht. [Platzhaltertext]" },
  { id: 9, title: "Innenräume", year: 2023, cat: "art",
    medium: "Öl auf Leinwand, 70 × 100 cm", img: "images/work-9.svg",
    desc: "Eine Untersuchung von Innenräumen als emotionale Landschaften. [Platzhaltertext]" },
  { id: 10, title: "Zwischenzeit", year: 2024, cat: "art",
    medium: "Experimentalfilm · Regie & Schnitt · 21 Min.", img: "images/work-10.svg",
    desc: "Die bisher persönlichste Arbeit: ein essayistischer Kunstfilm über Zeit und Erinnerung. [Platzhaltertext]" }
];

/* ---------- Nav active state ---------- */
(function markActiveNav() {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".topbar-nav a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === path) a.classList.add("active");
  });
})();

/* ---------- Stage: landing photo that becomes the gallery ---------- */
(function stage() {
  const wrap = document.getElementById("stageImageWrap");
  if (!wrap) return;

  const photo = document.getElementById("stagePhoto");
  const landingMark = document.getElementById("landingMark");
  const caption = document.getElementById("stageCaption");
  const indexEl = document.getElementById("stageIndex");
  const titleEl = document.getElementById("stageTitle");
  const metaEl = document.getElementById("stageMeta");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const filterBtns = document.querySelectorAll(".stage-filter");
  const prevZone = wrap.querySelector(".stage-click-prev");
  const nextZone = wrap.querySelector(".stage-click-next");

  const sorted = [...WORKS].sort((a, b) => a.year - b.year);
  let activeFilter = "all";
  let current = 0;
  let hasStartedBrowsing = false;

  function currentSet() {
    return activeFilter === "all" ? sorted : sorted.filter(w => w.cat === activeFilter);
  }

  function catLabel(cat) {
    return cat === "art" ? "Freie Arbeit" : "Auftragsarbeit";
  }

  function renderWork() {
    const set = currentSet();
    const work = set[current];
    if (!work) return;
    photo.src = work.img;
    photo.alt = `${work.title}, ${work.medium}`;
    indexEl.textContent = `${String(current + 1).padStart(2, "0")} / ${String(set.length).padStart(2, "0")}`;
    titleEl.textContent = work.title;
    metaEl.textContent = `${work.year} · ${work.medium} · ${catLabel(work.cat)}`;
  }

  function enterGalleryMode() {
    if (hasStartedBrowsing) return;
    hasStartedBrowsing = true;
    landingMark.classList.add("is-hidden");
    caption.hidden = false;
  }

  function goTo(newIndex) {
    const set = currentSet();
    current = ((newIndex % set.length) + set.length) % set.length;
    photo.classList.add("is-fading");
    window.setTimeout(() => {
      renderWork();
      photo.classList.remove("is-fading");
    }, prefersReducedMotion ? 0 : 160);
  }

  function next() { enterGalleryMode(); goTo(current + 1); }
  function prev() { enterGalleryMode(); goTo(current - 1); }

  // initial photo = first work chronologically, shown under the landing name
  renderWork();

  nextZone.addEventListener("click", next);
  prevZone.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.dataset.filter;
      current = 0;
      enterGalleryMode();
      renderWork();
    });
  });

  /* ---------- Wave distortion on hover (SVG filter) ---------- */
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

    wrap.addEventListener("pointerenter", () => { targetScale = 14; kick(); });
    wrap.addEventListener("pointerleave", () => { targetScale = 0; kick(); });
  }
})();
