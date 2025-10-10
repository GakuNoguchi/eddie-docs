# Eddie

**AI-Assisted Documentation Framework for Obsidian + Claude Code**

Eddie is a documentation system that combines:
- 📝 **Obsidian** - Markdown editor with wikilinks
- 🤖 **Claude Code** - AI-powered writing assistant
- 🌐 **VitePress** - Static site generator
- 🔍 **Vector Search** - Semantic document navigation

## Why Eddie?

Traditional documentation tools are either too rigid (CMS) or too loose (raw markdown). Eddie gives you:

✅ **AI-Native Workflow** - Prompt-driven content creation from 0.prompt🤖 to 4.publish📚
✅ **Obsidian Integration** - Use your favorite markdown editor with wikilinks
✅ **Automatic Deployment** - Push to GitHub → Vercel builds your site
✅ **Semantic Search** - Find documents by meaning, not just keywords

## Quick Start

```bash
npx create-eddie my-docs
cd my-docs
cp .env.example .env
# Add your OPENAI_API_KEY to .env
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to see your site.

## Documentation

- [Installation](./installation.md) - Setup and requirements
- [Getting Started](./getting-started.md) - Your first Eddie project
- [Workflow](./workflow.md) - The 5-stage documentation process
- [Vector Search](./vector-search.md) - Semantic search usage
- [Deployment](./deployment.md) - Deploy to Vercel

## Workflow Overview

```
0.prompt🤖   → AI prompt templates
1.source📦   → Raw materials (transcripts, notes)
2.sampling✂️ → Extract and refine content
3.plot📋     → Create document outlines
4.publish📚  → Write final docs → Deploy to web
archive🗑️    → Archive unused materials
```

## Commands

```bash
npm run dev         # Start dev server (http://localhost:5173)
npm run build       # Build static site
npm run preview     # Preview built site

npm run search "query"  # Semantic search
npm run reindex         # Re-index all documents
```
