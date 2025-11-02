#!/usr/bin/env python3
"""Convert chapter markdown files to JSON format"""

import json
import re

# Visualization mappings
VISUALIZATIONS = {
    "The AI Landscape: Understanding the Hierarchy": {"path": "visuals/ai-hierarchy.html", "icon": "🤖"},
    "LLM (Large Language Model)": {"path": "visuals/ai-hierarchy.html", "icon": "🤖"},
    "Token": {"path": "visuals/tokens.html", "icon": "🔤"},
    "Embedding": {"path": "visuals/embeddings.html", "icon": "📊"},
    "Semantic Similarity": {"path": "visuals/embeddings.html", "icon": "📊"},
    "Temperature": {"path": "visuals/temperature.html", "icon": "🌡️"},
    "Top-p / Nucleus Sampling": {"path": "visuals/temperature.html", "icon": "🌡️"},
    "Top-k": {"path": "visuals/temperature.html", "icon": "🌡️"},
    "Transformer": {"path": "visuals/transformer.html", "icon": "🔍"},
    "RAG (Retrieval-Augmented Generation)": {"path": "visuals/rag.html", "icon": "📚"},
    "Prompt": {"path": "visuals/prompt-completion.html", "icon": "💬"},
    "Completion": {"path": "visuals/prompt-completion.html", "icon": "💬"},
    "Message Roles (System/User/Assistant/Tool)": {"path": "visuals/prompt-completion.html", "icon": "💬"},
    "Zero-shot Learning": {"path": "visuals/shot-learning.html", "icon": "🎯"},
    "1-shot Learning": {"path": "visuals/shot-learning.html", "icon": "🎯"},
    "Few-shot Learning": {"path": "visuals/shot-learning.html", "icon": "🎯"},
    "CoT (Chain of Thought)": {"path": "visuals/cot-modern-llms.html", "icon": "🧠"},
    "Google Colab": {"path": "visuals/google-colab.html", "icon": None},
    "AI Studio vs Gemini Enterprise": {"path": "visuals/ai-studio-vs-enterprise.html", "icon": None},
    "Project Dump Strategy": {"path": "visuals/dump-strategy.html", "icon": None},
    "Token Budget Awareness": {"path": "visuals/token-budget.html", "icon": None},
    "Multi-File Project Organization": {"path": "visuals/code-organization-static-dynamic.html", "icon": None},
    "PyCharm Project Setup": {"path": "visuals/pycharm-project-setup.html", "icon": None},
    "README-Driven Development": {"path": "visuals/readme-example.html", "icon": None},
    "Incremental Development Pattern": {"path": "visuals/incremental-development.html", "icon": None},
    "Effective Error Communication": {"path": "visuals/error-communication.html", "icon": None},
    "Breaking Out of AI Loops": {"path": "visuals/breaking-loops.html", "icon": None},
    "Guardrails": {"path": "visuals/safety-quality-system.html", "icon": "🛡️"},
    "Safety Filters": {"path": "visuals/safety-quality-system.html", "icon": "🛡️"},
    "Grounded Answering": {"path": "visuals/safety-quality-system.html", "icon": "🛡️"},
    "AI Alignment": {"path": "visuals/safety-quality-system.html", "icon": "🛡️"},
    "Evaluation Metrics": {"path": "visuals/safety-quality-system.html", "icon": "🛡️"},
    "A/B Prompt Testing": {"path": "visuals/safety-quality-system.html", "icon": "🛡️"},
    "Agent": {"path": "visuals/agents-orchestration.html", "icon": "🤖"},
    "Autonomous Agent": {"path": "visuals/agents-orchestration.html", "icon": "🤖"},
    "Tool Invocation": {"path": "visuals/agents-orchestration.html", "icon": "🤖"},
    "Function Calling": {"path": "visuals/agents-orchestration.html", "icon": "🤖"},
    "Plugins / Tools API": {"path": "visuals/agents-orchestration.html", "icon": "🤖"},
    "MCP (Model Context Protocol)": {"path": "visuals/agents-orchestration.html", "icon": "🤖"},
    "Tool Orchestration": {"path": "visuals/agents-orchestration.html", "icon": "🤖"},
    "Planning": {"path": "visuals/agents-orchestration.html", "icon": "🤖"},
    "Finding Libraries & Packages": {"path": "visuals/library-finding.html", "icon": None},
    "Streamlit for Python UI": {"path": "visuals/streamlit-example.html", "icon": None},
    "HTML/CSS/JS File Organization": {"path": "visuals/html-file-organization.html", "icon": None},
    "Gemini Canvas & Preview for HTML Prototyping": {"path": "visuals/gemini-canvas-html.html", "icon": None},
    "Publishing to Google Sites (Single-File Consolidation)": {"path": "visuals/html-consolidation.html", "icon": None}
}

