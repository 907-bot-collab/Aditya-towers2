// ============================================================
// Fortune Towers Community Portal — TypeScript Types
// ============================================================

export type Role = 'super_admin' | 'committee_admin' | 'resident' | 'security_staff';
export type Block = 'A' | 'B' | 'C';
export type Occupancy = 'owner' | 'tenant' | 'vacant';
export type TransactionType = 'income' | 'expense';
export type TransactionCategory = 'maintenance' | 'corpus_fund' | 'sinking_fund' | 'event_contribution' | 'repairs' | 'security_salary' | 'utility_bill' | 'other';
export type ComplaintCategory = 'water' | 'lift' | 'electrical' | 'security' | 'housekeeping' | 'other';
export type ComplaintStatus = 'submitted' | 'assigned' | 'in_progress' | 'resolved';
export type ComplaintPriority = 'low' | 'medium' | 'high' | 'urgent';
export type NoticeCategory = 'maintenance' | 'security' | 'events' | 'general' | 'financial';
export type PostCategory = 'general' | 'buy_sell' | 'rentals' | 'events' | 'maintenance';
export type RsvpStatus = 'going' | 'maybe' | 'not_going';

export interface Profile {
  id: string;
  full_name: string;
  phone?: string;
  email?: string;
  role: Role;
  flat_id?: string;
  block?: Block;
  occupancy?: Occupancy;
  avatar_url?: string;
  created_at: string;
}

export interface Flat {
  id: string;
  block: Block;
  floor_number: number;
  unit_number: string;
  owner_name: string;
  owner_phone?: string;
  owner_email?: string;
  occupancy_status: Occupancy;
  tenant_name?: string;
  tenant_phone?: string;
  created_at: string;
}

export interface Transaction {
  id: string;
  date: string;
  category: TransactionCategory;
  type: TransactionType;
  amount: number;
  description?: string;
  vendor?: string;
  receipt_url?: string;
  created_by?: string;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  event_date: string;
  event_time: string;
  venue: string;
  organizer: string;
  image_url?: string;
  max_capacity?: number;
  created_by?: string;
  created_at: string;
  rsvp_count?: number;
  my_rsvp?: RsvpStatus;
}

export interface EventRsvp {
  id: string;
  event_id: string;
  profile_id: string;
  status: RsvpStatus;
  created_at: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: NoticeCategory;
  is_pinned: boolean;
  attachment_url?: string;
  created_by?: string;
  created_at: string;
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  status: ComplaintStatus;
  priority: ComplaintPriority;
  flat_id?: string;
  raised_by: string;
  assigned_to?: string;
  resolved_at?: string;
  image_url?: string;
  created_at: string;
  raised_by_name?: string;
}

export interface Post {
  id: string;
  profile_id: string;
  content: string;
  image_url?: string;
  category: PostCategory;
  likes_count: number;
  created_at: string;
  author_name?: string;
  author_flat?: string;
  comments?: PostComment[];
}

export interface PostComment {
  id: string;
  post_id: string;
  profile_id: string;
  content: string;
  created_at: string;
  author_name?: string;
}

export interface Poll {
  id: string;
  question: string;
  options: string[];
  ends_at?: string;
  created_by?: string;
  created_at: string;
  votes?: Record<string, number>;
  my_vote?: string;
}

export interface PollVote {
  id: string;
  poll_id: string;
  profile_id: string;
  selected_option: string;
  created_at: string;
}

export interface DashboardStats {
  totalFlats: number;
  occupiedFlats: number;
  totalResidents: number;
  pendingComplaints: number;
  totalIncome: number;
  totalExpenses: number;
  upcomingEvents: number;
  activeNotices: number;
}
