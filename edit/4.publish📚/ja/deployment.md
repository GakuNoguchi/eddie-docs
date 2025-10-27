# デプロイ

EddieドキュメントをVercelでWebに公開します。

## クイックデプロイ

### 1. Gitを初期化

```bash
cd my-docs
git init
git add .
git commit -m "Initial commit"
```

### 2. GitHubリポジトリを作成

GitHub CLIを使用：

```bash
gh repo create my-docs --public --source=. --remote=origin
git push -u origin main
```

または手動で：
1. [github.com/new](https://github.com/new) にアクセス
2. リポジトリ `my-docs` を作成
3. コードをプッシュ：
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/my-docs.git
   git push -u origin main
   ```

### 3. Vercelにデプロイ

[vercel.com](https://vercel.com) にアクセス：

1. **「Add New Project」** をクリック
2. GitHubリポジトリをインポート
3. VercelがVitePress設定を自動検出：
   - **Framework**: VitePress
   - **Build Command**: `npm run build`
   - **Output Directory**: `edit/4.publish📚/.vitepress/dist`
4. **「Deploy」** をクリック

約60秒で `https://my-docs.vercel.app` でサイトが公開されます！

## 手動設定

Vercelが設定を自動検出しない場合：

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

**Root Directory**: `./`（デフォルトのまま）

## 環境変数

ベクトル検索には `OPENAI_API_KEY` が必要ですが、これは**ローカル開発専用**です。

**Vercelには追加しないでください** - デプロイされたサイトは、サーバー側検索のない静的HTML/JSです。

本番環境でサーバー側検索が必要な場合は、[高度: APIルート](#高度-apiルート)を参照してください。

## 自動デプロイ

初期セットアップ後、`main` へのプッシュごとに新しいデプロイがトリガーされます：

```bash
# ドキュメントを編集
vim edit/4.publish📚/getting-started.md

# コミットしてプッシュ
git add .
git commit -m "docs: はじめにガイドを更新"
git push

# Vercelが自動的に再ビルドしてデプロイ（30-60秒）
```

Vercelダッシュボードでデプロイ状況を確認できます。

## カスタムドメイン

### Vercelでドメインを追加

1. Vercelのプロジェクトにアクセス
2. **「Settings」** → **「Domains」** をクリック
3. ドメインを追加（例：`docs.mycompany.com`）
4. DNS指示に従う

### DNSを設定

ドメインレジストラでVercelのDNSレコードを追加：

**オプションA: CNAME（サブドメイン）**
```
CNAME  docs  cname.vercel-dns.com
```

**オプションB: Aレコード（Apexドメイン）**
```
A      @     76.76.21.21
```

伝播には5〜60分かかります。

## 複数環境

### プレビューデプロイ

すべてのプルリクエストはプレビューURLを取得：

```bash
git checkout -b feature/new-guide
# 変更を加える
git push origin feature/new-guide
# GitHubでPRを作成
# VercelがプレビューURLをコメント: https://my-docs-abc123.vercel.app
```

### 本番ブランチ

デフォルトでは、`main` ブランチ = 本番環境。

代わりに `production` ブランチを使用するには：

1. Vercelプロジェクト設定にアクセス
2. **「Git」** → **「Production Branch」**
3. `production` に変更

これで：
- `main` へのプッシュ → プレビューデプロイ
- `production` へのプッシュ → 本番デプロイ

## ビルド最適化

### ビルドの高速化

Eddieプロジェクトは高速にビルドされます（約20-30秒）が、大規模サイトの場合：

**1. VitePressキャッシュを有効化**

Eddieで既に設定済み！`.vitepress/cache/` にキャッシュされます。

**2. npmの代わりにpnpmを使用**

```bash
# Vercel設定で
Install Command: pnpm install
```

npmより約20％高速。

**3. 依存関係を減らす**

`package.json` を最小限に保つ。Eddieは必須のもののみを含みます。

### ビルドサイズ

典型的なEddieサイト：
- **10ドキュメント**: 約500 KB
- **50ドキュメント**: 約1.5 MB
- **100ドキュメント**: 約2.5 MB

VitePressは自動的に最小化と圧縮を行います。

## SEO設定

### 基本的なSEO

`.system/site-config/config.js` を編集：

```javascript
export default defineConfig({
  title: 'My Docs',
  description: 'プロジェクトの包括的なドキュメント',

  head: [
    ['meta', { name: 'keywords', content: 'ドキュメント, ガイド, チュートリアル' }],
    ['meta', { property: 'og:image', content: '/og-image.png' }]
  ]
})
```

### サイトマップ

VitePressは `/sitemap.xml` でサイトマップを自動生成します。

Google Search Consoleに送信：
1. [search.google.com/search-console](https://search.google.com/search-console) にアクセス
2. プロパティを追加: `https://my-docs.vercel.app`
3. サイトマップを送信: `https://my-docs.vercel.app/sitemap.xml`

### robots.txt

`edit/4.publish📚/public/robots.txt` を作成：

```
User-agent: *
Allow: /

Sitemap: https://my-docs.vercel.app/sitemap.xml
```

## アナリティクス

### Vercelアナリティクス

Vercelダッシュボードで有効化：
1. プロジェクトにアクセス
2. **「Analytics」** タブ
3. **「Enable」** をクリック

無料枠: 月間100Kイベント

### Googleアナリティクス

`.system/site-config/config.js` に追加：

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

## 高度: APIルート

本番環境にサーバー側ベクトル検索を追加するには：

### オプション1: Vercelサーバーレス関数

`api/search.js` を作成：

```javascript
import { VectorStore } from 'eddie-vector-search';

export default async function handler(req, res) {
  const { query } = req.query;
  const store = new VectorStore(process.env.VECTOR_DATA_PATH);
  const results = await store.search(query);
  res.json(results);
}
```

Vercel環境変数に `OPENAI_API_KEY` を追加。

### オプション2: 静的検索インデックス

検索インデックスを事前生成してビルドに含める：

```bash
npm run reindex
# .system/vector-data/vector_store.json を public/ にコピー
cp .system/vector-data/vector_store.json edit/4.publish📚/public/
```

クライアント側検索を作成（本番環境でOpenAI API不要）。

これはより複雑ですが、バックエンドコストがゼロです。

## トラブルシューティング

### ビルド失敗: 「Module not found」

`package.json` にすべての依存関係が含まれていることを確認：

```json
"dependencies": {
  "vitepress": "^1.0.0",
  "eddie-vector-search": "^1.0.0"
}
```

その後：
```bash
npm install
git add package.json package-lock.json
git commit -m "fix: 欠けている依存関係を追加"
git push
```

### デプロイされたサイトで404

Vercel設定で **Output Directory** を確認：
```
edit/4.publish📚/.vitepress/dist
```

`dist` や `.vitepress/dist` ではありません。

### ビルドは成功するがページが空白

ブラウザコンソールでエラーを確認。通常はアセットパスの問題。

`.system/site-config/config.js` で `base` が正しく設定されていることを確認：

```javascript
export default defineConfig({
  base: '/', // カスタムドメインの場合
  // base: '/my-docs/', // GitHub Pagesの場合
})
```

### Vercelデプロイが遅い

典型的なビルド時間: 20-40秒

遅い場合：
- ビルドログでエラーを確認
- `npm` の代わりに `pnpm` を試す
- 依存関係を減らす

## 次のステップ

Eddieサイトが公開されました！🎉

- チームとURLを共有
- カスタムドメインを設定
- アナリティクスを有効化
- 優れたドキュメントを書き続ける

## リソース

- [Vercelドキュメント](https://vercel.com/docs)
- [VitePressガイド](https://vitepress.dev/guide/what-is-vitepress)
- [Eddie GitHub](https://github.com/yourname/eddie) *（近日公開）*
