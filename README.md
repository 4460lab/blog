# Next.js ブログ

Next.js 14のApp Routerを使用したサーバレスブログシステムです。

## 機能

- Next.js 14 (App Router)
- Tailwind CSS
- Decap CMS (コンテンツ管理)
- NextAuth.jsによるGitHub OAuth認証
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

### 3. 環境変数の設定

`.env.local`ファイルを作成し、以下の環境変数を設定してください：

```bash
# GitHub OAuth設定
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# GitHubリポジトリ設定
GITHUB_REPO=username/repo-name

# Next.js設定
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# ベースURL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

#### GitHub OAuthアプリケーションの作成

1. GitHubにログインし、[Settings > Developer settings > OAuth Apps](https://github.com/settings/developers)にアクセス
2. 「New OAuth App」をクリック
3. 以下の情報を入力：
   - **Application name**: アプリケーション名（例: My Blog CMS）
   - **Homepage URL**: `http://localhost:3000`（開発環境）または本番URL
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback`（開発環境）または `https://your-domain.vercel.app/api/auth/callback`
4. 「Register application」をクリック
5. **Client ID**と**Client Secret**をコピーして`.env.local`に設定

#### NEXTAUTH_SECRETの生成

```bash
openssl rand -base64 32
```

### 4. 管理画面へのアクセス

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
│   │   ├── api/        # APIルート
│   │   │   └── auth/   # 認証エンドポイント
│   │   │       ├── [...nextauth]/  # NextAuth.js設定
│   │   │       ├── callback/       # OAuthコールバック
│   │   │       └── proxy/          # GitHub APIプロキシ
│   │   ├── admin/      # 管理画面ページ
│   │   ├── posts/      # 記事詳細ページ
│   │   ├── globals.css # グローバルスタイル
│   │   ├── layout.tsx  # ルートレイアウト
│   │   └── page.tsx    # ホームページ
│   └── lib/
│       ├── posts.ts         # 記事取得ユーティリティ
│       └── github-auth.ts   # GitHub認証ヘルパー
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

### Decap CMSの認証設定

このプロジェクトは、NextAuth.jsを使用したGitHub OAuth認証を実装しています。

#### 認証フロー

1. Decap CMSからログイン要求が来ると、`/api/auth`エンドポイントがGitHub認証URLを返します
2. ユーザーがGitHubで認証すると、`/api/auth/callback`エンドポイントにリダイレクトされます
3. 認証コードからアクセストークンを取得し、Decap CMSに返します
4. Decap CMSは取得したトークンを使用してGitHub APIにアクセスします

#### Vercelへのデプロイ時の設定

1. Vercelダッシュボードで「Settings」→「Environment Variables」に移動
2. 以下の環境変数を設定：
   - `GITHUB_CLIENT_ID`: GitHub OAuth Client ID
   - `GITHUB_CLIENT_SECRET`: GitHub OAuth Client Secret
   - `GITHUB_REPO`: GitHubリポジトリ名（例: `username/repo-name`）
   - `NEXTAUTH_URL`: 本番URL（例: `https://your-domain.vercel.app`）
   - `NEXTAUTH_SECRET`: NextAuth.jsのシークレットキー
   - `NEXT_PUBLIC_BASE_URL`: 本番URL（例: `https://your-domain.vercel.app`）

3. GitHub OAuthアプリケーションのコールバックURLを本番URLに更新：
   - Authorization callback URL: `https://your-domain.vercel.app/api/auth/callback`

4. `public/admin/config.yml`の`repo`を本番環境に合わせて更新：
   ```yaml
   backend:
     name: github
     repo: username/repo-name  # 実際のリポジトリ名に変更
     branch: main
     auth_endpoint: /api/auth/callback
   ```

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
