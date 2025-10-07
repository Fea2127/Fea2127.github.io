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
 // Back to top button functionality
    document.addEventListener('DOMContentLoaded', function () {
      const backToTopButton = document.querySelector('.back-to-top');

      // Show/hide back to top button based on scroll position
      window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
          backToTopButton.classList.add('show');
        } else {
          backToTopButton.classList.remove('show');
        }
      });

      // Smooth scroll to top
      backToTopButton.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    });