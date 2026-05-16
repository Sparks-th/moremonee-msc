import { useCallback, useEffect, useState } from 'react';
import { fetchPublicPosts } from '../../api/feed';
import type { PostType, PublicFeedPost } from '../../types/feed';
import FeedPostPreview from './FeedPostPreview';

interface LandingFeedProps {
  onPostClick: (post: PublicFeedPost) => void;
}

const PREVIEW_LIMIT = 8;

function FeedSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-slate-800/80 dark:bg-slate-900/40"
        >
          <div className="flex gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-32 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-2 w-48 rounded bg-slate-100 dark:bg-slate-800" />
            </div>
          </div>
          <div className="mt-4 h-36 rounded-xl bg-slate-100 dark:bg-slate-800" />
        </div>
      ))}
    </div>
  );
}

export default function LandingFeed({ onPostClick }: LandingFeedProps) {
  const [postType, setPostType] = useState<PostType>('latest');
  const [posts, setPosts] = useState<PublicFeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = useCallback(async (type: PostType, signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPublicPosts(type, signal);
      setPosts(data.results.slice(0, PREVIEW_LIMIT));
    } catch (err) {
      if (signal?.aborted) return;
      setError(err instanceof Error ? err.message : 'Could not load feed');
      setPosts([]);
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadPosts(postType, controller.signal);
    return () => controller.abort();
  }, [postType, loadPosts]);

  return (
    <section id="feed" className="scroll-mt-20 mx-auto max-w-3xl">
      <div className="mb-6 flex flex-col gap-4 border-b border-slate-200/80 pb-4 sm:flex-row sm:items-end sm:justify-between dark:border-slate-800/80">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Student Conversations
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Live preview from campuses nationwide
          </p>
        </div>
        <div className="flex gap-6 text-sm font-medium">
          {(['latest', 'trending'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setPostType(tab)}
              disabled={loading && postType === tab}
              className={`relative pb-2 capitalize transition-colors ${
                postType === tab
                  ? 'font-bold text-slate-900 dark:text-slate-100'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
              }`}
            >
              {tab}
              {postType === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-1 rounded-full bg-blue-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      {loading && <FeedSkeleton />}

      {!loading && error && (
        <div className="rounded-2xl border border-red-200/80 bg-red-50 p-6 text-center dark:border-red-900/50 dark:bg-red-950/30">
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          <button
            type="button"
            onClick={() => loadPosts(postType)}
            className="mt-3 text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <p className="py-12 text-center text-sm text-slate-500">No posts yet.</p>
      )}

      {!loading && !error && posts.length > 0 && (
        <div className="mx-auto flex max-w-xl flex-col gap-4 lg:max-w-lg">
          {posts.map((post) => (
            <FeedPostPreview key={post.id} post={post} onSelect={onPostClick} />
          ))}
        </div>
      )}
    </section>
  );
}
