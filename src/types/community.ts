export type DashboardTab = 'feed' | 'referrals' | 'leaderboard';

export interface FeedPost {
  id: string;
  author: string;
  school: string;
  time: string;
  avatarInitials: string;
  content: string;
  likes: number;
  comments: number;
  gradientFrom: string;
  gradientTo: string;
}

export interface ReferralRecord {
  studentName: string;
  dateJoined: string;
  activityLog: string;
  accountStatus: 'Active' | 'Pending' | 'Inactive';
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  university: string;
  referrals: number;
  avatar: string;
}

export interface NetworkStats {
  integrity: string;
  activeAmbassadors: number;
  referralCode: string;
}
