# Vector Search

Eddie includes semantic search powered by OpenAI embeddings.

## What is Vector Search?

Traditional keyword search looks for exact matches:
- ❌ Search "car" → misses "automobile", "vehicle"
- ❌ Search "fast" → misses "quick", "rapid"

Vector search understands **meaning**:
- ✅ Search "car" → finds "automobile", "vehicle", "sedan"
- ✅ Search "fast" → finds "quick", "rapid", "high-speed"
- ✅ Search "how to deploy" → finds "deployment guide", "publishing docs"

## How It Works

1. **Indexing**: Documents are converted to 1536-dimensional vectors
2. **Query**: Your search term is converted to a vector
3. **Similarity**: Cosine similarity finds semantically related documents
4. **Results**: Most relevant documents ranked by meaning, not keywords

## Setup

Vector search requires an OpenAI API key in `.env`:

```bash
OPENAI_API_KEY=sk-...your-key-here
```

## Commands

### Index Documents

Before first search, index your documents:

```bash
npm run reindex
```

This processes all files in `edit/4.publish📚/` and creates embeddings.

**Output**:
```
Indexing documents...
✓ Indexed: installation.md (3 chunks)
✓ Indexed: getting-started.md (5 chunks)
✓ Indexed: workflow.md (8 chunks)
✓ Indexed: vector-search.md (4 chunks)

Total: 4 files, 20 chunks, 0.8 MB
Time: 8.2s
```

### Search Documents

Search semantically:

```bash
npm run search "how to get started"
```

**Output**:
```
🔍 Searching for: "how to get started"

📄 getting-started.md (score: 0.89)
   This guide walks you through creating your first
   documentation with Eddie...

📄 installation.md (score: 0.76)
   Before installing Eddie, make sure you have...

📄 workflow.md (score: 0.68)
   Eddie's 5-stage workflow is designed for...
```

## Search Examples

### Conceptual Search

```bash
npm run search "deployment"
```

Finds:
- "How to publish to Vercel"
- "Static site generation"
- "Build commands"

Even if they don't contain "deployment"!

### Problem-Based Search

```bash
npm run search "I can't find my documents"
```

Finds:
- Vector search documentation
- Navigation guides
- Sidebar configuration

### Natural Language Search

```bash
npm run search "what's the difference between source and sampling"
```

Finds workflow stage explanations even with conversational queries.

## Advanced Usage

### Re-index After Changes

When you add or edit documents in `4.publish📚/`:

```bash
npm run reindex
```

This updates the search index incrementally (only changed files).

### Search All Stages

By default, search indexes `edit/4.publish📚/` (published docs).

To search across all stages (including drafts), you can modify the indexing path in your project. This is useful for finding content in `1.source📦` or `2.sampling✂️`.

**Advanced**: Edit `.system/vector-data/config.json` (if it exists) or modify the search library settings.

### Programmatic Search

For advanced users, you can use the search API in Node.js:

```javascript
import { VectorStore } from 'eddie-vector-search';

const store = new VectorStore('/path/to/project/.system/vector-data');
const results = await store.search('your query', { limit: 5 });

results.forEach(result => {
  console.log(`${result.file}: ${result.score}`);
});
```

## Technical Details

### Embedding Model

- **Model**: OpenAI `text-embedding-3-small`
- **Dimensions**: 1536
- **Cost**: ~$0.02 per 1M tokens
- **Speed**: ~100 docs/second

### Text Chunking

Large documents are split into chunks:
- **Max size**: 6000 characters per chunk
- **Strategy**: Split at paragraph boundaries
- **Overlap**: None (clean splits)

This ensures:
- No token limit errors
- Better granularity in search results
- Faster processing

### Similarity Metric

**Cosine similarity** measures vector angle:
- Range: 0.0 (unrelated) to 1.0 (identical)
- Typical results: 0.6-0.9 for relevant matches
- Threshold: Results below 0.5 usually not relevant

### Storage

Vector data stored in `.system/vector-data/`:
```
.system/vector-data/
├── vector_store.json     # Embeddings and metadata
└── index_meta.json       # File modification times
```

**File size**: ~400KB per 100 documents (depends on content)

## Performance

### Indexing Speed

| Documents | Chunks | Time   |
|-----------|--------|--------|
| 10        | 30     | ~3s    |
| 50        | 150    | ~15s   |
| 100       | 300    | ~30s   |
| 500       | 1500   | ~2.5m  |

### Search Speed

- **Query time**: ~0.5-1s (includes API call)
- **Local calculation**: <100ms (after embedding)
- **Scales linearly**: 1000 docs still <2s

### Cost Estimation

**Indexing** (one-time per document):
- 10 docs: ~$0.001
- 100 docs: ~$0.01
- 1000 docs: ~$0.10

**Searching** (per query):
- ~$0.00002 per search
- 1000 searches: ~$0.02

## Troubleshooting

### "No results found"

**Possible causes**:
1. Index is empty: run `npm run reindex`
2. Query too specific: try broader terms
3. No OpenAI API key: check `.env`

### "Module not found: eddie-vector-search"

```bash
npm install
```

### "OpenAI API error: 401"

Check `.env` has valid API key:
```bash
cat .env
```

Update key:
```bash
OPENAI_API_KEY=sk-...your-new-key
```

### Search returns outdated content

Re-index to update:
```bash
npm run reindex
```

### Too many API calls

Vector search caches embeddings. You only pay for:
- Initial indexing
- Re-indexing changed files
- Each search query

**Tip**: Index once, search many times (no additional cost).

## Next Steps

- [Deployment](./deployment.md) - Publish your searchable docs to the web
- [Workflow](./workflow.md) - Understand Eddie's documentation process
