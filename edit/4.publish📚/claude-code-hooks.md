# Claude Code SessionStartフック

Claude Code には **hooks** という仕組みがあり、特定のイベント（セッション開始など）で自動的にコマンドを実行できます。

## 設定方法

### 1. 設定ファイルの配置

プロジェクトルートに以下のいずれかを作成：

```
.claude/settings.local.json
```

または

```
.system/claude/settings.local.json
```

### 2. 基本構造

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "cat YOUR_FILE.md"
          }
        ]
      }
    ]
  }
}
```

### 3. 各要素の説明

| 要素 | 説明 |
|------|------|
| `"hooks"` | フック定義のルートオブジェクト |
| `"SessionStart"` | セッション開始時のフック |
| `"matcher": "*"` | すべてのケースにマッチ（条件なし） |
| `"type": "command"` | シェルコマンドを実行 |
| `"command"` | 実行するコマンド（相対パス可） |

## 実行されるコマンド例

### 単一ファイルを表示

```json
{
  "type": "command",
  "command": "cat PROJECT_GUIDE.md"
}
```

### 複数ファイルを結合

```json
{
  "type": "command",
  "command": "cat RULES.md && echo '---' && cat STYLE_GUIDE.md"
}
```

### 動的な情報を含める

```json
{
  "type": "command",
  "command": "cat GUIDE.md && echo '\n---\nCurrent branch:' && git branch --show-current"
}
```

### 条件分岐

```json
{
  "type": "command",
  "command": "[ -f .env ] && echo '✓ .env found' || echo '⚠ .env missing'"
}
```

## 動作の流れ

```
1. VS Code でプロジェクトを開く
   ↓
2. Claude Code 拡張機能を起動
   ↓
3. settings.local.json を読み込み
   ↓
4. SessionStart フックを検出
   ↓
5. "command" で指定されたシェルコマンドを実行
   ↓
6. 実行結果が <session-start-hook>...</session-start-hook> で
   セッション冒頭に挿入される
   ↓
7. Claude がその内容を読み、コンテキストとして利用
```

## ファイル構成例

### パターン1: シンプル

```
my-project/
├── .claude/
│   ├── settings.local.json
│   └── GUIDE.md
└── (プロジェクトファイル)
```

**settings.local.json**:
```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "cat .claude/GUIDE.md"
          }
        ]
      }
    ]
  }
}
```

### パターン2: 複数ガイド

```
my-project/
├── .claude/
│   ├── settings.local.json
│   ├── coding-standards.md
│   ├── commit-conventions.md
│   └── deployment-guide.md
└── (プロジェクトファイル)
```

**settings.local.json**:
```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "cat .claude/coding-standards.md .claude/commit-conventions.md"
          }
        ]
      }
    ]
  }
}
```

### パターン3: 環境別

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "cat .claude/GUIDE.md && echo '\n---' && [ -f .env.local ] && echo '🔧 Development mode' || echo '🚀 Production mode'"
          }
        ]
      }
    ]
  }
}
```

## ベストプラクティス

### 1. ガイドファイルは Markdown で書く

**理由**: Claude は Markdown を理解しやすい

```markdown
# プロジェクトガイド

## ⚠️ Claude へ: 重要な注意事項

- コミット前に必ずテストを実行
- API キーは `.env` に記載（Git 管理外）
- コミットメッセージは Conventional Commits 形式

## ディレクトリ構造

- `src/` - ソースコード
- `tests/` - テストファイル
- `docs/` - ドキュメント
```

### 2. 相対パスを使う

✅ **Good**:
```json
{
  "command": "cat .claude/GUIDE.md"
}
```

❌ **Bad**: 絶対パス
```json
{
  "command": "cat /Users/username/project/.claude/GUIDE.md"
}
```

### 3. エラーハンドリング

```json
{
  "command": "cat .claude/GUIDE.md 2>/dev/null || echo 'Guide not found'"
}
```

### 4. 出力サイズに注意

