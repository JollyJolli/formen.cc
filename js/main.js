document.addEventListener('DOMContentLoaded', () => {
    // Load personal data
    fetch('/data/data.json')
        .then(response => response.json())
        .then(data => {
            initializeTyped(data.terminal_intro);
            populateAboutSection(data.personal);
            populateContactSection(data.contact);
        })
        .catch(error => console.error('Error loading personal data:', error));

    // Load projects
    fetch('https://raw.githubusercontent.com/JollyJolli/json-db/refs/heads/main/data/webs/web-places.json')
        .then(response => response.json())
        .then(data => populateProjectsSection(data.Webs))
        .catch(error => console.error('Error loading projects:', error));
});

function initializeTyped(introLines) {
    new Typed('#typed-output', {
        strings: introLines,
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        backDelay: 2000,
        cursorChar: '_'
    });
}

function populateAboutSection(personalData) {
    const aboutContent = document.getElementById('about-content');
    aboutContent.innerHTML = `
        <div class="about-grid">
            <div class="about-text">
                <h3><i class="fas fa-user-circle"></i> ${personalData.name}</h3>
                <p class="title"><i class="fas fa-laptop-code"></i> ${personalData.title}</p>
                <p class="description"><i class="fas fa-quote-left"></i> ${personalData.description}</p>
                <p class="location"><i class="fas fa-map-marker-alt"></i> ${personalData.location}</p>
                <p class="education"><i class="fas fa-graduation-cap"></i> ${personalData.education}</p>
            </div>
            <div class="skills-container">
                <h3><i class="fas fa-tools"></i> Skills</h3>
                <div class="skills-grid">
                    ${personalData.skills.map(skill => `<span class="skill-tag"><i class="fas fa-check-circle"></i> ${skill}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
}

function populateProjectsSection(projects) {
    const projectsGrid = document.getElementById('projects-grid');
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h3><i class="fas fa-project-diagram"></i> ${project.titulo.en}</h3>
            <p><i class="fas fa-info-circle"></i> ${project.descripcion.en}</p>
            <div class="project-links">
                <a href="${project.link}" target="_blank" rel="noopener noreferrer">
                    <i class="fas fa-external-link-alt"></i> Visit Project
                </a>
            </div>
        `;
        projectsGrid.appendChild(card);
    });
}

function populateContactSection(contactData) {
    const contactInfo = document.getElementById('contact-info');
    contactInfo.innerHTML = `
        <p><i class="fas fa-envelope"></i> <a href="mailto:${contactData.email}">${contactData.email}</a></p>
    `;

    const socialLinks = document.getElementById('social-links');
    const socialIcons = {
        github: 'fab fa-github',
        linkedin: 'fab fa-linkedin',
        twitter: 'fab fa-twitter',
        discord: 'fab fa-discord'
    };

    Object.entries(contactData.social).forEach(([platform, url]) => {
        if (url !== '#') {
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.innerHTML = `<i class="${socialIcons[platform]}"></i>`;
            socialLinks.appendChild(link);
        }
    });
}

// Matrix background effect
const canvas = document.createElement('canvas');
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1';
canvas.style.opacity = '0.1';
document.querySelector('.matrix-bg').appendChild(canvas);

const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const cols = Math.floor(width / 20);
const ypos = Array(cols).fill(0);

ctx.fillStyle = '#000';
ctx.fillRect(0, 0, width, height);

function matrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, width, height);
    
    ctx.fillStyle = '#0F0';
    ctx.font = '15pt monospace';
    
    ypos.forEach((y, ind) => {
        const text = String.fromCharCode(Math.random() * 128);
        const x = ind * 20;
        ctx.fillText(text, x, y);
        if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
        else ypos[ind] = y + 20;
    });
}

setInterval(matrix, 50);

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);
});