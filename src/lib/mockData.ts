import type {
  Flat, Transaction, Event, Notice, Complaint, Post, Poll,
  DashboardStats, Occupancy
} from './types';

// ============================================================
// Mock Data for localStorage / Demo Mode
// ============================================================

export const MOCK_FLATS: Flat[] = [
  { id: 'A-101', block: 'A', floor_number: 1, unit_number: '101', owner_name: 'Rajesh Kumar', owner_phone: '9876543210', owner_email: 'rajesh@example.com', occupancy_status: 'owner', created_at: '2024-01-15T00:00:00Z' },
  { id: 'A-102', block: 'A', floor_number: 1, unit_number: '102', owner_name: 'Priya Sharma', owner_phone: '9876543211', owner_email: 'priya@example.com', occupancy_status: 'tenant', tenant_name: 'Vikram Singh', tenant_phone: '9876543222', created_at: '2024-01-15T00:00:00Z' },
  { id: 'A-201', block: 'A', floor_number: 2, unit_number: '201', owner_name: 'Anitha Rao', owner_phone: '9876543212', owner_email: 'anitha@example.com', occupancy_status: 'owner', created_at: '2024-01-15T00:00:00Z' },
  { id: 'A-202', block: 'A', floor_number: 2, unit_number: '202', owner_name: 'Suresh Babu', owner_phone: '9876543213', owner_email: 'suresh@example.com', occupancy_status: 'owner', created_at: '2024-01-15T00:00:00Z' },
  { id: 'B-101', block: 'B', floor_number: 1, unit_number: '101', owner_name: 'Lakshmi Devi', owner_phone: '9876543214', owner_email: 'lakshmi@example.com', occupancy_status: 'owner', created_at: '2024-01-15T00:00:00Z' },
  { id: 'B-102', block: 'B', floor_number: 1, unit_number: '102', owner_name: 'Venkat Reddy', owner_phone: '9876543215', owner_email: 'venkat@example.com', occupancy_status: 'vacant', created_at: '2024-01-15T00:00:00Z' },
  { id: 'B-201', block: 'B', floor_number: 2, unit_number: '201', owner_name: 'Sridevi Nair', owner_phone: '9876543216', owner_email: 'sridevi@example.com', occupancy_status: 'tenant', tenant_name: 'Arun Kumar', tenant_phone: '9876543223', created_at: '2024-01-15T00:00:00Z' },
  { id: 'B-301', block: 'B', floor_number: 3, unit_number: '301', owner_name: 'Mohan Das', owner_phone: '9876543217', owner_email: 'mohan@example.com', occupancy_status: 'owner', created_at: '2024-01-15T00:00:00Z' },
  { id: 'C-101', block: 'C', floor_number: 1, unit_number: '101', owner_name: 'Geeta Patel', owner_phone: '9876543218', owner_email: 'geeta@example.com', occupancy_status: 'owner', created_at: '2024-01-15T00:00:00Z' },
  { id: 'C-201', block: 'C', floor_number: 2, unit_number: '201', owner_name: 'Ramesh Chandra', owner_phone: '9876543219', owner_email: 'ramesh@example.com', occupancy_status: 'owner', created_at: '2024-01-15T00:00:00Z' },
  { id: 'C-301', block: 'C', floor_number: 3, unit_number: '301', owner_name: 'Kavitha Menon', owner_phone: '9876543220', owner_email: 'kavitha@example.com', occupancy_status: 'tenant', tenant_name: 'Ravi Teja', tenant_phone: '9876543224', created_at: '2024-01-15T00:00:00Z' },
  { id: 'C-401', block: 'C', floor_number: 4, unit_number: '401', owner_name: 'Narasimha Rao', owner_phone: '9876543221', owner_email: 'narasimha@example.com', occupancy_status: 'owner', created_at: '2024-01-15T00:00:00Z' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', date: '2024-06-01', category: 'maintenance', type: 'income', amount: 126000, description: 'Monthly maintenance - June 2024 (All 126 flats)', created_at: '2024-06-01T10:00:00Z' },
  { id: 't2', date: '2024-06-05', category: 'security_salary', type: 'expense', amount: 45000, description: 'Security staff salaries - June 2024', vendor: 'SecureGuard Services', created_at: '2024-06-05T10:00:00Z' },
  { id: 't3', date: '2024-06-10', category: 'utility_bill', type: 'expense', amount: 23500, description: 'Common area electricity bill', vendor: 'APEPDCL', created_at: '2024-06-10T10:00:00Z' },
  { id: 't4', date: '2024-06-12', category: 'repairs', type: 'expense', amount: 8500, description: 'Lift maintenance - Block B', vendor: 'Otis Elevators', created_at: '2024-06-12T10:00:00Z' },
  { id: 't5', date: '2024-06-15', category: 'event_contribution', type: 'income', amount: 15000, description: 'Contributions for Independence Day event', created_at: '2024-06-15T10:00:00Z' },
  { id: 't6', date: '2024-05-01', category: 'maintenance', type: 'income', amount: 126000, description: 'Monthly maintenance - May 2024', created_at: '2024-05-01T10:00:00Z' },
  { id: 't7', date: '2024-05-03', category: 'security_salary', type: 'expense', amount: 45000, description: 'Security staff salaries - May 2024', vendor: 'SecureGuard Services', created_at: '2024-05-03T10:00:00Z' },
  { id: 't8', date: '2024-05-08', category: 'utility_bill', type: 'expense', amount: 21000, description: 'Common area electricity bill', vendor: 'APEPDCL', created_at: '2024-05-08T10:00:00Z' },
  { id: 't9', date: '2024-05-20', category: 'corpus_fund', type: 'income', amount: 50000, description: 'Corpus fund collection Q2', created_at: '2024-05-20T10:00:00Z' },
  { id: 't10', date: '2024-04-01', category: 'maintenance', type: 'income', amount: 124000, description: 'Monthly maintenance - April 2024', created_at: '2024-04-01T10:00:00Z' },
  { id: 't11', date: '2024-04-15', category: 'repairs', type: 'expense', amount: 35000, description: 'Swimming pool cleaning and maintenance', vendor: 'AquaClean Services', created_at: '2024-04-15T10:00:00Z' },
  { id: 't12', date: '2024-04-22', category: 'sinking_fund', type: 'income', amount: 30000, description: 'Sinking fund collection Q2', created_at: '2024-04-22T10:00:00Z' },
];

export const MOCK_EVENTS: Event[] = [
  {
    id: 'e1', title: 'Annual General Meeting 2024', description: 'Annual General Meeting to discuss the association finances, upcoming projects, and elect new committee members for the year 2024-25.', event_date: '2024-08-15', event_time: '10:00', venue: 'Community Club House, Ground Floor', organizer: 'Executive Committee', created_at: '2024-07-01T10:00:00Z', rsvp_count: 45,
  },
  {
    id: 'e2', title: 'Independence Day Celebration', description: 'Join us for flag hoisting, cultural programs, and patriotic songs followed by breakfast for all residents.', event_date: '2024-08-15', event_time: '08:00', venue: 'Main Entrance Area', organizer: 'Cultural Committee', created_at: '2024-07-15T10:00:00Z', rsvp_count: 82,
  },
  {
    id: 'e3', title: 'Ganesh Festival Celebrations', description: 'Community Ganesh Chaturthi celebrations with pooja, cultural programs, prasad distribution, and immersion procession.', event_date: '2024-09-07', event_time: '06:00', venue: 'Community Hall & Main Entrance', organizer: 'Cultural Committee', created_at: '2024-08-01T10:00:00Z', rsvp_count: 110,
  },
  {
    id: 'e4', title: 'Health & Wellness Camp', description: 'Free health checkup camp including BP, sugar, and eye checkups. Doctors from KIMS Hospital will be present.', event_date: '2024-09-21', event_time: '09:00', venue: 'Club House', organizer: 'Welfare Committee', created_at: '2024-08-20T10:00:00Z', rsvp_count: 35,
  },
  {
    id: 'e5', title: 'Deepavali Community Celebration', description: 'Celebrate Deepavali with community lighting of diyas, sparklers for kids, and a dinner banquet for all residents.', event_date: '2024-11-01', event_time: '18:00', venue: 'Terrace & Common Area', organizer: 'Festival Committee', created_at: '2024-10-01T10:00:00Z', rsvp_count: 98,
  },
];

export const MOCK_NOTICES: Notice[] = [
  { id: 'n1', title: 'Water Supply Interruption – Block A', content: 'Please be informed that water supply to Block A will be interrupted on Saturday, 20th July 2024, between 9:00 AM and 2:00 PM due to maintenance of overhead tank. Residents are requested to store adequate water in advance. We regret the inconvenience caused.', category: 'maintenance', is_pinned: true, created_at: '2024-07-18T09:00:00Z' },
  { id: 'n2', title: 'AGM Notice – August 15, 2024', content: 'The Annual General Meeting of Fortune Towers Owners Association will be held on 15th August 2024 at 10:00 AM in the Community Club House. All flat owners are requested to attend. Proxy forms are available from the Secretary. Agenda includes: 1) Approval of previous year accounts, 2) Presentation of current year budget, 3) Election of new committee members, 4) Open house discussion.', category: 'general', is_pinned: true, created_at: '2024-07-10T09:00:00Z' },
  { id: 'n3', title: 'Visitor Parking Policy Update', content: 'Effective from 1st August 2024, visitors are allowed to park only in designated visitor parking bays (Slots V1-V20 near main gate). Visitor vehicles found in resident parking slots will be requested to move. Security staff has been instructed accordingly.', category: 'security', is_pinned: false, created_at: '2024-07-15T09:00:00Z' },
  { id: 'n4', title: 'Maintenance Fee Reminder – June 2024', content: 'This is a friendly reminder that the monthly maintenance fee for June 2024 (₹1,000 per flat) is due by 10th June 2024. Please pay via NEFT/RTGS to Association Account or hand-deliver cash to the Security Office. Late payment charges of ₹50 per day will apply after the due date.', category: 'financial', is_pinned: false, created_at: '2024-06-01T09:00:00Z' },
  { id: 'n5', title: 'CCTV Upgrade – All Blocks', content: 'We are pleased to inform that the CCTV system across all three blocks has been upgraded to HD cameras with 30-day recording. The new system covers all entry/exit points, lobbies, corridors, parking areas, and amenity zones. This enhances security for all our residents.', category: 'security', is_pinned: false, created_at: '2024-06-20T09:00:00Z' },
];

export const MOCK_COMPLAINTS: Complaint[] = [
  { id: 'c1', title: 'Water leakage in bathroom', description: 'There is a persistent water leakage from the overhead pipe in the master bathroom. It has been dripping for 3 days now.', category: 'water', status: 'in_progress', priority: 'high', flat_id: 'A-201', raised_by: 'mock-user', assigned_to: 'Maintenance Team', created_at: '2024-07-10T10:00:00Z', raised_by_name: 'Anitha Rao' },
  { id: 'c2', title: 'Lift making unusual noise - Block B', description: 'The lift in Block B is making a grinding noise especially while going from 5th to 6th floor. It seems unsafe and needs immediate inspection.', category: 'lift', status: 'assigned', priority: 'urgent', flat_id: 'B-601', raised_by: 'mock-user', assigned_to: 'Otis Elevators Service Team', created_at: '2024-07-12T10:00:00Z', raised_by_name: 'Sridevi Nair' },
  { id: 'c3', title: 'Street light not working near parking', description: 'The street light near Slot P-15 in the parking area has not been working for the past week, creating a safety issue at night.', category: 'electrical', status: 'submitted', priority: 'medium', flat_id: 'C-301', raised_by: 'mock-user', created_at: '2024-07-14T10:00:00Z', raised_by_name: 'Kavitha Menon' },
  { id: 'c4', title: 'Stray dogs entering premises', description: 'Stray dogs are entering the compound through a gap in the boundary wall near the rear gate. This is a safety concern especially for children.', category: 'security', status: 'resolved', priority: 'high', flat_id: 'A-101', raised_by: 'mock-user', assigned_to: 'Security Head', resolved_at: '2024-07-08T15:00:00Z', created_at: '2024-07-05T10:00:00Z', raised_by_name: 'Rajesh Kumar' },
  { id: 'c5', title: 'Garbage not collected from 2nd floor corridor', description: 'The garbage bags left outside flats on the 2nd floor corridor of Block A have not been collected since morning. Strong smell is spreading.', category: 'housekeeping', status: 'resolved', priority: 'medium', flat_id: 'A-201', raised_by: 'mock-user', assigned_to: 'Housekeeping Staff', resolved_at: '2024-07-11T16:00:00Z', created_at: '2024-07-11T09:00:00Z', raised_by_name: 'Anitha Rao' },
];

export const MOCK_POSTS: Post[] = [
  { id: 'p1', profile_id: 'u1', content: '🎉 Ganesh festival preparations are looking amazing! The idol has been ordered and decorations will start from Saturday morning. All volunteers please gather at the club house by 7 AM. Jai Ganesh! 🙏', category: 'events', likes_count: 24, created_at: '2024-07-15T09:00:00Z', author_name: 'Suresh Babu', author_flat: 'A-202', comments: [
    { id: 'pc1', post_id: 'p1', profile_id: 'u2', content: 'Looking forward to it! Will bring my family. What should we bring?', created_at: '2024-07-15T09:30:00Z', author_name: 'Priya Sharma' },
    { id: 'pc2', post_id: 'p1', profile_id: 'u3', content: 'Count me in for decorations! 🙌', created_at: '2024-07-15T10:00:00Z', author_name: 'Rajesh Kumar' },
  ]},
  { id: 'p2', profile_id: 'u2', content: 'Water supply update: Block A residents, maintenance has confirmed water will be restored by 2 PM today. Please bear with the inconvenience.', category: 'maintenance', likes_count: 8, created_at: '2024-07-14T11:00:00Z', author_name: 'Venkat Reddy', author_flat: 'B-102', comments: [
    { id: 'pc3', post_id: 'p2', profile_id: 'u4', content: 'Thanks for the update! 👍', created_at: '2024-07-14T11:15:00Z', author_name: 'Anitha Rao' },
    { id: 'pc4', post_id: 'p2', profile_id: 'u5', content: 'Really appreciate the timely communication.', created_at: '2024-07-14T12:00:00Z', author_name: 'Mohan Das' },
  ]},
  { id: 'p3', profile_id: 'u3', content: '🏋️ Our gym is looking for new equipment! The committee has initiated a poll to decide which equipment to purchase. Please vote and let your preferences be known. Every vote counts! 💪', category: 'general', likes_count: 31, created_at: '2024-07-13T09:00:00Z', author_name: 'Lakshmi Devi', author_flat: 'B-101', comments: [] },
  { id: 'p4', profile_id: 'u4', content: 'FOR SALE: 3-seater sofa set, excellent condition, 2 years old. Moving out next month. Price: ₹18,000 negotiable. Please WhatsApp me at 9876543210 if interested.', category: 'buy_sell', likes_count: 5, created_at: '2024-07-12T14:00:00Z', author_name: 'Geeta Patel', author_flat: 'C-101', comments: [
    { id: 'pc5', post_id: 'p4', profile_id: 'u6', content: 'Interested! Will message you.', created_at: '2024-07-12T14:30:00Z', author_name: 'Ramesh Chandra' },
  ]},
  { id: 'p5', profile_id: 'u5', content: '🌿 Great news! The gardening club is back! We will be meeting every Sunday at 7 AM near the garden area. Learn organic gardening, composting, and terrace farming. All welcome! 🌱', category: 'general', likes_count: 47, created_at: '2024-07-11T08:00:00Z', author_name: 'Kavitha Menon', author_flat: 'C-301', comments: [] },
];

export const MOCK_POLLS: Poll[] = [
  {
    id: 'pl1', question: 'Which gym equipment should we purchase for our fitness center?', options: ['Treadmill (2 units)', 'Cross Trainer / Elliptical', 'Dumbbells & Weight Set', 'Yoga & Stretching Area'], created_at: '2024-07-10T09:00:00Z', ends_at: '2024-08-10T23:59:59Z',
    votes: { 'Treadmill (2 units)': 18, 'Cross Trainer / Elliptical': 12, 'Dumbbells & Weight Set': 25, 'Yoga & Stretching Area': 9 },
  },
  {
    id: 'pl2', question: 'What color should we repaint the club house interior?', options: ['Warm White & Beige', 'Sky Blue & White', 'Light Green & Cream', 'Keep Current Color'], created_at: '2024-07-05T09:00:00Z',
    votes: { 'Warm White & Beige': 22, 'Sky Blue & White': 31, 'Light Green & Cream': 14, 'Keep Current Color': 7 },
  },
  {
    id: 'pl3', question: 'Should we organize a monthly community dinner?', options: ['Yes, monthly!', 'Yes, quarterly is better', 'Only for festivals', 'No, not interested'], created_at: '2024-06-28T09:00:00Z',
    votes: { 'Yes, monthly!': 38, 'Yes, quarterly is better': 19, 'Only for festivals': 21, 'No, not interested': 5 },
  },
];

export const getMockDashboardStats = (): DashboardStats => {
  const occupied = MOCK_FLATS.filter(f => f.occupancy_status !== 'vacant').length;
  const income = MOCK_TRANSACTIONS.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expenses = MOCK_TRANSACTIONS.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const pending = MOCK_COMPLAINTS.filter(c => c.status !== 'resolved').length;
  const now = new Date();
  const upcoming = MOCK_EVENTS.filter(e => new Date(e.event_date) >= now).length;
  return {
    totalFlats: 126,
    occupiedFlats: occupied,
    totalResidents: occupied,
    pendingComplaints: pending,
    totalIncome: income,
    totalExpenses: expenses,
    upcomingEvents: upcoming,
    activeNotices: MOCK_NOTICES.length,
  };
};

// ============================================================
// localStorage helpers
// ============================================================

const STORAGE_KEYS = {
  flats: 'ft_flats',
  transactions: 'ft_transactions',
  events: 'ft_events',
  notices: 'ft_notices',
  complaints: 'ft_complaints',
  posts: 'ft_posts',
  polls: 'ft_polls',
};

function getFromStorage<T>(key: string, defaults: T[]): T[] {
  if (typeof window === 'undefined') return defaults;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaults;
  } catch {
    return defaults;
  }
}

