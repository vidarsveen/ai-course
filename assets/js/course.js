// ===== COURSE DATA =====
const VISUALIZATIONS = {
    "Token": { path: "visuals/tokens.html", icon: "🔤", desc: "See how text is broken into tokens" },
    "Temperature": { path: "visuals/temperature.html", icon: "🌡️", desc: "Control randomness and creativity" },
    "Top-p": { path: "visuals/temperature.html", icon: "🌡️", desc: "Nucleus sampling controls" },
    "Top-k": { path: "visuals/temperature.html", icon: "🌡️", desc: "Top-k sampling controls" },
    "Transformer": { path: "visuals/transformer.html", icon: "🔍", desc: "How attention mechanisms work" },
    "RAG (Retrieval-Augmented Generation)": { path: "visuals/rag.html", icon: "📚", desc: "Retrieval-Augmented Generation flow" }
};

// Global state
let sections = [];
let currentSectionIndex = 0;
let readSections = new Set();

// DOM Elements
const contentPanel = document.getElementById('content-panel');
const sectionsContainer = document.getElementById('sections-container');
const vizPanel = document.getElementById('viz-panel');
const vizGrid = document.getElementById('viz-grid');
const vizFrameContainer = document.getElementById('viz-frame-container');
const vizFrame = document.getElementById('viz-frame');
const vizTitle = document.getElementById('viz-title');
const vizSubtitle = document.getElementById('viz-subtitle');
const toggleVizBtn = document.getElementById('toggle-viz-btn');
const closeVizPanelBtn = document.getElementById('close-viz-panel');
const prevSectionBtn = document.getElementById('prev-section');
const nextSectionBtn = document.getElementById('next-section');
const sectionCounter = document.getElementById('section-counter');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', async () => {
    await loadChapterContent();
    setupEventListeners();
    renderCurrentSection();
    updateProgress();
});

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Toggle visualization panel
    toggleVizBtn.addEventListener('click', toggleVizPanel);
    closeVizPanelBtn.addEventListener('click', closeVizPanel);

    // Navigation
    prevSectionBtn.addEventListener('click', () => navigateSection(-1));
    nextSectionBtn.addEventListener('click', () => navigateSection(1));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && !prevSectionBtn.disabled) {
            navigateSection(-1);
        } else if (e.key === 'ArrowRight' && !nextSectionBtn.disabled) {
            navigateSection(1);
        }
    });

    // Visualization card clicks
    document.querySelectorAll('.viz-card-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const vizPath = btn.getAttribute('data-viz');
            const title = btn.getAttribute('data-title');
            openVisualization(vizPath, title);
        });
    });
}

// ===== CONTENT LOADING =====
async function loadChapterContent() {
    try {
        const response = await fetch('chapters/chapter1.md');
        const markdown = await response.text();
        sections = parseMarkdownIntoSections(markdown);
        console.log('Loaded sections:', sections.length);
    } catch (error) {
        console.error('Error loading chapter:', error);
        sectionsContainer.innerHTML = `
            <div class="bg-red-900 border border-red-700 rounded-lg p-6 text-center">
                <h2 class="text-xl font-bold text-white mb-2">Error Loading Content</h2>
                <p class="text-gray-300">${error.message}</p>
            </div>
        `;
    }
}

