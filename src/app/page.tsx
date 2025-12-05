import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ブログ
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Next.jsで構築されたサーバレスブログ
          </p>
        </header>

        <div className="mb-8">
          <Link
            href="/admin"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            管理画面
          </Link>
        </div>

        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                まだ記事がありません。
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                <Link href="/admin" className="text-blue-600 hover:underline">
                  管理画面
                </Link>
                から記事を作成してください。
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  {post.date && (
                    <time className="text-sm text-gray-500 dark:text-gray-400 block mb-3">
                      {new Date(post.date).toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  )}
                  {post.excerpt && (
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {post.excerpt}
                    </p>
                  )}
                  <Link
                    href={`/posts/${post.slug}`}
                    className="inline-block text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    続きを読む →
                  </Link>
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}
