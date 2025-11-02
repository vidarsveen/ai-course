# Contributing to the Interactive AI Course

This guide explains how to add new terms, chapters, and visualizations to the course. The workflow is designed for distributed collaboration, allowing multiple contributors to work on different chapters simultaneously.

## 📋 Table of Contents

1. [Project Structure](#project-structure)
2. [Adding New Terms](#adding-new-terms)
3. [Adding New Visualizations](#adding-new-visualizations)
4. [Creating New Chapters](#creating-new-chapters)
5. [Testing Locally](#testing-locally)
6. [Distributed Workflow](#distributed-workflow)

---

## 📁 Project Structure

```
AI_training/
├── data/                      # Chapter data (JSON format)
│   ├── chapter1.json         # Chapter 1: Fundamentals & Generation
│   ├── chapter2.json         # Chapter 2: Reasoning & Retrieval
│   ├── chapter3.json         # Chapter 3: Agents & Orchestration
│   ├── chapter4.json         # Chapter 4: Safety & Production
│   └── chapter5.json         # Chapter 5: APIs & Integration
├── visuals/                   # Interactive HTML demos
│   ├── tokens.html
│   ├── temperature.html
│   ├── transformer.html
│   ├── rag.html
│   └── prompt-completion.html
├── chapters/                  # Source markdown (archived)
│   └── planning_doc.md
├── assets/
│   ├── css/chapter.css
│   └── js/chapter.js
├── index.html                 # Overview page
├── chapter.html               # Reading view
├── convert_md_to_json.py      # Markdown → JSON converter
└── split_chapters.py          # Chapter splitter
```

---

## ➕ Adding New Terms

### Method 1: Edit JSON Directly (Recommended for Individual Terms)

1. **Open the appropriate chapter file** in `data/`
   ```bash
   # Example: Adding to Chapter 2
   code data/chapter2.json
   ```

2. **Find the correct section** where the term belongs

3. **Add the new term** following this template:
   ```json
   {
     "id": "unique-term-id",
     "title": "Term Title",
     "definition": "Complete definition of the term...",
     "keywords": ["keyword1", "keyword2", "keyword3"],
     "hasViz": false,
     "vizPath": null,
     "vizIcon": null,
     "mastery": 0,
     "visited": false,
     "question": null
   }
   ```

4. **Follow the naming conventions**:
   - `id`: lowercase, hyphenated (e.g., `chain-of-thought`)
   - `title`: Proper case (e.g., `Chain of Thought`)
   - `keywords`: Array of lowercase strings

5. **If the term has a visualization**, set:
   ```json
   "hasViz": true,
   "vizPath": "visuals/your-viz.html",
   "vizIcon": "🔬"
   ```

### Method 2: Edit Markdown Source (For Bulk Updates)

1. **Edit `chapters/planning_doc.md`** with new terms

2. **Run the converter**:
   ```bash
   python convert_md_to_json.py
   ```

3. **Run the splitter** to update all chapter files:
   ```bash
   python split_chapters.py
   ```

---

## 🎨 Adding New Visualizations

### Step 1: Create the HTML File

1. **Create a new file** in `visuals/` folder:
   ```bash
   touch visuals/your-concept.html
   ```

2. **Use the standard template** (copy from existing viz like `tokens.html`):
   - Use Tailwind CSS (loaded from CDN)
   - Dark theme (bg-gray-900)
   - Inter font
   - Self-contained (all CSS/JS inline)

3. **Example structure**:
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <title>Your Concept</title>
       <script src="https://cdn.tailwindcss.com"></script>
       <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
   </head>
   <body class="bg-gray-900 text-gray-200 font-inter p-4 md:p-8">
       <!-- Your visualization here -->
   </body>
   </html>
   ```

### Step 2: Link to Terms

**Option A: Edit JSON directly**

```json
{
  "title": "Your Term",
  "hasViz": true,
  "vizPath": "visuals/your-concept.html",
  "vizIcon": "🔬"
}
```

**Option B: Update converter script**

Edit `convert_md_to_json.py`:

```python
VISUALIZATIONS = {
    # ... existing mappings
    "Your Term": {"path": "visuals/your-concept.html", "icon": "🔬"}
}
```

Then re-run:
```bash
python convert_md_to_json.py
python split_chapters.py
```

### Step 3: Test

```bash
# Start server
python -m http.server 8000

# Open browser
# Navigate to the term with your visualization
```

---

## 📚 Creating New Chapters

### Step 1: Decide on Chapter Structure

Determine:
- Chapter number (e.g., Chapter 6)
- Title (e.g., "Advanced Topics")
- Description
- Which sections belong in this chapter

### Step 2: Create the JSON File

1. **Create `data/chapter6.json`**:
   ```json
   {
     "chapter": 6,
     "title": "Your Chapter Title",
     "description": "Brief description",
     "sections": [
       {
         "type": "section",
         "title": "Section Name",
         "terms": [
           {
             "id": "term-id",
             "title": "Term Title",
             "definition": "...",
             "keywords": [],
             "hasViz": false,
             "vizPath": null,
             "vizIcon": null,
             "mastery": 0,
             "visited": false,
             "question": null
           }
         ]
       }
     ]
   }
   ```

### Step 3: Update the Overview Page

Edit `index.html`:

1. **Add a new chapter card** in the grid:
   ```html
   <!-- Chapter 6 -->
   <div class="chapter-card bg-gray-800 border-2 border-gray-700 rounded-xl p-6 hover:border-rose-500" onclick="openChapter(6)">
       <div class="flex items-start justify-between mb-4">
           <div class="flex-1">
               <div class="text-sm text-rose-400 font-semibold mb-1">CHAPTER 6</div>
               <h3 class="text-xl font-bold text-white mb-2">Your Chapter Title</h3>
               <p class="text-gray-400 text-sm">Brief description</p>
           </div>
           <div class="ml-4">
               <svg class="progress-ring w-16 h-16">
                   <circle class="text-gray-700" stroke="currentColor" stroke-width="4" fill="transparent" r="28" cx="32" cy="32"/>
                   <circle id="progress-circle-6" class="progress-ring-circle text-rose-500" stroke="currentColor" stroke-width="4" fill="transparent" r="28" cx="32" cy="32"
                       stroke-dasharray="176" stroke-dashoffset="176"/>
                   <text x="32" y="37" class="text-sm font-bold fill-white text-anchor-middle" text-anchor="middle" id="progress-percent-6">0%</text>
               </svg>
           </div>
       </div>
       <div class="flex items-center justify-between pt-4 border-t border-gray-700">
           <span id="chapter-6-progress" class="text-sm text-gray-400">0/15 terms</span>
           <span class="text-rose-400 font-medium">Start →</span>
       </div>
   </div>
   ```

2. **Add to progress loading** in the `<script>` section:
   ```javascript
   const chapters = [
       { num: 1, defaultTotal: 20 },
       { num: 2, defaultTotal: 14 },
       { num: 3, defaultTotal: 12 },
       { num: 4, defaultTotal: 14 },
       { num: 5, defaultTotal: 33 },
       { num: 6, defaultTotal: 15 }  // Add this line
   ];
   ```

---

## 🧪 Testing Locally

### 1. Start Local Server

```bash
python -m http.server 8000
```

### 2. Open in Browser

```
http://localhost:8000
```

### 3. Test Checklist

- [ ] Overview page loads all chapters
- [ ] Progress circles show correctly
- [ ] Click chapter → Opens reading view
- [ ] All terms load in correct order
- [ ] Visualizations load when term is active
- [ ] Arrow keys navigate through terms
- [ ] Progress saves to localStorage
- [ ] Return to overview → Progress persists

### 4. Clear Progress (for testing)

Open browser console (F12):
```javascript
// Clear all progress
for (let i = 1; i <= 5; i++) {
    localStorage.removeItem(`chapter-${i}-progress`);
}
// Reload page
location.reload();
```

---

## 👥 Distributed Workflow

### Scenario: Multiple Contributors Working on Different Chapters

#### Step 1: Assign Chapters

- **Contributor A**: Works on Chapter 2
- **Contributor B**: Works on Chapter 3
- **Contributor C**: Creates new visualizations

#### Step 2: Work Independently

Each contributor:

1. **Clone the repo** (or pull latest)
   ```bash
   git pull origin main
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/chapter-2-updates
   ```

3. **Edit their assigned chapter**
   ```bash
   # Contributor A edits:
   code data/chapter2.json

   # Contributor B edits:
   code data/chapter3.json

   # Contributor C creates:
   code visuals/new-demo.html
   ```

4. **Test locally**
   ```bash
   python -m http.server 8000
   ```

#### Step 3: Commit and Push

```bash
# Add changes
git add data/chapter2.json

# Commit with descriptive message
git commit -m "Add 5 new terms to Chapter 2: Reasoning & Retrieval"

# Push to remote
git push origin feature/chapter-2-updates
```

#### Step 4: Create Pull Request

- Open PR on GitHub
- Request review from team
- Merge when approved

### Avoiding Conflicts

**DO:**
- ✅ Work on separate chapters (separate JSON files)
- ✅ Communicate which chapter you're editing
- ✅ Pull latest changes before starting

**DON'T:**
- ❌ Edit the same chapter file simultaneously
- ❌ Modify `split_chapters.py` without coordination
- ❌ Change file structure without team discussion

### Merge Conflicts Resolution

If two people edit the same chapter:

1. **Pull latest changes**
   ```bash
   git pull origin main
   ```

2. **Resolve conflicts** in the JSON file
   - JSON conflicts are usually in the `terms` array
   - Keep both changes if possible
   - Ensure valid JSON syntax

3. **Test after merge**
   ```bash
   python -m http.server 8000
   # Verify everything works
   ```

---

## 📝 Best Practices

### Writing Definitions

- Use clear, concise language
- Explain "why" not just "what"
- Provide concrete examples
- Link to related terms in keywords

### Creating Visualizations

- Keep it simple and focused
- Use consistent color scheme (dark theme)
- Make it work standalone (no external dependencies except CDN)
- Add annotations/labels
- Mobile responsive

### Organizing Chapters

- 15-25 terms per chapter (ideal size)
- Logical progression (basics → advanced)
- Group related concepts together
- Clear chapter boundaries

---

## 🆘 Getting Help

- **Questions?** Open an issue on GitHub
- **Bugs?** Report with steps to reproduce
- **Ideas?** Start a discussion

---

## 🎉 Thank You!

Your contributions help make this course better for everyone. Happy contributing!