// ===== MARKDOWN PARSING =====
function parseMarkdownIntoSections(markdown) {
    const lines = markdown.split('\n');
    const parsedSections = [];
    let currentSection = null;

    lines.forEach(line => {
        // Check for H2 or H3 headings
        const h2Match = line.match(/^##\s+(.+)$/);
        const h3Match = line.match(/^###\s+(.+)$/);

        if (h2Match) {
            // Save previous section
            if (currentSection) {
                parsedSections.push(currentSection);
            }
            // Start new H2 section (major section)
            currentSection = {
                level: 2,
                title: h2Match[1].trim(),
                content: '',
                type: 'section-header',
                hasViz: false,
                vizPath: null
            };
        } else if (h3Match) {
            // Save previous section
            if (currentSection) {
                parsedSections.push(currentSection);
            }
            // Start new H3 section (concept)
            const title = h3Match[1].trim();
            currentSection = {
                level: 3,
                title: title,
                content: '',
                definition: '',
                keywords: '',
                type: 'concept',
                hasViz: false,
                vizPath: null,
                vizInfo: null
            };

            // Check if this concept has a visualization
            if (VISUALIZATIONS[title]) {
                currentSection.hasViz = true;
                currentSection.vizPath = VISUALIZATIONS[title].path;
                currentSection.vizInfo = VISUALIZATIONS[title];
            }
        } else if (currentSection) {
            // Add content to current section
            currentSection.content += line + '\n';

            // Extract definition and keywords
            if (line.startsWith('Definition:')) {
                currentSection.definition = line.replace('Definition:', '').trim();
            } else if (line.startsWith('Keywords:')) {
                currentSection.keywords = line.replace('Keywords:', '').trim();
            } else if (currentSection.definition && !line.startsWith('Keywords:') && line.trim() && !currentSection.keywords) {
                // Continue multi-line definition
                currentSection.definition += ' ' + line.trim();
            }
        }
    });

    // Save last section
    if (currentSection) {
        parsedSections.push(currentSection);
    }

    return parsedSections;
}

// ===== RENDERING =====
function renderCurrentSection() {
    sectionsContainer.innerHTML = '';

    // Show current section and a few around it for context
    const startIndex = Math.max(0, currentSectionIndex - 1);
    const endIndex = Math.min(sections.length - 1, currentSectionIndex + 1);

    for (let i = startIndex; i <= endIndex; i++) {
        const section = sections[i];
        const isCurrent = i === currentSectionIndex;
        const sectionEl = createSectionElement(section, isCurrent);
        sectionsContainer.appendChild(sectionEl);

        // Scroll current section into view
        if (isCurrent) {
            setTimeout(() => {
                sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }

    // Update navigation buttons
    updateNavigationButtons();
    updateSectionCounter();

    // Auto-open visualization if section has one
    const currentSection = sections[currentSectionIndex];
    if (currentSection && currentSection.hasViz) {
        openVisualization(currentSection.vizPath, currentSection.title);
    } else {
        // Show viz grid if no specific viz
        showVizGrid();
    }

    // Mark section as read
    markSectionAsRead(currentSectionIndex);
    updateProgress();
}

function createSectionElement(section, isCurrent) {
    const div = document.createElement('div');
    div.className = `section-card ${isCurrent ? 'current' : 'context'} ${section.type === 'section-header' ? 'section-header' : 'concept-card'}`;

    if (section.type === 'section-header') {
        // Render section header
        div.innerHTML = `
            <h2 class="text-2xl font-bold text-white mb-2">${section.title}</h2>
        `;
    } else {
        // Render concept card
        const keywords = section.keywords ? section.keywords.split(',').map(kw =>
            `<span class="keyword-tag">${kw.trim()}</span>`
        ).join('') : '';

        const vizButton = section.hasViz ? `
            <button class="viz-button-inline" onclick="openVisualization('${section.vizPath}', '${section.title}')">
                ${section.vizInfo.icon} Explore ${section.title} Visualization
            </button>
        ` : '';

        div.innerHTML = `
            <div class="concept-title-section">
                <h3 class="concept-title">${section.title}</h3>
                ${section.hasViz ? `<span class="has-viz-badge">${section.vizInfo.icon} Has Demo</span>` : ''}
            </div>
            ${section.definition ? `<p class="concept-definition">${section.definition}</p>` : ''}
            ${vizButton}
            ${keywords ? `<div class="keywords">${keywords}</div>` : ''}
        `;
    }

    return div;
}

// ===== NAVIGATION =====
function navigateSection(direction) {
    const newIndex = currentSectionIndex + direction;
    if (newIndex >= 0 && newIndex < sections.length) {
        currentSectionIndex = newIndex;
        renderCurrentSection();
    }
}

function updateNavigationButtons() {
    prevSectionBtn.disabled = currentSectionIndex === 0;
    nextSectionBtn.disabled = currentSectionIndex === sections.length - 1;
}

function updateSectionCounter() {
    sectionCounter.textContent = `Section ${currentSectionIndex + 1} of ${sections.length}`;
}

// ===== PROGRESS TRACKING =====
function markSectionAsRead(index) {
    readSections.add(index);
}

function updateProgress() {
    const total = sections.length;
    const read = readSections.size;
    const percentage = (read / total) * 100;

    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `${read}/${total}`;
}

// ===== VISUALIZATION PANEL =====
function toggleVizPanel() {
    if (vizPanel.classList.contains('hidden-panel')) {
        vizPanel.classList.remove('hidden-panel');
        contentPanel.classList.remove('full-width');
        toggleVizBtn.textContent = '📊 Hide Visualization Panel';
    } else {
        vizPanel.classList.add('hidden-panel');
        contentPanel.classList.add('full-width');
        toggleVizBtn.textContent = '📊 Show Visualization Panel';
    }
}

function closeVizPanel() {
    vizPanel.classList.add('hidden-panel');
    contentPanel.classList.add('full-width');
    toggleVizBtn.textContent = '📊 Show Visualization Panel';
}

function openVisualization(path, title) {
    // Ensure panel is open
    vizPanel.classList.remove('hidden-panel');
    contentPanel.classList.remove('full-width');
    toggleVizBtn.textContent = '📊 Hide Visualization Panel';

    // Hide grid, show frame
    vizGrid.classList.add('hidden');
    vizFrameContainer.classList.remove('hidden');

    // Update title
    vizTitle.textContent = title;
    vizSubtitle.textContent = 'Interactive Demo';

    // Load iframe
    vizFrame.src = path;
}

function showVizGrid() {
    vizGrid.classList.remove('hidden');
    vizFrameContainer.classList.add('hidden');
    vizTitle.textContent = 'Interactive Demos';
    vizSubtitle.textContent = 'Select a concept to explore';
    vizFrame.src = '';
}

// Make openVisualization available globally for inline buttons
window.openVisualization = openVisualization;
