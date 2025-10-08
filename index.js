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