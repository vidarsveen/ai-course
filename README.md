# LLM Terminology & Learning to Code with AI 🤖

Master Large Language Model concepts and practical hands-on coding with Gemini. An interactive web-based course with split-screen interface, visualizations, and progress tracking. Learn LLM terminology from fundamentals through building real applications.

## 🎯 Features

- **8 Learning Modules**: Organized learning path from fundamentals to deployment
- **92 Learning Terms**: Comprehensive coverage of AI concepts and practical skills
- **23+ Interactive Visualizations**: Hands-on demos for key concepts
- **JSON-Based Content**: Structured, human-editable chapter files
- **Progress Tracking**: Auto-saves to localStorage with mastery levels
- **Split-Screen Interface**: Visualizations (left) + Content (right)
- **10-Second Focus**: Terms only count as "read" after 10 seconds engagement
- **Arrow Key Navigation**: Keyboard shortcuts for easy browsing

## 📚 Course Structure (92 Total Terms)

### Module 1: AI Foundations & Core Concepts (10 terms)
Understanding LLMs and their place in AI

**Key Topics:**
- The AI Landscape hierarchy
- LLMs, Foundation Models, Transformers
- Tokens, Embeddings, Semantic Similarity
- Hallucinations, Knowledge Cutoff

**Visualizations:** 🤖 AI Hierarchy | 📊 Embeddings

---

### Module 2: Practical Prompting (13 terms)
Master effective communication with AI models

**Key Topics:**
- Prompt Engineering, Personas
- Zero-shot, 1-shot, Few-shot Learning
- Chain of Thought (CoT)
- Prompt/Completion, Message Roles

**Visualizations:** 🎯 Shot Learning | 🧠 CoT Examples | 💬 Prompt & Completion

---

### Module 3: Advanced Reasoning & Problem-Solving (6 terms)
Use AI to break down complex analytical tasks

**Key Topics:**
- Inference Budgeting, Test-Time Compute
- ReAct Pattern
- Evaluation Metrics, A/B Testing

---

### Module 4: Tools & Agents (10 terms)
Build autonomous systems with tool integration

**Key Topics:**
- RAG (Retrieval-Augmented Generation)
- Tool Invocation, Function Calling
- Agents, Autonomous Agents, Tool Orchestration
- MCP (Model Context Protocol)

**Visualizations:** 📚 RAG System | 🤖 Agent Architecture

---

### Module 5: Coding with AI Assistants (10 terms)
Leverage AI for your development workflow

**Key Topics:**
- Vibe Coding, Claude Code
- PyCharm, GitHub Integration
- Google Colab for notebooks
- AI Studio vs Gemini Enterprise

**Visualizations:** 🛠️ PyCharm Setup | 📓 Google Colab

---

### Module 6: Hands-On Coding with Gemini (19 terms)
Practical strategies for building applications with Gemini

**Key Topics (Context Management):**
- Project Dump Strategy
- Token Budget Awareness
- Context Refresh Pattern
- Multi-File Project Organization

**Key Topics (Development Workflow):**
- PyCharm Project Setup
- Requirements & Dependencies Management
- README-Driven Development
- Incremental Development Pattern
- Finding Libraries & Packages
- Streamlit for Python UI

**Key Topics (Web Development):**
- HTML/CSS/JS File Organization
- Gemini Canvas & Preview for HTML
- Working with Multi-File HTML Projects
- Publishing to Google Sites
- Migrating Complex HTML to PyCharm

**Key Topics (Debugging):**
- Effective Error Communication
- Breaking Out of AI Loops
- Prompt Patterns for Code Improvement
- Code Refactoring with AI

**Visualizations:** 📊 Dump Strategy | 🎨 Streamlit | 🌐 Canvas Workflow | 📄 HTML Consolidation

---

### Module 7: Choosing & Using AI Platforms (15 terms)
Understand different AI platforms and when to use them

**Key Topics:**
- OpenAI (GPT-4o, ChatGPT)
- Anthropic (Claude Sonnet/Opus)
- Google Gemini (2.5, AI Studio, Enterprise)
- Open-source models (Llama, Grok)
- APIs, Playgrounds, SDKs

---

### Module 8: Safety, Quality & Best Practices (9 terms)
Build responsible and reliable AI systems

**Key Topics:**
- Guardrails, Safety Filters
- AI Alignment
- Evaluation Metrics, A/B Testing
- Grounded Answering
- Structured Output

