 /* ---------------  DARK / LIGHT --------------- */
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light");
  darkModeToggle.checked = true;
}
darkModeToggle.addEventListener("change", () => {
  body.classList.toggle("light");
  localStorage.setItem("theme", body.classList.contains("light") ? "light" : "dark");
});

/* ---------------  ACTIVE NAV LINK --------------- */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop - 100) current = sec.getAttribute("id");
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href").slice(1) === current);
  });
});

// IMAGE / CERTIFICATE POPUP
const imgModal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");
const closeImgBtn = imgModal.querySelector(".close");

document.querySelectorAll(".card img").forEach((img) => {
  img.addEventListener("click", () => {
    imgModal.style.display = "flex";
    modalImg.src = img.src;
  });
});

closeImgBtn.onclick = () => {
  imgModal.style.display = "none";
};
imgModal.onclick = (e) => {
  if (e.target === imgModal) imgModal.style.display = "none";
};

// KNOW MORE (Education Modal)
const knowMoreModal = document.getElementById("knowMoreModal");
const knowMoreBtn = document.getElementById("loadMore");
const closeKnowMoreBtn = knowMoreModal.querySelector(".close");

knowMoreBtn.onclick = () => {
  knowMoreModal.style.display = "flex";
};
closeKnowMoreBtn.onclick = () => {
  knowMoreModal.style.display = "none";
};

// ...existing code...

// PARTICLES.JS INTERACTIVE BACKGROUND
particlesJS("particles-js", {
  particles: {
    number: { value: 240, density: { enable: true, value_area: 800 } },
    color: { value: "#45a9e7" },
    shape: { type: "circle" },
    opacity: { value: 0.6, random: true, anim: { enable: true, speed: 1, opacity_min: 0.2 } },
    size: { value: 2, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#45a9e7",
      opacity: 0.2,
      width: 1
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out"
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});