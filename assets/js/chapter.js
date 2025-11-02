// ===== GLOBAL STATE =====
let chapterData = null;
let allTerms = [];  // Flattened list of all terms
let currentTermIndex = 0;
let chapterNum = 1;
let focusTimer = null;  // Timer for 10-second focus requirement

// ===== MOBILE TOGGLE STATE =====
let isMobileVizShowing = false;  // Track if visualization is currently visible on mobile

// ===== DOM ELEMENTS =====
const termsContainer = document.getElementById('terms-container');
const termsPanel = document.getElementById('terms-panel');
const vizFrame = document.getElementById('viz-frame');
const vizPlaceholder = document.getElementById('viz-placeholder');
const currentTermNum = document.getElementById('current-term-num');
const totalTerms = document.getElementById('total-terms');
const readCount = document.getElementById('read-count');
const totalActual = document.getElementById('total-actual');
const progressPercentage = document.getElementById('progress-percentage');
const chapterTitle = document.getElementById('chapter-title');
const resetProgressBtn = document.getElementById('reset-progress-btn');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', async () => {
    // Get chapter number from URL
    const urlParams = new URLSearchParams(window.location.search);
    chapterNum = parseInt(urlParams.get('chapter') || '1');

    // Load chapter data from JSON
    await loadChapterData(chapterNum);

    // Load progress from localStorage
    loadProgress();

    // Setup event listeners
    setupEventListeners();

    // Render all terms
    renderAllTerms();

    // Activate first term
    activateTerm(0);
});

