import { NextRequest, NextResponse } from 'next/server';

/**
 * Decap CMSからの認証開始リクエストを処理
 * GitHub認証URLを返す
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const repo = searchParams.get('repo');
  const branch = searchParams.get('branch') || 'main';

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
  authUrl.searchParams.set(
    'redirect_uri',
    `${request.nextUrl.origin}/api/auth/callback`
  );
  authUrl.searchParams.set('state', JSON.stringify({ repo, branch }));

  // Decap CMSが期待する形式で返す
  return NextResponse.json({ auth_url: authUrl.toString() });
}

/**
 * Decap CMSからの認証開始リクエスト（POST）を処理
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
    authUrl.searchParams.set(
      'redirect_uri',
      `${request.nextUrl.origin}/api/auth/callback`
    );
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

