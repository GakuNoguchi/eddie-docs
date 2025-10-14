# Workflow

Eddie's 5-stage workflow is designed for AI-assisted documentation creation.

## Philosophy

Traditional documentation workflows are either:
- ❌ **Too rigid**: CMS systems force you into templates
- ❌ **Too loose**: Raw markdown folders become chaotic

Eddie provides **structured flexibility**: clear stages without rigid rules.

## The 5 Stages

### 0.prompt🤖 - AI Prompt Templates

**Purpose**: Generate content ideas with AI assistance.

**What goes here**:
- Claude Code prompts
- ChatGPT conversation starters
- Interview questions
- Research queries

**Example**: `0.prompt🤖/api-documentation-prompt.md`
```markdown
Create API documentation for a REST endpoint.

Include:
- Endpoint URL and method
- Request parameters
- Response format
- Example code in JavaScript and Python
- Error codes
```

**Usage with Claude Code**:
```
User: "Use the prompt in 0.prompt🤖/api-documentation-prompt.md
       to document the /users endpoint"
Claude: [Reads prompt and generates documentation]
```

### 1.source📦 - Raw Materials

**Purpose**: Store unprocessed content.

**What goes here**:
- Meeting transcripts
- Interview recordings (as text)
- Research notes
- Copy-pasted articles
- Code examples
- Screenshots

**Example**: `1.source📦/customer-interview-20250310.md`
```markdown
# Customer Interview - John Doe - 2025-03-10

Q: What's your biggest pain point?
A: Our docs are scattered across Notion, Google Docs, and Confluence...

Q: How do you search for information?
A: Usually Cmd+F or asking teammates on Slack...
```

**Guidelines**:
- Don't worry about formatting
- Keep original wording
- Add metadata (date, source, author)

### 2.sampling✂️ - Extracted Content

**Purpose**: Refine and extract key insights from sources.

**What goes here**:
- Bullet-point summaries
- Key quotes
- Extracted code snippets
- Categorized findings

**Example**: `2.sampling✂️/customer-pain-points.md`
```markdown
## Documentation Pain Points (from 5 interviews)

### Discovery
- "Can't find docs with search" (3 mentions)
- "Don't know what docs exist" (2 mentions)

### Maintenance
- "Docs get outdated quickly" (4 mentions)
- "Too many places to update" (3 mentions)

### Tools
- Notion: Good UI, bad search
- Confluence: Powerful, overwhelming
- Google Docs: Simple, no structure
```

**Guidelines**:
- Group similar ideas
- Remove redundancy
- Preserve source references
- Use bullet points liberally

### 3.plot📋 - Document Outlines

**Purpose**: Plan the structure of final documents.

**What goes here**:
- Table of contents
- Section headings
- Key points per section
- Internal links to other docs

**Example**: `3.plot📋/documentation-guide-outline.md`
```markdown
# Documentation Best Practices Guide

## 1. Introduction
- Why good docs matter
- Common pitfalls

## 2. Structure
- Information architecture
- Navigation design
- Link to [[workflow.md]]

## 3. Writing Style
- Clarity over cleverness
- Active voice
- Code examples

## 4. Maintenance
- Review schedule
- Version control
- Link to [[vector-search.md]] for discovery
```

**Guidelines**:
- Don't write full sentences yet
- Focus on logical flow
- Mark sections that need research
- Use wikilinks to reference other docs

### 4.publish📚 - Final Documentation

**Purpose**: Write polished, publishable content. **This becomes your website.**

**What goes here**:
- Complete, well-written documents
- Production-ready content
- Everything you want public

**Example**: `4.publish📚/documentation-guide.md`
```markdown
# Documentation Best Practices

Good documentation is the difference between a useful product
and an abandoned one. This guide covers proven practices
from teams shipping great docs.

## Why Documentation Matters

Users can't use what they can't understand. Even the best
code is useless without clear documentation...

[Full, polished content continues...]
```

**Guidelines**:
- Write complete sentences
- Add code examples
- Include images/diagrams
- Test all links
- Proofread carefully

**Special Features**:
- Files here become website pages
- Supports Obsidian wikilinks: `[[page]]`
- Supports markdown links: `[page](./page.md)`
- Mermaid diagrams work automatically

### archive🗑️ - Unused Materials

**Purpose**: Store content that didn't make the cut.

**What goes here**:
- Outdated drafts
- Rejected ideas
- Superseded content
- Research that led nowhere

**Example**: `archive🗑️/old-architecture-design.md`

**Guidelines**:
- Don't delete, archive
- Add date when archived
- Add reason for archiving
- Can resurrect later if needed

## Example: Full Workflow

Let's document a new feature "Real-time Collaboration":

### Step 1: Prompt
`0.prompt🤖/feature-documentation-template.md`
```markdown
Document a new feature:
- What problem does it solve?
- How do users access it?
- Step-by-step guide
- Edge cases and troubleshooting
```

### Step 2: Source
`1.source📦/realtime-collab-spec.md`
```markdown
# Real-time Collaboration Spec
[Copy-paste from engineering doc]

Technical details:
- WebSocket connection
- Operational Transform algorithm
- Conflict resolution...
```

### Step 3: Sampling
`2.sampling✂️/realtime-collab-key-points.md`
```markdown
## User-Facing Features
- See others' cursors
- Live text updates
- Conflict auto-resolution

## Setup Requirements
- Stable internet
- WebSocket support
- Modern browser
```

### Step 4: Plot
`3.plot📋/realtime-collab-doc-outline.md`
```markdown
# Real-time Collaboration Guide
1. Introduction - Why real-time editing?
2. Getting Started - Enable the feature
3. Using Collaboration - See others edit
4. Troubleshooting - Connection issues
```

### Step 5: Publish
`4.publish📚/realtime-collaboration.md`
```markdown
# Real-time Collaboration

Edit documents together in real-time...

[Full, polished guide]
```

## Tips for Success

### Start Loose, End Tight
- Early stages: rough notes OK
- Later stages: polish increases
- Don't over-edit in 1.source📦

### Use Claude Code at Every Stage
- 0.prompt: "Generate interview questions about X"
- 1.source: "Summarize this transcript"
- 2.sampling: "Extract the 5 most important points"
- 3.plot: "Create an outline for a beginner's guide"
- 4.publish: "Write a polished introduction section"

### Link Between Stages
Reference earlier work:
```markdown
<!-- In 3.plot📋/guide-outline.md -->
Based on insights from [[../2.sampling✂️/user-interviews.md]]
```

### Don't Skip Stages
Each stage builds on the last:
- Skipping to 4.publish too early = writer's block
- Proper sampling and plotting = easier final writing

## Next Steps

- [Vector Search](./vector-search.md) - Find content across all stages
- [Deployment](./deployment.md) - Publish your docs to the web
