# eddie-docs

Documentation project powered by [Eddie](https://github.com/yourname/eddie)

## Setup

### 1. Install dependencies

```bash
cd eddie-docs
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Add your OpenAI API key to `.env`:
```
OPENAI_API_KEY=sk-...
```

### 3. Open with Obsidian

1. Launch Obsidian
2. Click "Open folder as vault"
3. Select this project folder (`eddie-docs`)

### 4. Open with VS Code

```bash
code .
```

Launch Claude Code to start writing!

## Workflow

```
0.prompt🤖   → Use AI prompt templates
1.source📦   → Store raw materials (transcripts, notes)
2.sampling✂️ → Extract and refine content
3.plot📋     → Create document outlines
4.publish📚  → Write final documents → Deployed as website
archive🗑️    → Archive unused materials
```

## Commands

```bash
# Development
npm run dev         # Start VitePress dev server (http://localhost:5173)

# Build
npm run build       # Build static site (.vitepress/dist/)
npm run preview     # Preview built site

# Vector Search
npm run search "your query"   # Semantic search across documents
npm run reindex              # Re-index all documents

# Example
npm run search "design principles"
```

## Deployment

### Vercel

1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
gh repo create
git push origin main
```

2. Deploy to Vercel
```bash
npm install -g vercel
vercel
```

## Documentation Structure

Write your documentation in `edit/4.publish📚/`:

- Markdown files (.md) become web pages
- Organize with folders for nested navigation
- Use relative links between documents

## Powered by

- [Eddie](https://github.com/yourname/eddie) - Documentation framework
- [VitePress](https://vitepress.dev/) - Static site generator
- [Obsidian](https://obsidian.md/) - Markdown editor
- [Claude Code](https://claude.com/claude-code) - AI assistant
- [OpenAI Embeddings](https://platform.openai.com/) - Vector search
