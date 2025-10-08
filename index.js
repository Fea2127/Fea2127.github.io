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
  
  // Debug: Check if button is found
  console.log('Back to top button:', backToTopButton);
  
  if (!backToTopButton) {
    console.error('Back to top button not found!');
    return;
  }

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
    console.log('Back to top clicked!'); // Debug
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
  const navCheck = document.getElementById('navCheck');
  const hamburger = document.querySelector('.hamburger');
  const closeBtn = document.querySelector('.close-btn');
  const navLinks = document.querySelectorAll('.nav-link');
  const body = document.body;

  // Function to close menu
  function closeMenu() {
    navCheck.checked = false;
    body.classList.remove('menu-open');
  }

  // Function to open menu
  function openMenu() {
    navCheck.checked = true;
    body.classList.add('menu-open');
  }

  // Toggle menu on hamburger click
  if (hamburger) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      openMenu();
    });
  }

  // Close menu on close button click
  if (closeBtn) {
    closeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      closeMenu();
    });
  }

  // Close menu when clicking on nav links
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      closeMenu();
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (navCheck.checked && !e.target.closest('.nav-list') && !e.target.closest('.hamburger')) {
      closeMenu();
    }
  });

  // Close menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navCheck.checked) {
      closeMenu();
    }
  });
});
