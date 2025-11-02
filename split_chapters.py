#!/usr/bin/env python3
"""Split the large chapter1.json into 5 focused chapters"""

import json

# Chapter definitions
CHAPTER_SPLITS = [
    {
        "chapter": 1,
        "title": "LLM Fundamentals & Generation Controls",
        "description": "Core concepts, token processing, transformers, and basic generation parameters",
        "section_indices": [0, 1]  # Fundamentals + Generation Controls
    },
    {
        "chapter": 2,
        "title": "Reasoning & Retrieval",
        "description": "Chain of thought, RAG, tool use, and advanced prompting techniques",
        "section_indices": [2]  # Reasoning & Retrieval
    },
    {
        "chapter": 3,
        "title": "Agents & Orchestration",
        "description": "Autonomous agents, planning, function calling, and coding agents",
        "section_indices": [3]  # Agents & Orchestration
    },
    {
        "chapter": 4,
        "title": "Safety, Quality & Production",
        "description": "Guardrails, evaluation, safety filters, and production interaction modes",
        "section_indices": [4, 5]  # Safety + Interaction Modes
    },
    {
        "chapter": 5,
        "title": "APIs & Integration",
        "description": "API providers, playgrounds, SDKs, model providers, and development workflows",
        "section_indices": [6]  # APIs, Playgrounds & Integration
    }
]

def split_chapters():
    """Split chapter1.json into 5 separate chapter files"""

    # Load the original chapter1.json
    print("Loading chapter1.json...")
    with open('data/chapter1.json', 'r', encoding='utf-8') as f:
        original_data = json.load(f)

    all_sections = original_data['sections']
    print(f"Found {len(all_sections)} sections with {sum(len(s['terms']) for s in all_sections)} total terms")

    # Create each new chapter
    for chapter_def in CHAPTER_SPLITS:
        chapter_num = chapter_def['chapter']

        # Extract the sections for this chapter
        chapter_sections = [all_sections[i] for i in chapter_def['section_indices']]

        # Create the new chapter data
        new_chapter = {
            "chapter": chapter_num,
            "title": chapter_def['title'],
            "description": chapter_def['description'],
            "sections": chapter_sections
        }

        # Count terms
        term_count = sum(len(s['terms']) for s in chapter_sections)

        # Save to file
        output_file = f'data/chapter{chapter_num}.json'
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(new_chapter, f, indent=2, ensure_ascii=False)

        print(f"[OK] Chapter {chapter_num}: {chapter_def['title']}")
        print(f"     Sections: {len(chapter_sections)}, Terms: {term_count}")
        print(f"     Saved to: {output_file}")
        print()

if __name__ == '__main__':
    split_chapters()
    print("Split complete! All 5 chapters created.")