// ===== LOAD CHAPTER DATA FROM JSON =====
async function loadChapterData(chapterNum) {
    try {
        const response = await fetch(`data/chapter${chapterNum}.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        chapterData = await response.json();

        // Update chapter title in breadcrumb
        chapterTitle.textContent = `Module ${chapterNum}: ${chapterData.title}`;

        // Flatten sections into a single array of terms
        allTerms = [];
        chapterData.sections.forEach(section => {
            // Add section header as a "term"
            allTerms.push({
                type: 'section',
                title: section.title,
                id: `section-${section.title.toLowerCase().replace(/\s+/g, '-')}`
            });

            // Add all terms from this section
            section.terms.forEach(term => {
                allTerms.push({
                    ...term,
                    type: 'term'
                });
            });
        });

        // Set total to count only actual terms (not section headers)
        const termCount = allTerms.filter(t => t.type === 'term').length;
        totalTerms.textContent = termCount;

    } catch (error) {
        console.error('Error loading chapter:', error);
        termsContainer.innerHTML = `
            <div class="bg-red-900 border border-red-700 rounded-lg p-6 text-center">
                <h2 class="text-xl font-bold text-white mb-2">Error Loading Chapter</h2>
                <p class="text-gray-300">${error.message}</p>
                <p class="text-gray-400 text-sm mt-2">Make sure data/chapter${chapterNum}.json exists</p>
            </div>
        `;
    }
}

// ===== RENDER ALL TERMS =====
function renderAllTerms() {
    termsContainer.innerHTML = '';

    allTerms.forEach((term, index) => {
        const termEl = createTermElement(term, index);
        termsContainer.appendChild(termEl);
    });
}

function createTermElement(term, index) {
    const div = document.createElement('div');
    div.className = 'term-card';
    div.dataset.index = index;

    if (term.type === 'section') {
        div.classList.add('section-header');
        div.innerHTML = `
            <h2>${term.title}</h2>
        `;
    } else {
        // Regular term
        const keywords = term.keywords && term.keywords.length > 0
            ? term.keywords.map(kw => `<span class="keyword-tag">${kw}</span>`).join('')
            : '';

        div.innerHTML = `
            <div class="term-title">
                ${term.title}
            </div>
            ${term.definition ? `<div class="term-definition">${term.definition}</div>` : ''}
            ${keywords ? `<div class="keywords">${keywords}</div>` : ''}
        `;
    }

    return div;
}

// ===== ACTIVATE TERM =====
function activateTerm(index) {
    if (index < 0 || index >= allTerms.length) return;

    currentTermIndex = index;

    // Reset mobile viz state when navigating to new term
    isMobileVizShowing = false;
    hideMobileVisualization();

    // Clear any existing focus timer
    if (focusTimer) {
        clearTimeout(focusTimer);
        focusTimer = null;
    }

    // Update visual state of all terms
    const allTermEls = document.querySelectorAll('.term-card');
    allTermEls.forEach((el, i) => {
        el.classList.remove('active');
        if (i === index) {
            el.classList.add('active');
        }
        // Mark as read if visited
        const term = allTerms[i];
        if (term.type === 'term' && term.visited) {
            el.classList.add('read');
        }
    });

    // Scroll to term (centered)
    const activeTermEl = allTermEls[index];
    if (activeTermEl) {
        activeTermEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Load visualization if term has one
    const currentTerm = allTerms[index];
    if (currentTerm.type === 'term' && currentTerm.hasViz) {
        loadVisualization(currentTerm.vizPath);
    } else {
        showPlaceholder();
    }

    // Show/hide mobile toggle button based on whether term has visualization
    const toggleBtn = document.getElementById('mobile-viz-toggle');
    if (toggleBtn) {
        if (currentTerm.type === 'term' && currentTerm.hasViz) {
            toggleBtn.style.display = 'flex';
        } else {
            toggleBtn.style.display = 'none';
        }
    }

    // Calculate which term number this is (excluding section headers)
    if (currentTerm.type === 'term') {
        const termsBeforeCurrent = allTerms.slice(0, index).filter(t => t.type === 'term').length;
        const currentTermNumber = termsBeforeCurrent + 1;
        currentTermNum.textContent = currentTermNumber;
    } else {
        // For section headers, show total terms read so far
        const termsBeforeCurrent = allTerms.slice(0, index).filter(t => t.type === 'term').length;
        currentTermNum.textContent = termsBeforeCurrent;
    }

    // Start 10-second focus timer
    if (currentTerm.type === 'term') {
        focusTimer = setTimeout(() => {
            markTermAsVisited(index);
            focusTimer = null;
        }, 10000); // 10 seconds
    }
}

// ===== NAVIGATION =====
function navigateNext() {
    if (currentTermIndex < allTerms.length - 1) {
        activateTerm(currentTermIndex + 1);
    }
}

function navigatePrev() {
    if (currentTermIndex > 0) {
        activateTerm(currentTermIndex - 1);
    }
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Arrow key navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            e.preventDefault();
            navigateNext();
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            navigatePrev();
        }
    });

    // Click on term to activate it
    termsContainer.addEventListener('click', (e) => {
        const termCard = e.target.closest('.term-card');
        if (termCard) {
            const index = parseInt(termCard.dataset.index);
            activateTerm(index);
        }
    });

    // Reset progress button
    if (resetProgressBtn) {
        resetProgressBtn.addEventListener('click', () => {
            if (confirm('Reset progress for this module?')) {
                // Clear localStorage for this chapter
                localStorage.removeItem(`chapter-${chapterNum}-progress`);

                // Reset all terms in memory
                allTerms.forEach(term => {
                    if (term.type === 'term') {
                        term.visited = false;
                        term.mastery = 0;
                    }
                });

                // Update display
                updateProgressDisplay();
                renderAllTerms();
                activateTerm(0);
            }
        });
    }

    // Create mobile toggle button (only on mobile)
    if (window.innerWidth < 768) {
        createMobileToggleButton();
    }
}

// ===== VISUALIZATION =====
function loadVisualization(path) {
    vizPlaceholder.classList.add('hidden');
    vizFrame.classList.remove('hidden');
    vizFrame.src = path;
}

function showPlaceholder() {
    vizFrame.classList.add('hidden');
    vizPlaceholder.classList.remove('hidden');
    vizFrame.src = '';
}

// ===== MOBILE TOGGLE BUTTON =====
function createMobileToggleButton() {
    const mainContainer = document.querySelector('.flex');
    if (!mainContainer) return;

    // Create toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'mobile-viz-toggle';
    toggleBtn.className = 'mobile-viz-toggle';
    toggleBtn.setAttribute('aria-label', 'Toggle visualization');
    toggleBtn.innerHTML = '→';

    // Add to main container
    mainContainer.appendChild(toggleBtn);

    // Add click handler
    toggleBtn.addEventListener('click', handleMobileToggle);
}

function handleMobileToggle() {
    const currentTerm = allTerms[currentTermIndex];

    // Only toggle if current term has visualization
    if (!currentTerm || currentTerm.type === 'section' || !currentTerm.hasViz) {
        return;
    }

    isMobileVizShowing = !isMobileVizShowing;

    if (isMobileVizShowing) {
        showMobileVisualization();
    } else {
        hideMobileVisualization();
    }
}

function showMobileVisualization() {
    const vizPanel = document.getElementById('viz-panel');
    const termsPanel = document.getElementById('terms-panel');
    const toggleBtn = document.getElementById('mobile-viz-toggle');

    if (vizPanel) {
        vizPanel.classList.add('mobile-viz-active');
    }
    if (termsPanel) {
        termsPanel.classList.add('mobile-viz-hidden');
    }
    if (toggleBtn) {
        toggleBtn.innerHTML = '←';
        toggleBtn.classList.add('active');
    }
}

function hideMobileVisualization() {
    const vizPanel = document.getElementById('viz-panel');
    const termsPanel = document.getElementById('terms-panel');
    const toggleBtn = document.getElementById('mobile-viz-toggle');

    if (vizPanel) {
        vizPanel.classList.remove('mobile-viz-active');
    }
    if (termsPanel) {
        termsPanel.classList.remove('mobile-viz-hidden');
    }
    if (toggleBtn) {
        toggleBtn.innerHTML = '→';
        toggleBtn.classList.remove('active');
    }
}

// ===== PROGRESS TRACKING WITH MASTERY =====
function markTermAsVisited(index) {
    const term = allTerms[index];

    if (term.type === 'term' && !term.visited) {
        term.visited = true;
        // Increment mastery on first visit
        term.mastery = Math.min(100, (term.mastery || 0) + 20);

        saveProgress();
        updateProgressDisplay();
    }
}

function saveProgress() {
    // Extract only the terms (not sections) for progress tracking
    const termProgress = allTerms
        .filter(t => t.type === 'term')
        .map(t => ({
            id: t.id,
            visited: t.visited || false,
            mastery: t.mastery || 0,
            lastVisited: t.visited ? Date.now() : null
        }));

    const progressData = {
        terms: termProgress,
        total: allTerms.filter(t => t.type === 'term').length,
        lastVisitedIndex: currentTermIndex,
        timestamp: Date.now()
    };

    localStorage.setItem(`chapter-${chapterNum}-progress`, JSON.stringify(progressData));
}

function loadProgress() {
    const savedProgress = localStorage.getItem(`chapter-${chapterNum}-progress`);

    if (savedProgress) {
        try {
            const data = JSON.parse(savedProgress);

            // Apply saved progress to loaded terms
            if (data.terms && Array.isArray(data.terms)) {
                data.terms.forEach(savedTerm => {
                    const term = allTerms.find(t => t.id === savedTerm.id);
                    if (term) {
                        term.visited = savedTerm.visited || false;
                        term.mastery = savedTerm.mastery || 0;
                    }
                });
            }
        } catch (error) {
            console.error('Error loading progress:', error);
        }
    }

    updateProgressDisplay();
}

function updateProgressDisplay() {
    const totalTermCount = allTerms.filter(t => t.type === 'term').length;
    const visitedCount = allTerms.filter(t => t.type === 'term' && t.visited).length;

    readCount.textContent = visitedCount;
    if (totalActual) {
        totalActual.textContent = totalTermCount;
    }

    // Calculate percentage (avoid division by zero)
    const percentage = totalTermCount > 0 ? Math.round((visitedCount / totalTermCount) * 100) : 0;
    if (progressPercentage) {
        progressPercentage.textContent = `${percentage}%`;
    }
}
