// Fetch project data from the provided URL
fetch('https://raw.githubusercontent.com/JollyJolli/json-db/main/data/webs/web-places.json')
  .then(response => response.json())
  .then(data => {
    const projects = data.Webs;
    displayProjects(projects);
    setupFilterButtons(projects);
  })
  .catch(error => console.error('Error fetching project data:', error));

// Function to display projects
function displayProjects(projects, filter = 'all') {
  const projectsContainer = document.querySelector('.projects-container');
  projectsContainer.innerHTML = ''; // Clear existing projects

  projects.forEach(project => {
    if (filter === 'new' && !project.nueva) return;
    if (filter === 'updated' && !project.act) return;
    if (filter === 'contributed' && !project.contribuido) return;
    if (filter === 'else' && (project.nueva || project.act || project.contribuido)) return;

    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');
    if (project.nueva) projectCard.classList.add('new');
    if (project.act) projectCard.classList.add('updated');
    if (project.contribuido) projectCard.classList.add('contributed');
    if (!project.nueva && !project.act && !project.contribuido) projectCard.classList.add('else');
    
    projectCard.innerHTML = `
      <i class="${project.icon}"></i>
      <h3>${project.titulo}</h3>
      <p>${project.descripcion}</p>
    `;
    projectCard.addEventListener('click', () => {
      window.open(project.link, '_blank');
    });
    projectsContainer.appendChild(projectCard);
  });
}

// Setup filter buttons with event listeners
function setupFilterButtons(projects) {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      displayProjects(projects, filter);
    });
  });
}
