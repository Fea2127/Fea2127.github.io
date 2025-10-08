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

// Back to top button functionality
document.addEventListener('DOMContentLoaded', function () {
  const backToTopButton = document.querySelector('.back-to-top');
  
  if (!backToTopButton) {
    console.error('Back to top button not found!');
    return;
  }

  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  });

  backToTopButton.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

/* ---------------  MOBILE MENU FUNCTIONALITY --------------- */
document.addEventListener('DOMContentLoaded', function() {
  const navCheck = document.getElementById('navCheck');
  const hamburger = document.querySelector('.hamburger');
  const closeBtn = document.querySelector('.close-btn');
  const navList = document.querySelector('.nav-list');
  
  if (!hamburger || !closeBtn || !navList) return;
  
  function openMenu() {
    navList.style.transform = 'translateX(0)';
    hamburger.style.display = 'none';
    closeBtn.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
  
  function closeMenu() {
    navList.style.transform = 'translateX(100%)';
    hamburger.style.display = 'block';
    closeBtn.style.display = 'none';
    document.body.style.overflow = '';
    if (navCheck) navCheck.checked = false;
  }
  
  hamburger.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
});