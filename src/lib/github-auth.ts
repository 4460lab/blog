/**
 * Decap CMS用のGitHub認証ヘルパー関数
 */

export interface GitHubAuthConfig {
  clientId: string;
  repo: string;
  branch?: string;
  baseUrl: string;
}

/**
 * GitHub OAuth認証URLを生成
 */
export function getGitHubAuthUrl(config: GitHubAuthConfig): string {
  const { clientId, repo, branch = 'main', baseUrl } = config;

  const params = new URLSearchParams({
    client_id: clientId,
    scope: 'repo user:email',
    redirect_uri: `${baseUrl}/api/auth/callback`,
    state: JSON.stringify({ repo, branch }),
  });

  return `https://github.com/login/oauth/authorize?${params.toString()}`;
}

/**
 * 認証コードからアクセストークンを取得
 */
export async function getAccessTokenFromCode(
  code: string,
  clientId: string,
  clientSecret: string,
  state?: string
): Promise<{ access_token: string; refresh_token?: string }> {
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      state,
    }),
  });

  if (!response.ok) {
    throw new Error('トークン取得に失敗しました');
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error_description || data.error);
  }

  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
  };
}

