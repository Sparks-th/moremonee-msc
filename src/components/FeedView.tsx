import { useCallback, useEffect, useState } from 'react';
import { ArrowRight, Heart, MessageSquare, Play, Share2 } from 'lucide-react';
import { fetchPublicPosts } from '../api/feed';
import type { PostType, PublicFeedPost } from '../types/feed';
import {
  formatTimeAgo,
  getDisplayName,
  getInitials,
  getPostCaption,
  getPostGradient,
  getPostMedia,
  getSchoolLabel,
} from '../utils/feed';
import { Link } from 'react-router-dom';
import heroCard from '../assets/hero.png';

export default function FeedView() {
  const [feedFilter, setFeedFilter] = useState<PostType>('latest');
  const [posts, setPosts] = useState<PublicFeedPost[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (type: PostType, signal?: AbortSignal) => {
    setLoading(true);
    try {
      const data = await fetchPublicPosts(type, signal);
      setPosts(data.results);
    } catch {
      if (!signal?.aborted) setPosts([]);
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    load(feedFilter, controller.signal);
    return () => controller.abort();
  }, [feedFilter, load]);

  return (
    <div className="mx-auto w-full max-w-xl space-y-6 lg:max-w-lg">
      <section className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-900 via-[#0A1931] to-[#0A0F1E] p-6 shadow-xl">
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-12">
          <div className="space-y-3 md:col-span-7">
            <span className="inline-flex rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400">
              Elite Offer
            </span>
            <h1 className="text-xl font-black leading-tight text-white md:text-2xl">
              Unlock the Power of Community &amp; Earn ₦500 INSTANTLY
            </h1>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-xs font-bold text-slate-900 hover:bg-amber-400"
            >
              Join Now
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={3} />
            </Link>
          </div>
          <div className="flex justify-center md:col-span-5">
            <img
              src={heroCard}
              alt="MSC card"
              className="max-w-[200px] drop-shadow-xl"
            />
          </div>
        </div>
      </section>

      <section className="flex items-end justify-between border-b border-slate-200/80 pb-0 pt-1 dark:border-slate-800/80">
        <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
          Student Conversations
        </h2>
        <div className="flex gap-5 text-xs font-medium">
          {(['latest', 'trending'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFeedFilter(tab)}
              className={`relative pb-2 capitalize transition-colors ${
                feedFilter === tab
                  ? 'font-bold text-slate-900 dark:text-slate-100'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {tab}
              {feedFilter === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-1 rounded-full bg-blue-500" />
              )}
            </button>
          ))}
        </div>
      </section>

      {loading && (
        <p className="py-8 text-center text-sm text-slate-500">Loading feed…</p>
      )}

      <section className="space-y-4">
        {!loading &&
          posts.map((post) => {
            const media = getPostMedia(post);
            const preview = getPostCaption(post, media, 200);
            return (
              <article
                key={post.id}
                className="panel-card space-y-3 p-4"
              >
                <header className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600/20 text-xs font-bold text-blue-600 dark:text-blue-400">
                      {getInitials(post.first_name, post.last_name)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-slate-900 dark:text-slate-100">
                        {getDisplayName(post.first_name, post.last_name)}
                      </p>
                      <span className="mt-0.5 inline-block max-w-full truncate rounded-md border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-[9px] font-bold uppercase text-blue-600 dark:text-blue-400">
                        {getSchoolLabel(post)}
                      </span>
                    </div>
                  </div>
                  <time className="shrink-0 text-[10px] text-slate-500">
                    {formatTimeAgo(post.created_at)}
                  </time>
                </header>

                {preview && (
                  <p className="text-sm text-slate-600 dark:text-slate-300">{preview}</p>
                )}

                <div className="overflow-hidden rounded-xl">
                  {media.type === 'video' && media.imageUrl && (
                    <div className="relative aspect-video">
                      <img
                        src={media.imageUrl}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Play className="h-10 w-10 fill-white text-white" />
                      </div>
                    </div>
                  )}
                  {media.type === 'image' && media.imageUrl && (
                    <img
                      src={media.imageUrl}
                      alt=""
                      className="aspect-video w-full object-cover"
                    />
                  )}
                  {media.type === 'gradient' && (
                    <div
                      className={`flex min-h-[120px] items-center justify-center bg-gradient-to-br p-6 ${getPostGradient(post)}`}
                    >
                      <p className="text-center font-bold text-white">{media.headline}</p>
                    </div>
                  )}
                </div>

                <footer className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Heart className="h-4 w-4" />
                    {post.likes_count}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MessageSquare className="h-4 w-4" />
                    {post.comments_count}
                  </span>
                  <Share2 className="ml-auto h-3.5 w-3.5" />
                </footer>
              </article>
            );
          })}
      </section>
    </div>
  );
}