**Visualizations:** 🛡️ Safety & Quality System

---

## 🚀 Getting Started

### Run with Local Server (Required)

```bash
python -m http.server 8000

# Then open: http://localhost:8000
```

### Navigate the Course

1. **Overview Page** (`index.html`): Select a chapter
2. **Reading View** (`chapter.html`): Read terms, view visualizations
3. **Arrow Keys**: Navigate between terms (← → or ↑ ↓)
4. **Progress**: Automatically saved to localStorage

---

## 📁 File Structure

```
ai-course/
├── index.html                  # Main menu with progress tracking
├── chapter.html                # Chapter reading interface
├── requirements.txt            # Python dependencies
├── convert_md_to_json.py       # Markdown → JSON converter (utility)
├── README.md                   # This file
│
├── data/                       # Course content (JSON)
│   ├── chapter1.json          # Module 1: AI Foundations (10 terms)
│   ├── chapter2.json          # Module 2: Practical Prompting (13 terms)
│   ├── chapter3.json          # Module 3: Advanced Reasoning (6 terms)
│   ├── chapter4.json          # Module 4: Tools & Agents (10 terms)
│   ├── chapter5.json          # Module 5: Coding with AI (10 terms)
│   ├── chapter6.json          # Module 6: Hands-On Coding (19 terms)
│   ├── chapter7.json          # Module 7: AI Platforms (15 terms)
│   └── chapter8.json          # Module 8: Safety & Quality (9 terms)
│
├── assets/
│   ├── css/
│   │   ├── index.css          # Home page styles
│   │   └── chapter.css        # Chapter reader styles
│   └── js/
│       ├── index.js           # Progress tracking & navigation
│       └── chapter.js         # Chapter interaction & visualization
│
└── visuals/                    # Interactive visualizations (23+ files)
    ├── ai-hierarchy.html
    ├── embeddings.html
    ├── shot-learning.html
    ├── cot-modern-llms.html
    ├── agents-orchestration.html
    ├── safety-quality-system.html
    ├── temperature.html
    ├── rag.html
    ├── prompt-completion.html
    ├── google-colab.html
    ├── ai-studio-vs-enterprise.html
    ├── dump-strategy.html
    ├── token-budget.html
    ├── code-organization-static-dynamic.html
    ├── pycharm-project-setup.html
    ├── readme-example.html
    ├── incremental-development.html
    ├── error-communication.html
    ├── breaking-loops.html
    ├── library-finding.html
    ├── streamlit-example.html
    ├── html-file-organization.html
    ├── gemini-canvas-html.html
    └── html-consolidation.html
```

---

## 📊 Data Model

Each chapter is defined in `data/chapterN.json`:

```json
{
  "chapter": 1,
  "title": "Chapter Title",
  "description": "Brief description",
  "sections": [
    {
      "type": "section",
      "title": "Section Name",
      "terms": [
        {
          "id": "unique-term-id",
          "title": "Term Title",
          "definition": "Full definition...",
          "keywords": ["keyword1", "keyword2"],
          "hasViz": true,
          "vizPath": "visuals/demo.html",
          "vizIcon": "🔤",
          "mastery": 0,
          "visited": false,
          "question": null
        }
      ]
    }
  ]
}
```

### Data Model Fields

- **id**: Unique identifier for progress tracking
- **visited**: Has the learner viewed this term?
- **mastery**: Understanding level (0-100%, increments +20% per visit)
- **question**: Quiz data (not shown in UI yet)

---

## 🤝 Contributing

Want to add terms, visualizations, or chapters? See **[CONTRIBUTING.md](CONTRIBUTING.md)** for:

- How to add new terms
- How to create visualizations
- How to create new chapters
- Distributed workflow for teams
- Testing guidelines

### Quick Start for Contributors

1. **Edit a chapter**:
   ```bash
   code data/chapter2.json
   ```

2. **Add a new term** (see CONTRIBUTING.md for template)

3. **Test locally**:
   ```bash
   python -m http.server 8000
   ```

4. **Commit and push**:
   ```bash
   git add data/chapter2.json
   git commit -m "Add new term: Zero-shot Learning"
   git push
   ```

---

## 🔧 Utilities

### Convert Markdown to JSON

```bash
python convert_md_to_json.py
```

Converts `chapters/planning_doc.md` → `data/chapter1.json` (before splitting)

