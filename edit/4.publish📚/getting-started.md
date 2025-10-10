# Getting Started

This guide walks you through creating your first documentation with Eddie.

## Directory Structure

After running `npx create-eddie my-docs`, you'll see:

```
my-docs/
├── edit/                   # User-facing workspace
│   ├── 0.prompt🤖/         # AI prompt templates
│   ├── 1.source📦/         # Raw materials
│   ├── 2.sampling✂️/       # Extracted content
│   ├── 3.plot📋/           # Document outlines
│   ├── 4.publish📚/        # Final docs (becomes website)
│   └── archive🗑️/          # Unused materials
├── .system/                # Backend (don't touch)
│   ├── site-config/        # VitePress config
│   ├── claude/             # Claude Code settings
│   └── vector-data/        # Search index
├── .env                    # OpenAI API key
└── README.md
```

## The Eddie Workflow

Eddie follows a 5-stage process inspired by professional writing:

### Stage 0: Prompt 🤖

Create AI prompts to generate content ideas.

**Example**: `edit/0.prompt🤖/interview-prompt.md`
```markdown
Interview a developer about their favorite framework.
Ask about:
- Why they chose it
- What problems it solves
- Best practices
```

### Stage 1: Source 📦

Store raw materials like transcripts, notes, or research.

**Example**: `edit/1.source📦/interview-transcript.md`
```markdown
Q: Why did you choose Next.js?
A: It solved our SSR and routing problems...
```

### Stage 2: Sampling ✂️

Extract and refine key points from source materials.

**Example**: `edit/2.sampling✂️/nextjs-benefits.md`
```markdown
## Next.js Benefits
- Built-in SSR
- File-based routing
- API routes
```

### Stage 3: Plot 📋

Create outlines for your final documents.

**Example**: `edit/3.plot📋/nextjs-guide-outline.md`
```markdown
# Next.js Guide Outline
1. Introduction
2. Key Features
3. Getting Started
4. Best Practices
```

### Stage 4: Publish 📚

Write final, polished documentation. **This becomes your website.**

**Example**: `edit/4.publish📚/nextjs-guide.md`
```markdown
# Next.js Guide

Next.js is a React framework that provides...
```

## Your First Document

Let's create a simple guide:

### 1. Create a Source File

Create `edit/1.source📦/my-notes.md`:

```markdown
# Project Notes
- Eddie uses VitePress for static sites
- Vector search uses OpenAI embeddings
- Obsidian wikilinks work automatically
```

### 2. Extract Key Points

Create `edit/2.sampling✂️/eddie-features.md`:

```markdown
## Eddie Features
- **VitePress**: Static site generation
- **Vector Search**: Semantic document navigation
- **Obsidian**: Wikilink support
```

### 3. Create Outline

Create `edit/3.plot📋/eddie-overview-outline.md`:

```markdown
# Eddie Overview Outline
1. What is Eddie?
2. Key Features
3. Why Use Eddie?
4. Next Steps
```

### 4. Write Final Document

Create `edit/4.publish📚/eddie-overview.md`:

```markdown
# Eddie Overview

Eddie is an AI-assisted documentation framework...

## Key Features
- VitePress for static sites
- Vector search for navigation
- Obsidian integration

## Why Use Eddie?
Traditional docs are too rigid or too loose...
```

### 5. View Your Site

Run the dev server:

```bash
npm run dev
```

Visit [http://localhost:5173/eddie-overview](http://localhost:5173/eddie-overview)

## Using Vector Search

Index your documents:

```bash
npm run reindex
```

Search semantically:

```bash
npm run search "how to create documentation"
```

Results show relevant documents even if they don't contain exact keywords.

## Linking Between Documents

Use Obsidian wikilinks or standard markdown:

```markdown
See [[installation]] for setup.
See [installation](./installation.md) for setup.
```

Both work in VitePress!

## Using with Claude Code

1. Open project in VS Code: `code .`
2. Launch Claude Code
3. Ask for help:
   > "Read my notes in 1.source📦 and create an outline in 3.plot📋"

Claude can navigate your Eddie structure and help with each stage.

## Next Steps

- [Workflow](./workflow.md) - Deep dive into each stage
- [Vector Search](./vector-search.md) - Advanced search usage
- [Deployment](./deployment.md) - Publish to the web
