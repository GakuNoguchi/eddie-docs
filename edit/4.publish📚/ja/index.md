# Eddie

**Obsidian + Claude Code のためのAI支援ドキュメントフレームワーク**

Eddieは以下を組み合わせたドキュメントシステムです：
- 📝 **Obsidian** - Wikiリンク対応のMarkdownエディタ
- 🤖 **Claude Code** - AI駆動のライティングアシスタント
- 🌐 **VitePress** - 静的サイトジェネレーター
- 🔍 **ベクトル検索** - セマンティックなドキュメントナビゲーション

## なぜEddieなのか？

従来のドキュメントツールは、硬直的すぎる（CMS）か、自由すぎる（生のMarkdown）かのどちらかです。Eddieは以下を提供します：

✅ **AIネイティブなワークフロー** - 0.prompt🤖 から 4.publish📚 まで、プロンプト駆動のコンテンツ作成
✅ **Obsidian統合** - Wikiリンクを使った、お気に入りのMarkdownエディタ
✅ **自動デプロイ** - GitHubにプッシュ → Vercelがサイトをビルド
✅ **セマンティック検索** - キーワードだけでなく、意味でドキュメントを検索

## クイックスタート

```bash
npx create-eddie my-docs
cd my-docs
cp .env.example .env
# OPENAI_API_KEYを.envに追加
npm run dev
```

[http://localhost:5173](http://localhost:5173) を開いてサイトを確認してください。

## ドキュメント

- [インストール](./installation.md) - セットアップと要件
- [はじめに](./getting-started.md) - 最初のEddieプロジェクト
- [ワークフロー](./workflow.md) - 5段階のドキュメント作成プロセス
- [ベクトル検索](./vector-search.md) - セマンティック検索の使い方
- [デプロイ](./deployment.md) - Vercelへのデプロイ

## ワークフロー概要

```
0.prompt🤖   → AIプロンプトテンプレート
1.source📦   → 生の素材（文字起こし、メモ）
2.sampling✂️ → コンテンツの抽出と洗練
3.plot📋     → ドキュメントのアウトライン作成
4.publish📚  → 最終ドキュメントの執筆 → Webにデプロイ
archive🗑️    → 未使用の素材をアーカイブ
```

## コマンド

```bash
npm run dev         # 開発サーバー起動 (http://localhost:5173)
npm run build       # 静的サイトのビルド
npm run preview     # ビルド済みサイトのプレビュー

npm run search "クエリ"  # セマンティック検索
npm run reindex          # 全ドキュメントの再インデックス
```
