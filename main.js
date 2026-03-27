const IMG_BASE = "images/extracted/menna-portfolio-assets/";
const BC_IMG = "images/extracted/beige-cream-portfolio/";

const PROJECTS = {
  bocofe: {
    title: "BOCOFE",
    subtitle:
      "Boho-style highway café · Warm materials, planting, and a calm traveler’s stop",
    imgBase: BC_IMG,
    slides: [
      "img_p004_006.png",
      "img_p005_007.png",
      "img_p005_008.png",
      "img_p005_009.png",
      "img_p005_010.png",
    ],
  },
  landscapeVilla: {
    title: "Landscape design · Villa",
    subtitle:
      "Soft, light palette · Greenery, subtle lighting, and simple elegance",
    imgBase: BC_IMG,
    slides: [
      "img_p006_011.jpeg",
      "img_p007_012.jpeg",
      "img_p007_013.jpeg",
      "img_p007_014.jpeg",
      "img_p007_015.jpeg",
    ],
  },
  mountainReception: {
    title: "Sustainable reception hotel",
    subtitle:
      "Mountain setting · Stone, wood, and eco-conscious hospitality arrival",
    imgBase: BC_IMG,
    slides: ["img_p008_016.jpeg", "img_p009_017.jpeg", "img_p009_018.jpeg"],
  },
  mountainGym: {
    title: "Sustainable hotel gym",
    subtitle:
      "Mountain views · Wood, stone, and daylight-focused fitness space",
    imgBase: BC_IMG,
    slides: [
      "img_p010_019.png",
      "img_p010_020.png",
      "img_p011_021.png",
      "img_p011_022.png",
    ],
  },
  mosque: {
    title: "Mosque design",
    subtitle: "Qur’anic inspiration · Serenity, light, and sacred proportion",
    imgBase: BC_IMG,
    slides: ["img_p012_023.jpeg", "img_p013_024.jpeg", "img_p013_025.jpeg"],
  },
  seasideRestaurant: {
    title: "Seaside restaurant",
    subtitle: "Tranquil coast · Natural materials and calm dining atmosphere",
    imgBase: BC_IMG,
    slides: [
      "img_p014_026.jpeg",
      "img_p015_027.jpeg",
      "img_p015_028.jpeg",
      "img_p015_029.jpeg",
    ],
  },
  flowerKiosk: {
    title: "Sustainable flower kiosk",
    subtitle:
      "Compact retail · Passive cooling, daylight, and responsible materials",
    imgBase: BC_IMG,
    slides: [
      "img_p020_037.jpeg",
      "img_p021_038.jpeg",
      "img_p021_039.jpeg",
    ],
  },
  seasideLandscape: {
    title: "Seaside landscape · Beach café",
    subtitle: "Coastal landscape · Setting for a beach-front café",
    imgBase: BC_IMG,
    slides: [
      "img_p028_051.jpeg",
      "img_p029_052.jpeg",
      "img_p029_053.jpeg",
    ],
  },
  apple: {
    title: "Apple Retail Concept (Personal Project)",
    subtitle:
      "Project Scope: High-fidelity 6x6 modular exhibition stand designed for rapid assembly and high-traffic retail engagement.",
    slideCaptions: [
      "Premium high-gloss PU paint with integrated tech hardware.",
      "CNC-milled MDF panels with 3D backlit acrylic branding.",
      "6000K recessed LED profiles + Tension fabric (SEG) lightboxes.",
      "Defined VR experience zone, VIP lounge, and product display.",
      "Spatial zoning optimized for visitor flow and dwell time.",
      "Modular display unit positioning and hardware clearance.",
      "10cm raised flooring for concealed cable management.",
      "Cam-lock modularity optimized for 5-ton truck transport.",
    ],
    slides: [
      "img_p002_001.jpeg",
      "img_p002_002.jpeg",
      "img_p002_003.jpeg",
      "img_p002_004.jpeg",
      "img_p003_005.jpeg",
      "img_p003_006.jpeg",
      "img_p003_007.jpeg",
      "img_p003_008.jpeg",
    ],
  },
  krispy: {
    title: "Krispy Kreme",
    subtitle: "Food court concept · Renders and technical plans",
    slides: [
      "img_p004_009.jpeg",
      "img_p004_010.jpeg",
      "img_p004_011.jpeg",
      "img_p004_012.jpeg",
      "img_p005_013.jpeg",
    ],
  },
  amazon: {
    title: "Amazon Office Concept (Personal Project)",
    subtitle:
      "Corporate office · Interiors, workstations, and technical drawings",
    slides: [
      "img_p006_014.jpeg",
      "img_p006_015.jpeg",
      "img_p006_016.jpeg",
      "img_p007_017.jpeg",
      "img_p007_018.jpeg",
      "img_p007_019.jpeg",
      "img_p007_020.jpeg",
      "img_p007_021.jpeg",
      "img_p007_022.jpeg",
      "img_p008_023.jpeg",
    ],
  },
  villa: {
    title: "Villa",
    subtitle: "Residential · Exterior studies and full drawing set",
    slides: [
      "img_p012_030.jpeg",
      "img_p012_031.jpeg",
      "img_p012_032.jpeg",
      "img_p012_033.jpeg",
      "img_p013_034.jpeg",
    ],
  },
  nbe: {
    title: "National Bank of Egypt Concept (Personal Project)",
    subtitle: "Conceptual flagship banking interior · Renders, plans, and sections",
    slides: [
      "img_p009_024.jpeg",
      "img_p009_025.png",
      "img_p009_026.jpeg",
      "img_p009_027.png",
      "img_p010_028.png",
      "img_p011_029.jpeg",
    ],
  },
};