### Split Chapters

```bash
python split_chapters.py
```

Splits the large chapter1.json into 5 separate chapter files based on defined structure.

---

## 🎮 Keyboard Shortcuts

- **← or →**: Navigate between modules (on home page)
- **↑ or ↓**: Navigate between terms (in chapter)
- **Click term**: Jump directly to that term
- **Reset Progress Button**: Clear chapter progress (with confirmation)

---

## 🎨 Technologies

- **Frontend**: HTML5, CSS3 (Tailwind CSS), Vanilla JavaScript
- **Data Format**: JSON (human-editable)
- **Storage**: localStorage for progress tracking
- **Hosting**: Static site (GitHub Pages, Netlify, Vercel, etc.)
- **No Backend Required**: Runs entirely in the browser

---

## 📝 Course Statistics

- **Total Modules**: 8
- **Total Terms**: 92
- **Total Sections**: 16
- **Interactive Visualizations**: 23+
- **Average Terms per Module**: 11.5
- **File Size**: ~5MB total

---

## 📈 Progress Tracking

Progress is automatically saved to browser localStorage:

```javascript
// Example: Chapter 1 progress
{
  "chapter": 1,
  "terms": [
    {
      "id": "ai-landscape-intro",
      "visited": true,
      "mastery": 20,          // 0-100% (increments on revisit)
      "lastVisited": 1699123456789
    }
  ],
  "total": 10,
  "lastVisitedIndex": 0,
  "timestamp": 1699123456789
}
```

### Progress Features

- **Automatic Saving**: Progress saved on each term visit
- **10-Second Requirement**: Terms only count as "read" after 10 seconds of focus
- **Mastery Levels**: Increase by 20% each visit (0% → 20% → 40% → 60% → 80% → 100%)
- **Reset Button**: Clear progress for current chapter with confirmation
- **Cross-Session Persistence**: Progress maintained across browser sessions

---

## 🚀 Git Workflow & GitHub

### Initial Push to GitHub

If this is your first time setting up the repository:

```bash
cd /path/to/ai-course

# Check what's changed
git status

# Stage all files
git add .

# Create initial commit
git commit -m "Initial commit: Interactive AI course with 8 modules and 92 terms"

# Set up remote (one time only)
git remote add origin https://github.com/vidarsveen/ai-course.git

# Push with upstream tracking
git push -u origin main
```

### Regular Workflow: Edit, Commit, Push

After the initial setup, the workflow is simple:

```bash
# 1. Make your changes (edit JSON, add visualizations, etc.)

# 2. Check what changed
git status

# 3. Stage your changes
git add .

# 4. Commit with a clear message
git commit -m "Update Module 6: Add web development content"

# 5. Push to GitHub
git push
```

### Commit Message Best Practices

```bash
# Format: verb + what changed
git commit -m "Add visualization: HTML file organization"
git commit -m "Update Module 6: Streamlit Python UI term"
git commit -m "Fix: Progress display percentage rotation"
git commit -m "Module 6 expansion: Add 7 new web development terms"
```

### Do You Need to Commit Locally?

**Yes!** Git workflow always requires local commits before pushing. Here's why:

1. **Commit locally first**: `git commit -m "message"`
   - Records your changes with a description
   - Creates a checkpoint in your project history
   - Allows you to revert if needed

2. **Then push to GitHub**: `git push`
   - Sends your commits to the remote repository
   - Makes them visible to others and backed up online

**You cannot push without committing first** (with new files, at least).

---

## 🔮 Roadmap

- [ ] Add quiz UI for assessments
- [ ] Spaced repetition algorithm
- [ ] Export progress as PDF
- [ ] Dark/light theme toggle
- [ ] Search across all chapters
- [ ] Flashcard mode
- [ ] Mobile app version

---

## 🐛 Troubleshooting

### Terms not loading?
- Check browser console for errors (F12)
- Verify JSON syntax is valid
- Ensure file paths are correct

### Visualizations not showing?
- Check `vizPath` in chapter JSON
- Verify HTML file exists in `visuals/` folder
- Test visualization standalone

### Progress not saving?
- Check browser localStorage is enabled
- Clear cache and try again
- Check console for errors

---

## 📄 License

Educational use only.

---

## 🙏 Acknowledgments

Built with Claude Code for interactive AI education.

Visualizations inspired by modern LLM concepts and best practices.
