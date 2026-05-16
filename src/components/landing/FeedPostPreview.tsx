import { Heart, MessageSquare, Play } from 'lucide-react';
import type { PublicFeedPost } from '../../types/feed';
import {
  formatTimeAgo,
  getDisplayName,
  getInitials,
  getPostCaption,
  getPostGradient,
  getPostMedia,
  getSchoolLabel,
} from '../../utils/feed';

interface FeedPostPreviewProps {
  post: PublicFeedPost;
  onSelect: (post: PublicFeedPost) => void;
}

export default function FeedPostPreview({ post, onSelect }: FeedPostPreviewProps) {
  const media = getPostMedia(post);
  const previewText = getPostCaption(post, media, 140);

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onSelect(post)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(post);
        }
      }}
      className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-slate-300 hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900/60 dark:hover:border-slate-700 lg:p-3.5"
    >
      <header className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-xs font-bold text-white">
            {getInitials(post.first_name, post.last_name)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-900 dark:text-slate-100">
              {getDisplayName(post.first_name, post.last_name)}
            </p>
            <span className="mt-0.5 inline-block max-w-full truncate rounded-md border border-blue-500/20 bg-blue-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
              {getSchoolLabel(post)}
            </span>
          </div>
        </div>
        <time className="shrink-0 whitespace-nowrap text-[11px] text-slate-400">
          {formatTimeAgo(post.created_at)}
        </time>
      </header>

      {previewText && (
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {previewText}
        </p>
      )}

      <div className="mt-3 overflow-hidden rounded-xl">
        {media.type === 'video' && media.imageUrl && (
          <div className="relative aspect-video w-full bg-slate-900">
            <img
              src={media.imageUrl}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg">
                <Play className="ml-0.5 h-6 w-6 fill-current" strokeWidth={0} />
              </span>
            </div>
          </div>
        )}

        {media.type === 'image' && media.imageUrl && (
          <img
            src={media.imageUrl}
            alt=""
            className="aspect-video w-full object-cover"
            loading="lazy"
          />
        )}

        {media.type === 'gradient' && (
          <div
            className={`flex min-h-[120px] items-center justify-center bg-gradient-to-br p-5 lg:min-h-[100px] lg:p-4 ${getPostGradient(post)}`}
          >
            <p className="text-center text-base font-bold leading-snug text-white">
              {media.headline}
            </p>
          </div>
        )}
      </div>

      <footer className="mt-3 flex items-center gap-5 text-xs text-slate-500 dark:text-slate-400">
        <span className="inline-flex items-center gap-1.5">
          <Heart className="h-4 w-4" strokeWidth={2} />
          {post.likes_count}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MessageSquare className="h-4 w-4" strokeWidth={2} />
          {post.comments_count}
        </span>
        <span className="ml-auto text-[10px] font-medium uppercase tracking-wide text-blue-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-blue-400">
          Tap to view
        </span>
      </footer>
    </article>
  );
}