document.getElementById("year").textContent = new Date().getFullYear();

const header = document.querySelector(".site-header");
const hero = document.querySelector(".hero");

if (header && hero && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      header.classList.toggle("site-header--past-hero", !entry.isIntersecting);
    },
    { root: null, threshold: 0, rootMargin: "-1px 0px 0px 0px" }
  );
  observer.observe(hero);
}

(function initLightbox() {
  const root = document.getElementById("project-lightbox");
  const imgEl = document.getElementById("lightbox-image");
  const titleEl = document.getElementById("lightbox-title");
  const subEl = document.getElementById("lightbox-subtitle");
  const counterEl = document.getElementById("lightbox-counter");
  const dotsEl = document.getElementById("lightbox-dots");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");
  const closeEls = root.querySelectorAll("[data-lightbox-close]");

  if (
    !root ||
    !imgEl ||
    !titleEl ||
    !subEl ||
    !counterEl ||
    !dotsEl ||
    !prevBtn ||
    !nextBtn
  ) {
    return;
  }

  let projectKey = null;
  let index = 0;

  function currentProject() {
    return PROJECTS[projectKey];
  }

  function render() {
    const p = currentProject();
    if (!p) return;
    const slides = p.slides;
    const base = p.imgBase || IMG_BASE;
    const slideCaption =
      Array.isArray(p.slideCaptions) && p.slideCaptions[index]
        ? p.slideCaptions[index]
        : p.subtitle;
    imgEl.src = base + slides[index];
    imgEl.alt = `${p.title} — slide ${index + 1} of ${slides.length}`;
    subEl.textContent = slideCaption;
    counterEl.textContent = `${index + 1} / ${slides.length}`;
    prevBtn.disabled = index <= 0;
    nextBtn.disabled = index >= slides.length - 1;
    const single = slides.length <= 1;
    prevBtn.hidden = single;
    nextBtn.hidden = single;
    counterEl.hidden = single;
    dotsEl.hidden = single;
    dotsEl.querySelectorAll("button").forEach((btn, i) => {
      btn.setAttribute("aria-selected", i === index ? "true" : "false");
    });
  }

  function buildDots(count) {
    dotsEl.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", `Go to image ${i + 1}`);
      b.addEventListener("click", () => {
        index = i;
        render();
      });
      dotsEl.appendChild(b);
    }
  }

  function open(key) {
    const p = PROJECTS[key];
    if (!p) return;
    projectKey = key;
    index = 0;
    titleEl.textContent = p.title;
    buildDots(p.slides.length);
    root.hidden = false;
    document.body.classList.add("is-lightbox-open");
    render();
    prevBtn.focus({ preventScroll: true });
  }

  function close() {
    root.hidden = true;
    document.body.classList.remove("is-lightbox-open");
    projectKey = null;
    imgEl.removeAttribute("src");
  }

  document.querySelectorAll(".project-tile[data-project]").forEach((btn) => {
    btn.addEventListener("click", () => open(btn.dataset.project));
  });

  prevBtn.addEventListener("click", () => {
    if (index > 0) {
      index -= 1;
      render();
    }
  });

  nextBtn.addEventListener("click", () => {
    const p = currentProject();
    if (p && index < p.slides.length - 1) {
      index += 1;
      render();
    }
  });

  closeEls.forEach((el) => el.addEventListener("click", close));

  document.addEventListener("keydown", (e) => {
    if (root.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft" && !prevBtn.disabled) {
      index = Math.max(0, index - 1);
      render();
    }
    if (e.key === "ArrowRight" && !nextBtn.disabled) {
      const p = currentProject();
      if (p) index = Math.min(p.slides.length - 1, index + 1);
      render();
    }
  });
})();
