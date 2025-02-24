let commandHistory = [];
let historyIndex = -1;
let personalData = null;
let currentTheme = 'auto';

document.addEventListener('DOMContentLoaded', () => {
    // Load personal data
    fetch('/data/data.json')
        .then(response => response.json())
        .then(data => {
            personalData = data;
            initializeTyped(data.terminal_intro);
            populateAboutSection(data.personal);
            populateContactSection(data.contact);
            initializeTerminal();
            setTerminalTheme('auto'); // Set initial theme based on OS
        })
        .catch(error => console.error('Error loading personal data:', error));

    // Load projects
    fetch('https://raw.githubusercontent.com/JollyJolli/json-db/refs/heads/main/data/webs/web-places.json')
        .then(response => response.json())
        .then(data => populateProjectsSection(data.Webs))
        .catch(error => console.error('Error loading projects:', error));
});

function getOperatingSystem() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes('mac')) return 'mac';
    if (userAgent.includes('win')) return 'windows';
    const linuxThemes = ['ubuntu', 'debian', 'arch'];
    return linuxThemes[Math.floor(Math.random() * linuxThemes.length)];
}

function setTerminalTheme(theme) {
    const terminal = document.querySelector('.terminal');
    const oldTheme = currentTheme;
    currentTheme = theme === 'auto' ? getOperatingSystem() : theme;

    // Remove old theme class
    terminal.classList.remove(`theme-${oldTheme}`);
    
    // Add new theme class
    terminal.classList.add(`theme-${currentTheme}`);
    
    // Update prompt based on theme
    const prompts = {
        mac: 'visitor@formen ~ %',
        windows: 'C:\\Users\\visitor>',
        ubuntu: 'visitor@formen:~$',
        debian: 'visitor@debian:~$',
        arch: '[visitor@arch ~]$'
    };
    
    document.querySelectorAll('.prompt').forEach(prompt => {
        prompt.textContent = prompts[currentTheme] || prompts.ubuntu;
    });
}

function initializeTerminal() {
    const terminal = document.querySelector('.terminal-content');
    const input = document.createElement('div');
    input.className = 'terminal-input';
    input.innerHTML = `<span class="prompt">visitor@formen:~$</span> <input type="text" autofocus>`;
    terminal.appendChild(input);

    const inputField = input.querySelector('input');
    inputField.addEventListener('keydown', handleTerminalInput);
    inputField.focus();

    // Keep focus on input when clicking terminal
    terminal.addEventListener('click', () => inputField.focus());
}

function handleTerminalInput(e) {
    if (e.key === 'Enter') {
        const command = e.target.value.trim().toLowerCase();
        if (command) {
            commandHistory.push(command);
            historyIndex = commandHistory.length;
            processCommand(command);
            e.target.value = '';
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            e.target.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            e.target.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            e.target.value = '';
        }
    }
}

function processCommand(command) {
    const terminal = document.querySelector('.terminal-content');
    const output = document.createElement('div');
    output.className = 'terminal-output';

    switch(command) {
        case 'help':
            output.innerHTML = `Available commands:
                <br>about - Display information about me
                <br>skills - List my technical skills
                <br>contact - Show contact information
                <br>projects - List my projects
                <br>clear - Clear terminal
                <br>matrix - Toggle Matrix effect
                <br>whoami - Display current user
                <br>theme - Show current theme
                <br>mac - Switch to macOS theme
                <br>windows - Switch to Windows theme
                <br>linux - Switch to random Linux theme
                <br>coffee - Make coffee ☕
                <br>help - Show this help message`;
            break;
        case 'about':
            output.innerHTML = `${personalData.personal.description}`;
            break;
        case 'skills':
            output.innerHTML = `My skills:\n${personalData.personal.skills.map(skill => `• ${skill}`).join('\n')}`;
            break;
        case 'contact':
            output.innerHTML = `Email: ${personalData.contact.email}\nGitHub: ${personalData.contact.social.github}`;
            break;
        case 'projects':
            output.innerHTML = 'Check out my projects section below! 👇';
            document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
            break;
        case 'clear':
            terminal.innerHTML = '';
            initializeTerminal();
            return;
        case 'clr':
            terminal.innerHTML = '';
            initializeTerminal();
            return;
        case 'theme':
            output.innerHTML = `Current theme: ${currentTheme}`;
            break;
        case 'mac':
            setTerminalTheme('mac');
            output.innerHTML = 'Switched to macOS theme';
            break;
        case 'windows':
            setTerminalTheme('windows');
            output.innerHTML = 'Switched to Windows theme';
            break;
        case 'linux':
            setTerminalTheme('auto');
            output.innerHTML = 'Switched to random Linux theme';
            break;
        case 'whoami':
            output.innerHTML = 'visitor';
            break;
        case 'coffee':
            output.innerHTML = 'Here\'s your coffee! ☕';
            break;
        default:
            output.innerHTML = `Command not found: ${command}. Type 'help' for available commands.`;
    }

    terminal.insertBefore(output, terminal.lastElementChild);
    terminal.lastElementChild.querySelector('input').focus();
}

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

setInterval(matrix, 30); // Increased animation speed

// Add glitch effect to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseover', () => {
        card.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
        setTimeout(() => {
            card.style.transform = 'translateY(-5px)';
        }, 100);
    });
});

// Add digital noise effect
function createNoise() {
    const noise = document.createElement('div');
    noise.className = 'noise';
    document.body.appendChild(noise);
}

createNoise();

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);
});