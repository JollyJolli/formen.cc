// Variable to store the current filter state and language
let currentFilter = 'all';
let currentLanguage = 'es'; // Default language
let projects = []; // Store fetched projects data

// Function to fetch projects data from the external JSON file
async function fetchProjectsData() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/JollyJolli/json-db/refs/heads/main/data/webs/web-places.json');
    const data = await response.json();
    projects = data.Webs; // Store the fetched projects data
    displayProjects(projects); // Display projects after fetching
  } catch (error) {
    console.error('Error fetching projects data:', error);
  }
}

// Function to display projects
function displayProjects(projects, filter = 'all', language = currentLanguage) {
  const projectsContainer = document.querySelector('.projects-container');
  projectsContainer.innerHTML = ''; // Clear existing projects

  projects.forEach(project => {
    // Apply filter conditions
    if (filter === 'new' && !project.nueva) return;
    if (filter === 'updated' && !project.act) return;
    if (filter === 'contributed' && !project.contribuido) return;
    if (filter === 'else' && (project.nueva || project.act || project.contribuido)) return;

    // Create project card
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');
    if (project.nueva) projectCard.classList.add('new');
    if (project.act) projectCard.classList.add('updated');
    if (project.contribuido) projectCard.classList.add('contributed');
    if (!project.nueva && !project.act && !project.contribuido) projectCard.classList.add('else');

    // Use the desired language here
    projectCard.innerHTML = `
      <i class="${project.icon}"></i>
      <h3>${project.titulo[language]}</h3>
      <p>${project.descripcion[language]}</p>
    `;

    projectCard.addEventListener('click', () => {
      window.open(project.link, '_blank');
    });

    projectsContainer.appendChild(projectCard);
  });
}

// Setup filter buttons with event listeners
function setupFilterButtons() {
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');

      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));

      // Add active class to the clicked button
      button.classList.add('active');

      // Display filtered projects
      displayProjects(projects, filter, currentLanguage);
    });
  });
}

// Function to handle language switching
function handleLanguageSwitch() {
  const languageSwitcher = document.getElementById('language-switcher');
  languageSwitcher.addEventListener('change', () => {
    currentLanguage = languageSwitcher.value; // Update current language
    displayProjects(projects, currentFilter, currentLanguage); // Refresh displayed projects
  });
}

function changeLanguage(language) {
  const title = document.getElementById("landing-title");
  const description = document.getElementById("landing-description");
  const projectsTitle = document.getElementById("projects-title");
  const discordBtn = document.getElementById("discord");
  const landingWall = document.getElementById("landing-wall");

  // Update text based on selected language
  if (language === "en") {
    title.textContent = title.dataset.en;
    discordBtn.textContent = discordBtn.dataset.en;
    landingWall.textContent = landingWall.dataset.en;
    description.textContent = description.dataset.en;
    projectsTitle.textContent = projectsTitle.dataset.en;

    // Update filter button text
    document.getElementById("filter-all").textContent = "All";
    document.getElementById("filter-new").textContent = "New";
    document.getElementById("filter-updated").textContent = "Updated";
    document.getElementById("filter-contributed").textContent = "Contributed";
    document.getElementById("filter-else").textContent = "Others";
  } else if (language === "es") {
    title.textContent = title.dataset.es;
    description.textContent = description.dataset.es;
    projectsTitle.textContent = projectsTitle.dataset.es;
    discordBtn.textContent = discordBtn.dataset.es;
    landingWall.textContent = landingWall.dataset.es;

    // Update filter button text
    document.getElementById("filter-all").textContent = "Todos";
    document.getElementById("filter-new").textContent = "Nuevos";
    document.getElementById("filter-updated").textContent = "Actualizados";
    document.getElementById("filter-contributed").textContent = "Contribuidos";
    document.getElementById("filter-else").textContent = "Otros";
  }
}

// Event listener for the language switcher
document.getElementById("language-switcher").addEventListener("change", function() {
  changeLanguage(this.value);
});

// Initialize the application
fetchProjectsData(); // Fetch and display projects initially
setupFilterButtons(); // Setup filter buttons
handleLanguageSwitch(); // Setup language switch
