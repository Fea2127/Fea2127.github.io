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
 async function updateVisitorCount() {
      try {
        const response = await fetch('https://api.countapi.xyz/hit/fea2127.github.io/portfolio');
        const data = await response.json();
        document.getElementById('visitor-count').textContent = data.value;
      } catch (error) {
        console.error('Failed to fetch visitor count:', error);
      }
    }

    // Update the visitor count when page loads
    updateVisitorCount();