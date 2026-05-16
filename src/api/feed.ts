import type { PostType, PublicFeedResponse } from '../types/feed';
import { apiRequest } from './http';

export async function fetchPublicPosts(
  postType: PostType,
  signal?: AbortSignal,
): Promise<PublicFeedResponse> {
  return apiRequest<PublicFeedResponse>(
    `/api/v1/feed/post/public-posts/?post_type=${postType}`,
    { signal },
  );
}
