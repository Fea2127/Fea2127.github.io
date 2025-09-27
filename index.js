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
/* ---------------  VISITOR COUNT --------------- */
  // async function updateVisitorCount() {
  //     try {
  //       const response = await fetch('https://api.countapi.xyz/hit/fea2127-github-io/portfolio');
  //       const data = await response.json();
  //       document.getElementById('visitor-counter').textContent = 'Visitors: ' + data.value;
  //     } catch (err) {
  //       console.error('Error fetching visitor count:', err);
  //     }
  //   }

    // Update count on page load
    // updateVisitorCount();
// IMAGE / CERTIFICATE POPUP
const imgModal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");
const closeImgBtn = imgModal.querySelector(".close");

// Show certificate image in modal
document.querySelectorAll(".card img").forEach((img) => {
  img.addEventListener("click", () => {
    imgModal.style.display = "flex";
    modalImg.src = img.src;
  });
});

// Close by clicking X
closeImgBtn.onclick = () => {
  imgModal.style.display = "none";
};

// Close by clicking outside
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