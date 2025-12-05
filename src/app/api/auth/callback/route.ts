import { NextRequest, NextResponse } from 'next/server';

/**
 * Decap CMS用のOAuth認証コールバックエンドポイント
 * GitHubからの認証コードを受け取り、アクセストークンを返す
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code) {
    return NextResponse.json(
      { error: '認証コードが提供されませんでした' },
      { status: 400 }
    );
  }

  try {
    // GitHub OAuthトークンエンドポイントにリクエスト
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code,
        state: state,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('トークン取得に失敗しました');
    }

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return NextResponse.json(
        { error: tokenData.error_description || tokenData.error },
        { status: 400 }
      );
    }

    // Decap CMSが期待する形式でトークンを返す
    // Decap CMSは認証後、リダイレクトURLにトークンを付与する
    const redirectUrl = new URL('/admin', request.url);
    redirectUrl.searchParams.set('access_token', tokenData.access_token);
    if (tokenData.refresh_token) {
      redirectUrl.searchParams.set('refresh_token', tokenData.refresh_token);
    }

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('OAuth認証エラー:', error);
    return NextResponse.json(
      { error: '認証処理中にエラーが発生しました' },
      { status: 500 }
    );
  }
}

/**
 * Decap CMSからの認証開始リクエストを処理
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { repo, branch = 'main' } = body;

    if (!process.env.GITHUB_CLIENT_ID) {
      return NextResponse.json(
        { error: 'GitHub Client IDが設定されていません' },
        { status: 500 }
      );
    }

    // GitHub OAuth認証URLを生成
    const authUrl = new URL('https://github.com/login/oauth/authorize');
    authUrl.searchParams.set('client_id', process.env.GITHUB_CLIENT_ID);
    authUrl.searchParams.set('scope', 'repo user:email');
    authUrl.searchParams.set('redirect_uri', `${request.nextUrl.origin}/api/auth/callback`);
    authUrl.searchParams.set('state', JSON.stringify({ repo, branch }));

    return NextResponse.json({ auth_url: authUrl.toString() });
  } catch (error) {
    console.error('認証開始エラー:', error);
    return NextResponse.json(
      { error: '認証開始処理中にエラーが発生しました' },
      { status: 500 }
    );
  }
}

