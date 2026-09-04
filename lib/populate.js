// populate.js
function populateProjects(filter = 'all') {
  const projectGrid = document.getElementById('project-grid');
  if (!projectGrid) return;

  const filteredProjects = filter === 'all' 
    ? portfolioData.projects 
    : portfolioData.projects.filter(project => project.category === filter);

  projectGrid.innerHTML = filteredProjects.map(project => `
    <div class="project-card" data-category="${project.category}">
      <div class="project-image">
        <img src="${project.image}" alt="${project.title}" loading="lazy">
        <div class="project-overlay">
          <div class="project-links">
            <a href="${project.viewLink}" class="project-link" title="View Project">
              <i class='bx bx-show'></i>
            </a>
            <a href="${project.docLink}" class="project-link" title="Documentation">
              <i class='bx bx-code-alt'></i>
            </a>
          </div>
        </div>
      </div>
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-technologies">
          ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}