- 長すぎるとトークンを消費
- 重要な情報だけを含める
- 目安: 500-2000 words

### 5. チーム共有

- `.claude/settings.local.json` を Git にコミット
- ガイドファイルも Git 管理
- 全員が同じ指示を Claude に与えられる

## デバッグ方法

### フックが動作しているか確認

1. Claude Code セッション開始
2. 最初のメッセージをスクロール
3. `<session-start-hook>` タグで囲まれた内容を探す

### 手動でコマンドを実行

```bash
cd /path/to/project
cat .claude/GUIDE.md
```

期待通りの出力が得られるか確認。

### 設定ファイルの JSON 構文チェック

```bash
cat .claude/settings.local.json | python -m json.tool
```

## ユースケース

### ドキュメント作成プロジェクト

```markdown
# ドキュメント執筆ガイド

## 新しいページを追加する方法
1. `docs/` にファイル作成
2. `sidebar.json` を更新
3. `npm run build` で確認

## 文体ルール
- です・ます調
- 簡潔に
- コード例を含める
```

### Web アプリ開発

```markdown
# 開発ガイド

## コーディング規約
- ESLint に従う
- TypeScript strict mode
- 関数は 50 行以内

## テスト
- 新機能には必ずテスト追加
- `npm test` でパス確認

## コミット
- feat: 新機能
- fix: バグ修正
- docs: ドキュメント
```

### データ分析プロジェクト

```markdown
# データ分析ガイド

## ノートブックの命名規則
- `01_data_loading.ipynb`
- `02_preprocessing.ipynb`
- `03_analysis.ipynb`

## データの場所
- 生データ: `data/raw/`
- 処理済み: `data/processed/`
- 結果: `data/results/`

## 注意事項
- 個人情報を含むデータは Git にコミットしない
```

## 高度な設定

### 複数のフック定義

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "cat .claude/MAIN_GUIDE.md"
          },
          {
            "type": "command",
            "command": "cat .claude/SHORTCUTS.md"
          }
        ]
      }
    ]
  }
}
```

### 条件付き実行（matcher）

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "*.py",
        "hooks": [
          {
            "type": "command",
            "command": "cat .claude/PYTHON_GUIDE.md"
          }
        ]
      },
      {
        "matcher": "*.js",
        "hooks": [
          {
            "type": "command",
            "command": "cat .claude/JS_GUIDE.md"
          }
        ]
      }
    ]
  }
}
```

### Permissions と組み合わせ

```json
{
  "permissions": {
    "allow": [
      "Bash(npm:*)",
      "Bash(git:*)",
      "Read(//**)"
    ]
  },
  "hooks": {
    "SessionStart": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "cat .claude/GUIDE.md"
          }
        ]
      }
    ]
  }
}
```

## 注意事項

### 1. セキュリティ

- `.claude/settings.local.json` には機密情報を含めない
- シェルコマンドは慎重に記述（任意コード実行のリスク）

### 2. パフォーマンス

- 重いコマンドは避ける（`find /` など）
- セッション開始が遅くなる可能性

### 3. クロスプラットフォーム

- Windows/Mac/Linux で動作するコマンドを使う
- `cat` は Unix/Mac では動作するが、Windows では `type` が必要
- 解決策: Node.js スクリプトを使う

```json
{
  "command": "node .claude/show-guide.js"
}
```

## Eddie での実装例

Eddie プロジェクトでは SessionStartフックがデフォルトで設定されています：

**`.system/claude/settings.local.json`**:
```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "cat .system/claude/EDDIE_GUIDE.md"
          }
        ]
      }
    ]
  }
}
```

これにより、新しいセッションの Claude Code は：
- サイドバーの更新方法を知っている
- ベクトル検索の使い方を知っている
- Eddie のディレクトリ構造を理解している

詳細は [Getting Started](./getting-started.md) を参照してください。

---

**SessionStartフックを使うことで、Claude Code をプロジェクト専用アシスタントにカスタマイズできます。**
