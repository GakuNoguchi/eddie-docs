# Installation

## Prerequisites

Before installing Eddie, make sure you have:

- ✅ **Node.js 18+** - [Download here](https://nodejs.org/)
- ✅ **npm** or **pnpm** - Comes with Node.js
- ✅ **OpenAI API Key** - [Get one here](https://platform.openai.com/api-keys)
- ✅ **Obsidian** (optional) - [Download here](https://obsidian.md/)
- ✅ **VS Code with Claude Code** (optional) - For AI assistance

## Quick Install

Create a new Eddie project with one command:

```bash
npx create-eddie my-docs
```

This will:
1. Create `my-docs/` directory with Eddie structure
2. Install VitePress and eddie-vector-search
3. Initialize empty vector store
4. Create sample documentation

## Setup Steps

### 1. Navigate to Project

```bash
cd my-docs
```

### 2. Configure Environment

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:

```bash
OPENAI_API_KEY=sk-...your-key-here
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view your site.

## Optional: Open with Obsidian

Eddie is designed to work seamlessly with Obsidian:

1. Launch Obsidian
2. Click **"Open folder as vault"**
3. Select your Eddie project folder (e.g., `my-docs`)

Now you can:
- Edit markdown files in Obsidian
- Use wikilinks: `[[Page]]` or `[[text]](link.md)`
- See changes live in VitePress (with `npm run dev` running)

## Optional: Open with VS Code + Claude Code

For AI-assisted writing:

1. Open project in VS Code:
   ```bash
   code .
   ```

2. Launch Claude Code extension

3. Ask Claude to help with documentation:
   > "Create a getting started guide for this project"

## Verify Installation

Run the vector search test:

```bash
npm run search "documentation"
```

You should see search results from the sample docs.

## Next Steps

- [Getting Started](./getting-started.md) - Create your first document
- [Workflow](./workflow.md) - Understand the Eddie process
- [Vector Search](./vector-search.md) - Learn semantic search

## Troubleshooting

### "Module not found" errors

```bash
rm -rf node_modules package-lock.json
npm install
```

### Vector search not working

Make sure `.env` has your OpenAI API key:

```bash
cat .env
# Should show: OPENAI_API_KEY=sk-...
```

Re-index documents:

```bash
npm run reindex
```

### VitePress not starting

Check Node.js version:

```bash
node --version
# Should be v18.0.0 or higher
```
