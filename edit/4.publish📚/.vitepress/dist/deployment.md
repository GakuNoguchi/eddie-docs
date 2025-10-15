# Deployment

Deploy your Eddie documentation to the web with Vercel.

## Quick Deploy

### 1. Initialize Git

```bash
cd my-docs
git init
git add .
git commit -m "Initial commit"
```

### 2. Create GitHub Repository

Using GitHub CLI:

```bash
gh repo create my-docs --public --source=. --remote=origin
git push -u origin main
```

Or manually:
1. Go to [github.com/new](https://github.com/new)
2. Create repository `my-docs`
3. Push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/my-docs.git
   git push -u origin main
   ```

### 3. Deploy to Vercel

Visit [vercel.com](https://vercel.com):

1. Click **"Add New Project"**
2. Import your GitHub repository
3. Vercel auto-detects VitePress settings:
   - **Framework**: VitePress
   - **Build Command**: `npm run build`
   - **Output Directory**: `edit/4.publish📚/.vitepress/dist`
4. Click **"Deploy"**

Your site will be live at `https://my-docs.vercel.app` in ~60 seconds!

## Manual Configuration

If Vercel doesn't auto-detect settings:

**Framework Preset**: VitePress

**Build Command**:
```bash
npm run build
```

**Output Directory**:
```
edit/4.publish📚/.vitepress/dist
```

**Install Command**:
```bash
npm install
```

**Root Directory**: `./` (leave default)

## Environment Variables

Vector search requires `OPENAI_API_KEY`, but this is **only for local development**.

**Don't add it to Vercel** - the deployed site is static HTML/JS with no server-side search.

If you want server-side search on production, see [Advanced: API Routes](#advanced-api-routes).

## Automatic Deployments

After initial setup, every push to `main` triggers a new deployment:

```bash
# Edit documentation
vim edit/4.publish📚/getting-started.md

# Commit and push
git add .
git commit -m "docs: update getting started guide"
git push

# Vercel automatically rebuilds and deploys (30-60s)
```

Visit your Vercel dashboard to see deployment status.

## Custom Domain

### Add Domain in Vercel

1. Go to your project in Vercel
2. Click **"Settings"** → **"Domains"**
3. Add your domain (e.g., `docs.mycompany.com`)
4. Follow DNS instructions

### Configure DNS

Add Vercel's DNS records at your domain registrar:

**Option A: CNAME (subdomains)**
```
CNAME  docs  cname.vercel-dns.com
```

**Option B: A Record (apex domain)**
```
A      @     76.76.21.21
```

Propagation takes 5-60 minutes.

## Multiple Environments

### Preview Deployments

Every pull request gets a preview URL:

```bash
git checkout -b feature/new-guide
# Make changes
git push origin feature/new-guide
# Create PR on GitHub
# Vercel comments with preview URL: https://my-docs-abc123.vercel.app
```

### Production Branch

By default, `main` branch = production.

To use `production` branch instead:

1. Go to Vercel project settings
2. **"Git"** → **"Production Branch"**
3. Change to `production`

Now:
- Push to `main` → preview deployment
- Push to `production` → production deployment

## Build Optimization

### Speed Up Builds

Eddie projects build fast (~20-30s), but for large sites:

**1. Enable VitePress cache**

Already configured in Eddie! Cached in `.vitepress/cache/`.

**2. Use pnpm instead of npm**

```bash
# In Vercel settings
Install Command: pnpm install
```

~20% faster than npm.

**3. Reduce dependencies**

Keep `package.json` minimal. Eddie includes only essentials.

### Build Size

Typical Eddie site:
- **10 docs**: ~500 KB
- **50 docs**: ~1.5 MB
- **100 docs**: ~2.5 MB

VitePress minifies and compresses automatically.

## SEO Configuration

### Basic SEO

Edit `.system/site-config/config.js`:

```javascript
export default defineConfig({
  title: 'My Docs',
  description: 'Comprehensive documentation for my project',

  head: [
    ['meta', { name: 'keywords', content: 'documentation, guides, tutorials' }],
    ['meta', { property: 'og:image', content: '/og-image.png' }]
  ]
})
```

### Sitemap

VitePress generates sitemaps automatically at `/sitemap.xml`.

Submit to Google Search Console:
1. Visit [search.google.com/search-console](https://search.google.com/search-console)
2. Add property: `https://my-docs.vercel.app`
3. Submit sitemap: `https://my-docs.vercel.app/sitemap.xml`

### robots.txt

Create `edit/4.publish📚/public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://my-docs.vercel.app/sitemap.xml
```

## Analytics

### Vercel Analytics

Enable in Vercel dashboard:
1. Go to your project
2. **"Analytics"** tab
3. Click **"Enable"**

Free tier: 100K events/month

### Google Analytics

Add to `.system/site-config/config.js`:

```javascript
head: [
  ['script', {
    async: true,
    src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX'
  }],
  ['script', {}, `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `]
]
```

## Advanced: API Routes

To add server-side vector search to production:

### Option 1: Vercel Serverless Functions

Create `api/search.js`:

```javascript
import { VectorStore } from 'eddie-vector-search';

export default async function handler(req, res) {
  const { query } = req.query;
  const store = new VectorStore(process.env.VECTOR_DATA_PATH);
  const results = await store.search(query);
  res.json(results);
}
```

Add `OPENAI_API_KEY` to Vercel environment variables.

### Option 2: Static Search Index

Pre-generate search index and include in build:

```bash
npm run reindex
# Copy .system/vector-data/vector_store.json to public/
cp .system/vector-data/vector_store.json edit/4.publish📚/public/
```

Create client-side search (no OpenAI API needed in production).

This is more complex but has zero backend cost.

## Troubleshooting

### Build fails: "Module not found"

Make sure `package.json` includes all dependencies:

```json
"dependencies": {
  "vitepress": "^1.0.0",
  "eddie-vector-search": "^1.0.0"
}
```

Then:
```bash
npm install
git add package.json package-lock.json
git commit -m "fix: add missing dependencies"
git push
```

### 404 on deployed site

Check **Output Directory** in Vercel settings:
```
edit/4.publish📚/.vitepress/dist
```

Not `dist` or `.vitepress/dist`.

### Build succeeds but pages are blank

Check browser console for errors. Usually asset path issues.

Ensure `base` is set correctly in `.system/site-config/config.js`:

```javascript
export default defineConfig({
  base: '/', // For custom domain
  // base: '/my-docs/', // For GitHub Pages
})
```

### Vercel deployment is slow

Typical build time: 20-40s

If slower:
- Check build logs for errors
- Try `pnpm` instead of `npm`
- Reduce dependencies

## Next Steps

Your Eddie site is now live! 🎉

- Share the URL with your team
- Set up custom domain
- Enable analytics
- Keep writing great docs

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [VitePress Guide](https://vitepress.dev/guide/what-is-vitepress)
- [Eddie GitHub](https://github.com/yourname/eddie) *(coming soon)*
