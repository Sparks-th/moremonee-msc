import type { FeedPost, LeaderboardEntry, ReferralRecord } from '../types/community';

export const FEED_POSTS: FeedPost[] = [
  {
    id: '1',
    author: 'Muhammad Isa',
    school: 'FEDERAL UNIVERSITY OF TECHNOLOGY MINNA',
    time: '55s ago',
    avatarInitials: 'MI',
    content: 'Masha Allah',
    likes: 0,
    comments: 0,
    gradientFrom: 'from-purple-900',
    gradientTo: 'to-indigo-900',
  },
  {
    id: '2',
    author: 'Ishaq Muhammad',
    school: 'AHMADU BELLO UNIVERSITY',
    time: '2m ago',
    avatarInitials: 'IM',
    content: "Secured the 6-month cybersecurity track placement! Let's go!",
    likes: 4,
    comments: 1,
    gradientFrom: 'from-slate-900',
    gradientTo: 'to-slate-800',
  },
  {
    id: '3',
    author: 'Amina Bello',
    school: 'UNIVERSITY OF LAGOS',
    time: '8m ago',
    avatarInitials: 'AB',
    content: 'First referral bonus hit my wallet today. Grateful for this community.',
    likes: 12,
    comments: 3,
    gradientFrom: 'from-blue-900',
    gradientTo: 'to-slate-900',
  },
];

export const REFERRAL_RECORDS: ReferralRecord[] = [
  {
    studentName: 'Chinedu Okafor',
    dateJoined: 'May 14, 2026',
    activityLog: 'Completed onboarding · 2 referrals',
    accountStatus: 'Active',
  },
  {
    studentName: 'Fatima Yusuf',
    dateJoined: 'May 12, 2026',
    activityLog: 'Verified campus ID · 1 referral',
    accountStatus: 'Active',
  },
  {
    studentName: 'Emeka Nwosu',
    dateJoined: 'May 10, 2026',
    activityLog: 'Awaiting KYC review',
    accountStatus: 'Pending',
  },
  {
    studentName: 'Grace Adeyemi',
    dateJoined: 'May 8, 2026',
    activityLog: 'No activity in 14 days',
    accountStatus: 'Inactive',
  },
];

export const LEADERBOARD_ENTRIES: LeaderboardEntry[] = [
  { rank: 1, name: 'Tunde Adebayo', university: 'OAU', referrals: 48, avatar: 'TA' },
  { rank: 2, name: 'Mary Johnson', university: 'UI', referrals: 41, avatar: 'MJ' },
  { rank: 3, name: 'Ifeanyi Kalu', university: 'UNN', referrals: 37, avatar: 'IK' },
  { rank: 4, name: 'Bisi Falana', university: 'FUTA', referrals: 32, avatar: 'BF' },
  { rank: 5, name: 'Chika Okoro', university: 'UNILAG', referrals: 29, avatar: 'CO' },
  { rank: 6, name: 'Ayo Salami', university: 'LASU', referrals: 26, avatar: 'AS' },
  { rank: 7, name: 'Zainab Musa', university: 'ABU', referrals: 24, avatar: 'ZM' },
  { rank: 8, name: 'Emeka Nwosu', university: 'UNIBEN', referrals: 21, avatar: 'EN' },
  { rank: 9, name: 'Grace Tunde', university: 'UNIPORT', referrals: 19, avatar: 'GT' },
  { rank: 10, name: 'Samuel Danjuma', university: 'UNIOSUN', referrals: 17, avatar: 'SD' },
];

export const NETWORK_STATS = {
  integrity: '99.98%',
  activeAmbassadors: 1402,
  referralCode: 'MMSC-MALVRYX',
} as const;
