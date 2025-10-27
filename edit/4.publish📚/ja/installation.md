# インストール

## 前提条件

Eddieをインストールする前に、以下を用意してください：

- ✅ **Node.js 18+** - [ここからダウンロード](https://nodejs.org/)
- ✅ **npm** または **pnpm** - Node.jsに同梱
- ✅ **OpenAI APIキー** - [ここから取得](https://platform.openai.com/api-keys)
- ✅ **Obsidian** (オプション) - [ここからダウンロード](https://obsidian.md/)
- ✅ **VS Code + Claude Code** (オプション) - AI支援用

## クイックインストール

1つのコマンドで新しいEddieプロジェクトを作成：

```bash
npx create-eddie my-docs
```

これにより以下が実行されます：
1. Eddie構造で `my-docs/` ディレクトリを作成
2. VitePressとeddie-vector-searchをインストール
3. 空のベクトルストアを初期化
4. サンプルドキュメントを作成

## セットアップ手順

### 1. プロジェクトに移動

```bash
cd my-docs
```

### 2. 環境設定

サンプル環境ファイルをコピー：

```bash
cp .env.example .env
```

`.env`を編集してOpenAI APIキーを追加：

```bash
OPENAI_API_KEY=sk-...ここにあなたのキー
```

### 3. 開発サーバーを起動

```bash
npm run dev
```

[http://localhost:5173](http://localhost:5173) を開いてサイトを表示します。

## オプション: Obsidianで開く

EddieはObsidianとシームレスに連携するように設計されています：

1. Obsidianを起動
2. **「フォルダをVaultとして開く」** をクリック
3. Eddieプロジェクトフォルダー（例：`my-docs`）を選択

これで以下が可能になります：
- ObsidianでMarkdownファイルを編集
- Wikiリンクを使用：`[[Page]]` または `[[text]](link.md)`
- VitePressでリアルタイムに変更を確認（`npm run dev`を実行中）

## オプション: VS Code + Claude Codeで開く

AI支援ライティングの場合：

1. VS Codeでプロジェクトを開く：
   ```bash
   code .
   ```

2. Claude Code拡張機能を起動

3. Claudeにドキュメント作成を依頼：
   > 「このプロジェクトのはじめにガイドを作成して」

## インストールの確認

ベクトル検索のテストを実行：

```bash
npm run search "documentation"
```

サンプルドキュメントから検索結果が表示されるはずです。

## 次のステップ

- [はじめに](./getting-started.md) - 最初のドキュメントを作成
- [ワークフロー](./workflow.md) - Eddieのプロセスを理解
- [ベクトル検索](./vector-search.md) - セマンティック検索を学ぶ

## トラブルシューティング

### "Module not found"エラー

```bash
rm -rf node_modules package-lock.json
npm install
```

### ベクトル検索が動作しない

`.env`にOpenAI APIキーがあることを確認：

```bash
cat .env
# 表示されるべき内容: OPENAI_API_KEY=sk-...
```

ドキュメントを再インデックス：

```bash
npm run reindex
```

### VitePressが起動しない

Node.jsのバージョンを確認：

```bash
node --version
# v18.0.0以上である必要があります
```
