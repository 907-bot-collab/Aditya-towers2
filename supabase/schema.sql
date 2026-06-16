-- ============================================================
-- Fortune Towers Community Portal - Supabase Database Schema
-- Run this in your Supabase SQL Editor to set up all tables
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- Profiles Table (extends Supabase auth.users)
-- ============================================================
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text not null,
  phone text,
  email text,
  role text default 'resident' check (role in ('super_admin', 'committee_admin', 'resident', 'security_staff')),
  flat_id text,
  block text check (block in ('A', 'B', 'C')),
  occupancy text check (occupancy in ('owner', 'tenant', 'vacant')),
  avatar_url text,
  created_at timestamptz default now() not null
);

-- ============================================================
-- Flats Directory
-- ============================================================
create table if not exists flats (
  id text primary key,         -- e.g., 'A-1204'
  block text not null check (block in ('A', 'B', 'C')),
  floor_number int not null check (floor_number between 1 and 10),
  unit_number text not null,
  owner_name text not null,
  owner_phone text,
  owner_email text,
  occupancy_status text default 'owner' check (occupancy_status in ('owner', 'tenant', 'vacant')),
  tenant_name text,
  tenant_phone text,
  created_at timestamptz default now() not null
);

-- ============================================================
-- Financial Transactions / Accounts Ledger
-- ============================================================
create table if not exists transactions (
  id uuid default gen_random_uuid() primary key,
  date date not null default current_date,
  category text not null check (category in ('maintenance', 'corpus_fund', 'sinking_fund', 'event_contribution', 'repairs', 'security_salary', 'utility_bill', 'other')),
  type text not null check (type in ('income', 'expense')),
  amount numeric(12, 2) not null check (amount > 0),
  description text,
  vendor text,
  receipt_url text,
  created_by uuid references profiles(id),
  created_at timestamptz default now() not null
);

-- ============================================================
-- Events
-- ============================================================
create table if not exists events (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  event_date date not null,
  event_time time not null,
  venue text not null,
  organizer text not null,
  image_url text,
  max_capacity int,
  created_by uuid references profiles(id),
  created_at timestamptz default now() not null
);

-- ============================================================
-- Event RSVPs
-- ============================================================
create table if not exists event_rsvps (
  id uuid default gen_random_uuid() primary key,
  event_id uuid references events(id) on delete cascade not null,
  profile_id uuid references profiles(id) on delete cascade not null,
  status text not null check (status in ('going', 'maybe', 'not_going')),
  created_at timestamptz default now() not null,
  unique(event_id, profile_id)
);

-- ============================================================
-- Community Notices & Circulars
-- ============================================================
create table if not exists notices (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text not null,
  category text not null check (category in ('maintenance', 'security', 'events', 'general', 'financial')),
  is_pinned boolean default false,
  attachment_url text,
  created_by uuid references profiles(id),
  created_at timestamptz default now() not null
);

-- ============================================================
-- Complaints / Helpdesk
-- ============================================================
create table if not exists complaints (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  category text not null check (category in ('water', 'lift', 'electrical', 'security', 'housekeeping', 'other')),
  status text not null default 'submitted' check (status in ('submitted', 'assigned', 'in_progress', 'resolved')),
  priority text default 'medium' check (priority in ('low', 'medium', 'high', 'urgent')),
  flat_id text,
  raised_by uuid references profiles(id) on delete cascade not null,
  assigned_to text,
  resolved_at timestamptz,
  image_url text,
  created_at timestamptz default now() not null
);

-- ============================================================
-- Community Social Feed Posts
-- ============================================================
create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references profiles(id) on delete cascade not null,
  content text not null,
  image_url text,
  category text default 'general' check (category in ('general', 'buy_sell', 'rentals', 'events', 'maintenance')),
  likes_count int default 0,
  created_at timestamptz default now() not null
);

-- ============================================================
-- Post Comments
-- ============================================================
create table if not exists post_comments (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references posts(id) on delete cascade not null,
  profile_id uuid references profiles(id) on delete cascade not null,
  content text not null,
  created_at timestamptz default now() not null
);

-- ============================================================
-- Community Polls
-- ============================================================
create table if not exists polls (
  id uuid default gen_random_uuid() primary key,
  question text not null,
  options jsonb not null,     -- Array of strings: ["Option A", "Option B"]
  ends_at timestamptz,
  created_by uuid references profiles(id),
  created_at timestamptz default now() not null
);

-- ============================================================
-- Poll Votes
-- ============================================================
create table if not exists poll_votes (
  id uuid default gen_random_uuid() primary key,
  poll_id uuid references polls(id) on delete cascade not null,
  profile_id uuid references profiles(id) on delete cascade not null,
  selected_option text not null,
  created_at timestamptz default now() not null,
  unique(poll_id, profile_id)
);

-- ============================================================
-- Row Level Security Policies
-- ============================================================

-- Enable RLS on all tables
alter table profiles enable row level security;
alter table flats enable row level security;
alter table transactions enable row level security;
alter table events enable row level security;
alter table event_rsvps enable row level security;
alter table notices enable row level security;
alter table complaints enable row level security;
alter table posts enable row level security;
alter table post_comments enable row level security;
alter table polls enable row level security;
alter table poll_votes enable row level security;

-- Profiles: Users can view all, update their own
create policy "Profiles are viewable by authenticated users" on profiles for select using (auth.role() = 'authenticated');
create policy "Users can update their own profile" on profiles for update using (auth.uid() = id);

-- Flats: Readable by authenticated users
create policy "Flats readable by authenticated users" on flats for select using (auth.role() = 'authenticated');

-- Transactions: Readable by authenticated users
create policy "Transactions readable by authenticated users" on transactions for select using (auth.role() = 'authenticated');

-- Events: Readable by all authenticated users
create policy "Events readable by authenticated users" on events for select using (auth.role() = 'authenticated');

-- Notices: Readable by all authenticated users
create policy "Notices readable by authenticated users" on notices for select using (auth.role() = 'authenticated');

-- Complaints: Users see their own, admins see all
create policy "Complaints: users see their own" on complaints for select using (auth.uid() = raised_by);

-- Posts: Readable by all authenticated users
create policy "Posts readable by authenticated users" on posts for select using (auth.role() = 'authenticated');
create policy "Users can insert their own posts" on posts for insert with check (auth.uid() = profile_id);

-- Comments: Readable by all authenticated users
create policy "Comments readable by authenticated users" on post_comments for select using (auth.role() = 'authenticated');
create policy "Users can insert their own comments" on post_comments for insert with check (auth.uid() = profile_id);

-- Polls: Readable by authenticated users
create policy "Polls readable by authenticated users" on polls for select using (auth.role() = 'authenticated');

-- Poll votes: Users see/insert their own votes
create policy "Poll votes: users see their own" on poll_votes for select using (auth.uid() = profile_id);
create policy "Users can vote once" on poll_votes for insert with check (auth.uid() = profile_id);
