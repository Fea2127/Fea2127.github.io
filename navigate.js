// navigate.js
function initializeNavigation() {
  // Create filter buttons
  createFilterButtons();
  
  // Initialize first load
  populateProjects();
  
  // Add smooth scrolling
  addSmoothScrolling();
}

function createFilterButtons() {
  const container = document.querySelector('.container');
  const title = document.querySelector('.section-title');
  
  const filterHTML = `
    <div class="project-filters">
      ${portfolioData.categories.map(category => `
        <button class="filter-btn ${category === 'all' ? 'active' : ''}" 
                data-filter="${category}">
          ${category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      `).join('')}
    </div>
  `;
  
  title.insertAdjacentHTML('afterend', filterHTML);
  
  // Add filter event listeners
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      populateProjects(btn.dataset.filter);
    });
  });
}

function addSmoothScrolling() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeNavigation);