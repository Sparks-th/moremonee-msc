export type PostType = 'latest' | 'trending';

export interface FeedComment {
  id: string;
  post: number;
  user_id: string;
  content: string;
  first_name: string;
  last_name: string;
  university: string;
  department: string;
  likes_count: number;
  created_at: string;
  updated_at: string;
}

export interface PublicFeedPost {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  content: string;
  image: string;
  first_name: string;
  last_name: string;
  university: string;
  department: string;
  video_url: string | null;
  is_admin_created: number;
  quiz_id: string | null;
  images: string[];
  likes_count: number;
  comments_count: number;
  shares_count: number;
  last_comments: FeedComment[];
}

export interface PublicFeedResponse {
  links: { next: string | null; previous: string | null };
  total: number;
  total_pages: number;
  current_page: number;
  page_size: number;
  results: PublicFeedPost[];
}
