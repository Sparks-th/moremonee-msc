import type { PublicFeedPost } from '../types/feed';

const GRADIENT_PAIRS = [
  'from-violet-600 via-fuchsia-600 to-orange-500',
  'from-blue-900 via-indigo-900 to-slate-900',
  'from-teal-600 via-cyan-700 to-slate-900',
  'from-purple-900 via-violet-800 to-rose-900',
  'from-slate-800 via-slate-900 to-black',
  'from-emerald-700 via-teal-800 to-slate-900',
] as const;

export function getInitials(firstName: string, lastName: string): string {
  const first = firstName.trim().charAt(0).toUpperCase();
  const last = lastName.trim().charAt(0).toUpperCase();
  return `${first}${last}` || '??';
}

export function getDisplayName(firstName: string, lastName: string): string {
  const first = firstName.trim();
  const last = lastName.trim();
  return [first, last].filter(Boolean).join(' ') || 'Student';
}

export function stripHtml(html: string): string {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return (doc.body.textContent ?? '').replace(/\s+/g, ' ').trim();
}

export function truncateText(text: string, maxLength = 120): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}…`;
}

export function formatTimeAgo(isoDate: string): string {
  const then = new Date(isoDate).getTime();
  const now = Date.now();
  const seconds = Math.floor((now - then) / 1000);

  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(isoDate).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}

export function getYoutubeVideoId(url: string | null): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtu.be')) {
      return parsed.pathname.slice(1).split('/')[0] || null;
    }
    if (parsed.hostname.includes('youtube.com')) {
      const shorts = parsed.pathname.match(/^\/shorts\/([^/?]+)/);
      if (shorts) return shorts[1];
      return parsed.searchParams.get('v');
    }
  } catch {
    return null;
  }
  return null;
}

export function getYoutubeThumbnail(url: string | null): string | null {
  const id = getYoutubeVideoId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

export function getPostGradient(post: PublicFeedPost): string {
  const index =
    post.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) %
    GRADIENT_PAIRS.length;
  return GRADIENT_PAIRS[index];
}

export function getPostMedia(post: PublicFeedPost): {
  type: 'video' | 'image' | 'gradient';
  imageUrl?: string;
  headline: string;
} {
  const plain = stripHtml(post.content);
  const headline = truncateText(plain, 80) || 'Student update';

  const videoThumb = getYoutubeThumbnail(post.video_url);
  if (videoThumb) {
    return { type: 'video', imageUrl: videoThumb, headline };
  }

  const imageUrl = post.image || post.images?.[0];
  if (imageUrl) {
    return { type: 'image', imageUrl, headline };
  }

  return { type: 'gradient', headline };
}

export function getSchoolLabel(post: PublicFeedPost): string {
  return post.university.toUpperCase();
}

/** Caption above media — omitted when the gradient card already shows the message */
export function getPostCaption(
  post: PublicFeedPost,
  media: ReturnType<typeof getPostMedia>,
  maxLength = 140,
): string {
  if (media.type === 'gradient') return '';
  const plain = stripHtml(post.content);
  if (!plain) return '';
  return truncateText(plain, maxLength);
}
