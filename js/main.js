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

    // Add blinking cursor effect
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.innerHTML = '_';
    input.appendChild(cursor);

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
    
    // Split command and arguments
    const [cmd, ...args] = command.split(' ');

    switch(cmd) {
        case 'help':
            output.innerHTML = `
                <div style="color: #00ff00; margin-bottom: 10px;">Available Commands:</div>
                
                <div style="color: #4a9eff; margin: 5px 0;">📋 Portfolio Information:</div>
                about     - Display information about me
                skills    - List my technical skills
                contact   - Show contact information
                projects  - List my projects
                
                <div style="color: #4a9eff; margin: 5px 0;">🎨 Terminal Customization:</div>
                theme     - Show current theme
                mac       - Switch to macOS theme
                windows   - Switch to Windows theme
                linux     - Switch to random Linux theme
                color     - Change terminal colors (usage: color [fg] [bg])
                clear/cls - Clear terminal
                
                <div style="color: #4a9eff; margin: 5px 0;">📂 File Operations:</div>
                ls        - List directory contents
                pwd       - Print working directory
                cd        - Change directory (usage: cd [dir])
                mkdir     - Create directory (usage: mkdir [name])
                touch     - Create file (usage: touch [name])
                rm        - Remove file or directory (usage: rm [name])
                cat       - Display file contents (usage: cat [file])
                grep      - Search for pattern (usage: grep [pattern] [file])
                
                <div style="color: #4a9eff; margin: 5px 0;">🎮 Fun Commands:</div>
                hack      - Start hacking animation
                weather   - Show weather forecast
                fortune   - Display random fortune
                coffee    - Make coffee ☕
                matrix    - Toggle Matrix effect
                
                <div style="color: #4a9eff; margin: 5px 0;">ℹ️ System:</div>
                whoami    - Display current user
                echo      - Display text (usage: echo [text])
                date      - Show current date and time
                help      - Show this help message
                
                <div style="color: #00ff00; margin-top: 10px; font-size: 0.9em;">Tip: Commands marked with [arguments] require additional input</div>`;
            break;
        case 'pwd':
            output.innerHTML = '/home/visitor';
            break;
        case 'cd':
            output.innerHTML = args.length > 0 ? `Changed directory to ${args[0]}` : 'Usage: cd [directory]';
            break;
        case 'mkdir':
            output.innerHTML = args.length > 0 ? `Created directory ${args[0]}` : 'Usage: mkdir [name]';
            break;
        case 'touch':
            output.innerHTML = args.length > 0 ? `Created file ${args[0]}` : 'Usage: touch [name]';
            break;
        case 'rm':
            output.innerHTML = args.length > 0 ? `Removed ${args[0]}` : 'Usage: rm [name]';
            break;
        case 'cat':
            if (args.length > 0) {
                if (args[0] === 'Readme.txt') {
                    output.innerHTML = 'Welcome to my portfolio! Feel free to explore using the terminal commands.';
                } else {
                    output.innerHTML = `File not found: ${args[0]}`;
                }
            } else {
                output.innerHTML = 'Usage: cat [file]';
            }
            break;
        case 'grep':
            if (args.length >= 2) {
                const pattern = args[0];
                const filename = args[1];
                let fileContent = '';
                
                // Define some sample content for files
                const fileContents = {
                    'readme.txt': 'Welcome to my portfolio!\nFeel free to explore using the terminal commands.\nThis is a simulated file system.\nYou can use various commands to interact with it.',
                    'portfolio.html': '<!DOCTYPE html>\n<html>\n<head>\n<title>Portfolio</title>\n</head>\n<body>\nWelcome to my portfolio website\nCheck out my projects and skills\n</body>\n</html>',
                    'projects/notes.txt': 'Project Ideas:\n1. Web Development\n2. Mobile Apps\n3. Machine Learning\nStatus: In Progress'
                };

                // Convert filename to lowercase for case-insensitive comparison
                const lowercaseFilename = filename.toLowerCase();
                
                // Check if file exists in our simulated filesystem
                if (fileContents[lowercaseFilename]) {
                    fileContent = fileContents[lowercaseFilename];
                    const lines = fileContent.split('\n');
                    let matches = [];
                    
                    // Search for pattern in each line
                    lines.forEach((line, index) => {
                        if (line.toLowerCase().includes(pattern.toLowerCase())) {
                            matches.push(`<span style="color: #4a9eff">${index + 1}</span>: ${line.replace(
                                new RegExp(pattern, 'gi'),
                                match => `<span style="color: #00ff00">${match}</span>`
                            )}`);
                        }
                    });
                    
                    if (matches.length > 0) {
                        output.innerHTML = `Found ${matches.length} matches in ${filename}:\n${matches.join('\n')}`;
                    } else {
                        output.innerHTML = `No matches found for pattern '${pattern}' in ${filename}`;
                    }
                } else {
                    output.innerHTML = `File not found: ${filename}`;
                }
            } else {
                output.innerHTML = 'Usage: grep [pattern] [file]';
            }
            break;
        case 'hack':
            output.innerHTML = 'Initializing hack sequence...<br>';
            let hackText = '';
            let i = 0;
            const interval = setInterval(() => {
                hackText += Math.random().toString(36).substring(2, 15) + '<br>';
                output.innerHTML = hackText;
                i++;
                if (i > 10) {
                    clearInterval(interval);
                    output.innerHTML += '<br>Access granted! 🔓';
                }
            }, 100);
            break;
        case 'weather':
            output.innerHTML = '🌤️ Current weather:<br>Location: Cyberpunk City<br>Temperature: 23°C<br>Condition: Partly cloudy with a chance of binary rain';
            break;
        case 'fortune':
            const fortunes = [
                '"The best way to predict the future is to create it." - Peter Drucker',
                '"Code is like humor. When you have to explain it, its bad." - Cory House',
                '"The only way to do great work is to love what you do." - Steve Jobs',
                '"Life is short, use Python." - Bruce Eckel',
                '"Talk is cheap. Show me the code." - Linus Torvalds'
            ];
            output.innerHTML = fortunes[Math.floor(Math.random() * fortunes.length)];
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
        case 'cls':
            terminal.innerHTML = '';
            initializeTerminal();
            return;
        case 'color':
            if (args.length >= 2) {
                const [fg, bg] = args;
                // Validate color format
                const isValidColor = color => /^#([0-9A-Fa-f]{3}){1,2}$/.test(color) || /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/.test(color);
                
                if (!isValidColor(fg) || !isValidColor(bg)) {
                    output.innerHTML = 'Invalid color format. Please use hex (#RRGGBB) or RGB format.';
                    break;
                }

                // Apply colors to terminal
                const terminal = document.querySelector('.terminal');
                terminal.style.setProperty('--terminal-text', fg);
                terminal.style.setProperty('--terminal-bg', bg);
                
                // Update input text color
                const inputs = terminal.querySelectorAll('input');
                inputs.forEach(input => input.style.color = fg);
                
                output.innerHTML = `Terminal colors updated to: fg=${fg}, bg=${bg}`;
            } else {
                output.innerHTML = 'Usage: color [foreground] [background]\nExample: color #00ff00 #000000';
            }
            break;
        case 'echo':
            output.innerHTML = args.join(' ');
            break;
        case 'date':
            output.innerHTML = new Date().toLocaleString();
            break;
        case 'ls':
            output.innerHTML = 'Documents/\nProjects/\nReadme.txt\nportfolio.html';
            break;
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
            output.innerHTML = `
                <div style="color: #4a9eff; margin-bottom: 10px;">
                    <i class="fas fa-user"></i> User Information
                </div>
                <div style="margin-left: 10px;">
                    <div><i class="fas fa-id-badge" style="color: #00ff00;"></i> Username: visitor</div>
                    <div><i class="fas fa-user-tag" style="color: #00ff00;"></i> Role: Guest User</div>
                    <div><i class="fas fa-clock" style="color: #00ff00;"></i> Login Time: ${new Date().toLocaleTimeString()}</div>
                    <div><i class="fas fa-terminal" style="color: #00ff00;"></i> Terminal: ${currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)} Terminal</div>
                    <div><i class="fas fa-shield-alt" style="color: #00ff00;"></i> Permissions: Read-only</div>
                </div>`;
            break;
        case 'coffee':
            output.innerHTML = 'Here\'s your coffee! ☕';
            break;
        default:
            output.innerHTML = `Command not found: ${command}. Type <helpCommands style="color:red;">'help'</helpCommands> for available commands.`;
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