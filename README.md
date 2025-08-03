<img width="1536" height="1024" alt="自然言語からコード生成できる 開発者向けメモアプリ" src="https://github.com/user-attachments/assets/d38bb9ff-ca8e-4c3c-ae20-5efc894fe78d" />


# 🧠 Code Snippet Memo

> 自然言語で「○○のコード書いて」と入力 → GPTが即座にスニペットを生成・保存・再利用できる開発者向けアプリ

<img width="940" height="303" alt="スクリーンショット" src="https://github.com/user-attachments/assets/456b7644-5b1b-41a5-9f2e-ea1bf9bacc3c" />

---

## 🚀 概要

**Code Snippet Memo**は以下のような用途に最適です：

- **自然言語からコードスニペットを生成したい**
- **履歴を保存・再利用したい**
- **ChatGPTやCodexの練習に使いたい**

OpenAIのAPI（GPT-4 / GPT-3.5 Turbo）とNext.jsで構築した、**コード×AIのシンプルで実用的なWebアプリ**です。

---

## 🛠️ 使用技術

| 技術スタック | 内容 |
|--------------|------|
| フレームワーク | [Next.js](https://nextjs.org/) (TypeScript) |
| UIライブラリ | [Tailwind CSS](https://tailwindcss.com/) |
| 状態管理 | React `useState`, `useEffect` |
| ストレージ | `localStorage`（将来的にSupabase対応可能） |
| API連携 | OpenAI Chat Completions API (`gpt-4`, `gpt-3.5-turbo`) |

---

## ✨ 機能一覧

- 💬 自然言語でのコード要求（例: `Pythonで素数判定のコードを書いて`）
- 🤖 GPTがコードスニペットをコメント付きで自動生成
- 🧠 生成結果を履歴として保存（localStorage）
- 📋 コードのコピー＆削除機能
- 💡 シンタックスハイライト付きのコード表示
- 🗃️ 履歴リスト表示（新しい順）

---

## 📁 ディレクトリ構成

```bash
code-snippet-memo/
├── pages/
│   ├── index.tsx        # メインUI（1ページ完結）
│   └── api/
│       └── generate.ts  # OpenAI APIとの連携エンドポイント
├── components/
│   ├── SnippetForm.tsx
│   ├── SnippetOutput.tsx
│   └── SnippetHistory.tsx
├── styles/
│   └── globals.css      # Tailwind設定
├── types/
│   └── snippet.ts       # 型定義（Snippet）
├── utils/
│   └── localStorage.ts  # localStorage操作用ユーティリティ
├── public/
│   └── screenshot.png   # スクリーンショット画像（任意）
├── .env.local.example   # APIキーの設定例
├── tailwind.config.js
├── jest.config.js       # テスト設定
├── tsconfig.json
└── README.md            # ← あなたが今読んでいるファイル
````

---

## 🌐 使い方

### 1. クローンして依存関係をインストール

```bash
git clone https://github.com/your-username/code-snippet-memo.git
cd code-snippet-memo
npm install
```

### 2. OpenAI APIキーを設定

`.env.local` ファイルを作成して、以下を記述：

```
OPENAI_API_KEY=sk-xxxxxx...
```

### 3. 開発サーバーを起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) にアクセス。

---

## 🧪 テストとLint

```bash
npm test        # Jestでユニットテスト実行
npm run lint    # ESLintチェック
```

---

## 🔒 環境変数（.env）

| 変数名              | 説明                 |
| ---------------- | ------------------ |
| `OPENAI_API_KEY` | OpenAI APIアクセス用のキー |

---

## 🧱 今後の拡張予定（未実装）

* 🔠 言語選択（Python / JavaScript / Bash など）
* 🔐 Supabaseでのユーザーごとの保存
* 📝 GitHub Gistへのエクスポート
* 🏷️ タグ付け・検索機能

---

## 📄 ライセンス

MIT

---

## 🧑‍💻 作者

[ともプログラム便り](https://github.com/TomoProgrammingDayori)

ポートフォリオやAIツール開発に関する情報もぜひご覧ください！
