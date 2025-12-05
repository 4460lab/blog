import { NextRequest, NextResponse } from 'next/server';

/**
 * Decap CMS用のGitHub APIプロキシエンドポイント
 * 認証済みリクエストをGitHub APIにプロキシする
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const accessToken = request.headers.get('authorization')?.replace('Bearer ', '');

  if (!accessToken) {
    return NextResponse.json({ error: '認証トークンが必要です' }, { status: 401 });
  }

  const path = searchParams.get('path');
  if (!path) {
    return NextResponse.json({ error: 'パスが指定されていません' }, { status: 400 });
  }

  try {
    const githubApiUrl = `https://api.github.com/${path}`;
    const response = await fetch(githubApiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'Decap-CMS',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('GitHub APIプロキシエラー:', error);
    return NextResponse.json(
      { error: 'GitHub APIリクエスト中にエラーが発生しました' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const accessToken = request.headers.get('authorization')?.replace('Bearer ', '');

  if (!accessToken) {
    return NextResponse.json({ error: '認証トークンが必要です' }, { status: 401 });
  }

  const path = searchParams.get('path');
  if (!path) {
    return NextResponse.json({ error: 'パスが指定されていません' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const githubApiUrl = `https://api.github.com/${path}`;
    const response = await fetch(githubApiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'Decap-CMS',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('GitHub APIプロキシエラー:', error);
    return NextResponse.json(
      { error: 'GitHub APIリクエスト中にエラーが発生しました' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const accessToken = request.headers.get('authorization')?.replace('Bearer ', '');

  if (!accessToken) {
    return NextResponse.json({ error: '認証トークンが必要です' }, { status: 401 });
  }

  const path = searchParams.get('path');
  if (!path) {
    return NextResponse.json({ error: 'パスが指定されていません' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const githubApiUrl = `https://api.github.com/${path}`;
    const response = await fetch(githubApiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'Decap-CMS',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('GitHub APIプロキシエラー:', error);
    return NextResponse.json(
      { error: 'GitHub APIリクエスト中にエラーが発生しました' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const accessToken = request.headers.get('authorization')?.replace('Bearer ', '');

  if (!accessToken) {
    return NextResponse.json({ error: '認証トークンが必要です' }, { status: 401 });
  }

  const path = searchParams.get('path');
  if (!path) {
    return NextResponse.json({ error: 'パスが指定されていません' }, { status: 400 });
  }

  try {
    const githubApiUrl = `https://api.github.com/${path}`;
    const response = await fetch(githubApiUrl, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'Decap-CMS',
      },
    });

    if (!response.ok && response.status !== 204) {
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    }

    return new NextResponse(null, { status: response.status || 204 });
  } catch (error) {
    console.error('GitHub APIプロキシエラー:', error);
    return NextResponse.json(
      { error: 'GitHub APIリクエスト中にエラーが発生しました' },
      { status: 500 }
    );
  }
}