function setToStorage<T>(key: string, data: T[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
}

export const MockDB = {
  // Flats
  getFlats: () => getFromStorage<Flat>(STORAGE_KEYS.flats, MOCK_FLATS),
  addFlat: (flat: Flat) => {
    const flats = MockDB.getFlats();
    const updated = [...flats, flat];
    setToStorage(STORAGE_KEYS.flats, updated);
    return flat;
  },
  updateFlat: (id: string, updates: Partial<Flat>) => {
    const flats = MockDB.getFlats();
    const updated = flats.map(f => f.id === id ? { ...f, ...updates } : f);
    setToStorage(STORAGE_KEYS.flats, updated);
  },
  deleteFlat: (id: string) => {
    const flats = MockDB.getFlats().filter(f => f.id !== id);
    setToStorage(STORAGE_KEYS.flats, flats);
  },

  // Transactions
  getTransactions: () => getFromStorage<Transaction>(STORAGE_KEYS.transactions, MOCK_TRANSACTIONS),
  addTransaction: (t: Transaction) => {
    const txns = MockDB.getTransactions();
    const updated = [t, ...txns];
    setToStorage(STORAGE_KEYS.transactions, updated);
    return t;
  },
  deleteTransaction: (id: string) => {
    const txns = MockDB.getTransactions().filter(t => t.id !== id);
    setToStorage(STORAGE_KEYS.transactions, txns);
  },

  // Events
  getEvents: () => getFromStorage<Event>(STORAGE_KEYS.events, MOCK_EVENTS),
  addEvent: (event: Event) => {
    const events = MockDB.getEvents();
    const updated = [event, ...events];
    setToStorage(STORAGE_KEYS.events, updated);
    return event;
  },
  deleteEvent: (id: string) => {
    const events = MockDB.getEvents().filter(e => e.id !== id);
    setToStorage(STORAGE_KEYS.events, events);
  },

  // Notices
  getNotices: () => getFromStorage<Notice>(STORAGE_KEYS.notices, MOCK_NOTICES),
  addNotice: (notice: Notice) => {
    const notices = MockDB.getNotices();
    const updated = [notice, ...notices];
    setToStorage(STORAGE_KEYS.notices, updated);
    return notice;
  },
  deleteNotice: (id: string) => {
    const notices = MockDB.getNotices().filter(n => n.id !== id);
    setToStorage(STORAGE_KEYS.notices, notices);
  },

  // Complaints
  getComplaints: () => getFromStorage<Complaint>(STORAGE_KEYS.complaints, MOCK_COMPLAINTS),
  addComplaint: (complaint: Complaint) => {
    const complaints = MockDB.getComplaints();
    const updated = [complaint, ...complaints];
    setToStorage(STORAGE_KEYS.complaints, updated);
    return complaint;
  },
  updateComplaintStatus: (id: string, status: string) => {
    const complaints = MockDB.getComplaints();
    const updated = complaints.map(c => c.id === id ? { ...c, status: status as Complaint['status'] } : c);
    setToStorage(STORAGE_KEYS.complaints, updated);
  },

  // Posts
  getPosts: () => getFromStorage<Post>(STORAGE_KEYS.posts, MOCK_POSTS),
  addPost: (post: Post) => {
    const posts = MockDB.getPosts();
    const updated = [post, ...posts];
    setToStorage(STORAGE_KEYS.posts, updated);
    return post;
  },
  addComment: (postId: string, comment: { id: string; content: string; author_name: string; created_at: string }) => {
    const posts = MockDB.getPosts();
    const updated = posts.map(p => {
      if (p.id === postId) {
        return { ...p, comments: [...(p.comments || []), { id: comment.id, post_id: postId, profile_id: 'mock-user', content: comment.content, created_at: comment.created_at, author_name: comment.author_name }] };
      }
      return p;
    });
    setToStorage(STORAGE_KEYS.posts, updated);
  },

  // Polls
  getPolls: () => getFromStorage<Poll>(STORAGE_KEYS.polls, MOCK_POLLS),
  addPoll: (poll: Poll) => {
    const polls = MockDB.getPolls();
    const updated = [poll, ...polls];
    setToStorage(STORAGE_KEYS.polls, updated);
    return poll;
  },
  vote: (pollId: string, option: string) => {
    const polls = MockDB.getPolls();
    const updated = polls.map(p => {
      if (p.id === pollId) {
        const votes = { ...p.votes };
        votes[option] = (votes[option] || 0) + 1;
        return { ...p, votes, my_vote: option };
      }
      return p;
    });
    setToStorage(STORAGE_KEYS.polls, updated);
  },
};
