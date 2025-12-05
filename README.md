# Next.js ブログ

Next.js 14のApp Routerを使用したサーバレスブログシステムです。

## 機能

- Next.js 14 (App Router)
- Tailwind CSS
- Decap CMS (コンテンツ管理)
- Markdown記事サポート
- Vercelデプロイ対応

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

### 3. 管理画面へのアクセス

[http://localhost:3000/admin](http://localhost:3000/admin) にアクセスして記事を管理できます。

## プロジェクト構造

```
blog/
├── content/
│   └── posts/          # Markdown記事ファイル
├── public/
│   ├── admin/
│   │   ├── config.yml  # Decap CMS設定
│   │   └── index.html  # CMS管理画面
│   └── images/         # メディアファイル
├── src/
│   ├── app/            # Next.js App Router
│   │   ├── admin/      # 管理画面ページ
│   │   ├── posts/      # 記事詳細ページ
│   │   ├── globals.css # グローバルスタイル
│   │   ├── layout.tsx  # ルートレイアウト
│   │   └── page.tsx    # ホームページ
│   └── lib/
│       └── posts.ts    # 記事取得ユーティリティ
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Vercelへのデプロイ

### GitHub経由でデプロイ

1. このリポジトリをGitHubにプッシュ
2. [Vercel](https://vercel.com)にログイン
3. 「New Project」をクリック
4. GitHubリポジトリを選択
5. 設定を確認して「Deploy」をクリック

### Decap CMSの設定

Vercelにデプロイ後、Decap CMSを使用するには：

1. Vercelダッシュボードで「Settings」→「Environment Variables」に移動
2. 必要な環境変数を設定（GitHub OAuthなど）
3. Netlify Identityを有効化（Vercelの代替として）

または、`public/admin/config.yml`でバックエンド設定を変更してください。

## 記事の作成

記事は `content/posts/` ディレクトリにMarkdownファイルとして保存します。

### 記事のフォーマット

```markdown
---
title: "記事タイトル"
date: "2024-01-01"
excerpt: "記事の概要"
---

# 記事の内容

ここに記事の本文をMarkdown形式で記述します。
```

## ライセンス

MIT
