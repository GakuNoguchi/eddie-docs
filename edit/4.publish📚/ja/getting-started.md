# はじめに

このガイドでは、Eddieで最初のドキュメントを作成する方法を説明します。

## ディレクトリ構造

`npx create-eddie my-docs` を実行すると、以下のような構造が作成されます：

```
my-docs/
├── edit/                   # ユーザー向けワークスペース
│   ├── 0.prompt🤖/         # AIプロンプトテンプレート
│   ├── 1.source📦/         # 生の素材
│   ├── 2.sampling✂️/       # 抽出されたコンテンツ
│   ├── 3.plot📋/           # ドキュメントのアウトライン
│   ├── 4.publish📚/        # 最終ドキュメント（Webサイトになる）
│   └── archive🗑️/          # 未使用の素材
├── .system/                # バックエンド（触らない）
│   ├── site-config/        # VitePress設定
│   ├── claude/             # Claude Code設定
│   └── vector-data/        # 検索インデックス
├── .env                    # OpenAI APIキー
└── README.md
```

## Eddieのワークフロー

Eddieはプロフェッショナルなライティングからインスピレーションを得た5段階のプロセスに従います：

### ステージ0: プロンプト 🤖

コンテンツのアイデアを生成するAIプロンプトを作成します。

**例**: `edit/0.prompt🤖/interview-prompt.md`
```markdown
開発者に好きなフレームワークについてインタビューする。
以下について尋ねる：
- なぜそれを選んだか
- どんな問題を解決するか
- ベストプラクティス
```

### ステージ1: ソース 📦

文字起こし、メモ、リサーチなどの生の素材を保存します。

**例**: `edit/1.source📦/interview-transcript.md`
```markdown
Q: なぜNext.jsを選びましたか？
A: SSRとルーティングの問題を解決してくれたので...
```

### ステージ2: サンプリング ✂️

ソース素材から重要なポイントを抽出して洗練します。

**例**: `edit/2.sampling✂️/nextjs-benefits.md`
```markdown
## Next.jsの利点
- 組み込みSSR
- ファイルベースのルーティング
- APIルート
```

### ステージ3: プロット 📋

最終ドキュメントのアウトラインを作成します。

**例**: `edit/3.plot📋/nextjs-guide-outline.md`
```markdown
# Next.jsガイドのアウトライン
1. はじめに
2. 主な機能
3. はじめに
4. ベストプラクティス
```

### ステージ4: パブリッシュ 📚

最終的な、洗練されたドキュメントを書きます。**これがWebサイトになります。**

**例**: `edit/4.publish📚/nextjs-guide.md`
```markdown
# Next.jsガイド

Next.jsは、以下を提供するReactフレームワークです...
```

## 最初のドキュメント

シンプルなガイドを作成してみましょう：

### 1. ソースファイルを作成

`edit/1.source📦/my-notes.md` を作成：

```markdown
# プロジェクトのメモ
- EddieはVitePressを静的サイトに使用
- ベクトル検索はOpenAIエンベディングを使用
- Obsidian Wikiリンクが自動的に動作
```

### 2. 重要なポイントを抽出

`edit/2.sampling✂️/eddie-features.md` を作成：

```markdown
## Eddieの機能
- **VitePress**: 静的サイト生成
- **ベクトル検索**: セマンティックなドキュメントナビゲーション
- **Obsidian**: Wikiリンクサポート
```

### 3. アウトラインを作成

`edit/3.plot📋/eddie-overview-outline.md` を作成：

```markdown
# Eddie概要のアウトライン
1. Eddieとは？
2. 主な機能
3. なぜEddieを使うのか？
4. 次のステップ
```

### 4. 最終ドキュメントを書く

`edit/4.publish📚/eddie-overview.md` を作成：

```markdown
# Eddie概要

EddieはAI支援ドキュメントフレームワークです...

## 主な機能
- 静的サイト用のVitePress
- ナビゲーション用のベクトル検索
- Obsidian統合

## なぜEddieを使うのか？
従来のドキュメントは硬直的すぎるか、自由すぎるかのどちらかです...
```

### 5. サイトを表示

開発サーバーを実行：

```bash
npm run dev
```

[http://localhost:5173/eddie-overview](http://localhost:5173/eddie-overview) にアクセス

## ベクトル検索の使用

ドキュメントをインデックス化：

```bash
npm run reindex
```

セマンティック検索：

```bash
npm run search "ドキュメントの作成方法"
```

結果は、正確なキーワードが含まれていなくても、関連するドキュメントを表示します。

## ドキュメント間のリンク

Obsidian WikiリンクまたはMarkdown標準を使用：

```markdown
セットアップについては[[installation]]を参照。
セットアップについては[installation](./installation.md)を参照。
```

どちらもVitePressで動作します！

## Claude Codeでの使用

1. VS Codeでプロジェクトを開く：`code .`
2. Claude Codeを起動
3. ヘルプを求める：
   > 「1.source📦のメモを読んで、3.plot📋にアウトラインを作成して」

Claudeはあなたのeddie構造をナビゲートし、各ステージをサポートします。

## 次のステップ

- [ワークフロー](./workflow.md) - 各ステージを深く理解
- [ベクトル検索](./vector-search.md) - 高度な検索の使い方
- [デプロイ](./deployment.md) - Webに公開