def create_term_id(title):
    """Create a URL-safe ID from a title"""
    return title.lower()\
        .replace('(', '').replace(')', '')\
        .replace('/', '-').replace(' ', '-')\
        .replace('--', '-').strip('-')

def parse_markdown_to_json(md_file_path, chapter_num, chapter_title, description):
    """Parse markdown file and convert to JSON structure"""

    with open(md_file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    lines = [line.rstrip() for line in content.split('\n')]

    chapter_data = {
        "chapter": chapter_num,
        "title": chapter_title,
        "description": description,
        "sections": []
    }

    i = 0
    while i < len(lines):
        line = lines[i]

        # Check for section header (e.g., "1. Core Concepts" or "2) Generation Controls")
        if re.match(r'^\d+[\)\.]\s+', line):
            section_title = re.sub(r'^\d+[\)\.]\s*', '', line).strip()

            section = {
                "type": "section",
                "title": section_title,
                "terms": []
            }

            # Parse terms in this section
            i += 1
            while i < len(lines):
                # Check if we've hit the next section
                if re.match(r'^\d+[\)\.]\s+', lines[i]):
                    break

                # Skip empty lines
                if not lines[i].strip():
                    i += 1
                    continue

                # Check if this is a term title (not Definition or Keywords)
                if not lines[i].startswith('Definition:') and not lines[i].startswith('Keywords:'):
                    term_title = lines[i].strip()

                    # Create term
                    has_viz = term_title in VISUALIZATIONS
                    viz_info = VISUALIZATIONS.get(term_title, {})

                    term = {
                        "id": create_term_id(term_title),
                        "title": term_title,
                        "definition": "",
                        "keywords": [],
                        "hasViz": has_viz,
                        "vizPath": viz_info.get('path'),
                        "vizIcon": viz_info.get('icon'),
                        "mastery": 0,
                        "visited": False,
                        "question": None
                    }

                    # Look for definition on next lines
                    i += 1
                    while i < len(lines):
                        if not lines[i].strip():
                            i += 1
                            continue

                        if lines[i].startswith('Definition:'):
                            # Extract definition
                            def_text = lines[i].replace('Definition:', '').strip()
                            term['definition'] = def_text
                            i += 1
                            break
                        else:
                            i += 1
                            break

                    # Look for keywords
                    while i < len(lines):
                        if not lines[i].strip():
                            i += 1
                            continue

                        if lines[i].startswith('Keywords:'):
                            # Extract keywords
                            kw_text = lines[i].replace('Keywords:', '').strip()
                            term['keywords'] = [k.strip() for k in kw_text.split(',')]
                            i += 1
                            break
                        elif lines[i].startswith('Definition:') or re.match(r'^\d+[\)\.]\s+', lines[i]):
                            # Hit another term/section without finding keywords
                            break
                        else:
                            # Might be continuation of definition
                            if term['definition'] and not lines[i].startswith('Definition:'):
                                term['definition'] += ' ' + lines[i].strip()
                            i += 1

                    # Add term to section
                    if term['title']:  # Only add if we have a title
                        section['terms'].append(term)
                else:
                    i += 1

            chapter_data['sections'].append(section)
        else:
            i += 1

    return chapter_data

# Convert chapter 1
print("Converting planning_doc.md to JSON...")
chapter1_data = parse_markdown_to_json(
    'chapters/planning_doc.md',
    1,
    'LLM Terminology and Concepts',
    'Core concepts, fundamentals, and generation controls for understanding Large Language Models'
)

# Save to JSON
with open('data/chapter1.json', 'w', encoding='utf-8') as f:
    json.dump(chapter1_data, f, indent=2, ensure_ascii=False)

# Print summary
total_terms = sum(len(section['terms']) for section in chapter1_data['sections'])
print(f"[OK] Converted Chapter 1")
print(f"   Sections: {len(chapter1_data['sections'])}")
print(f"   Total terms: {total_terms}")

# Print terms with visualizations
viz_terms = []
for section in chapter1_data['sections']:
    for term in section['terms']:
        if term['hasViz']:
            viz_terms.append(term['title'])

print(f"   Terms with visualizations: {len(viz_terms)}")
for vt in viz_terms:
    print(f"      - {vt}")
