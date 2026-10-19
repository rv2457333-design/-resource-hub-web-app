export interface Chapter {
  number: number;
  title: string;
  summary: string;
  codeSnippet?: string;
}

export interface SampleContent {
  overview: string;
  keyTakeaway: string;
  quickRevisionNotes: string[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  categoryId: string;
  categoryName: string;
  description: string;
  longDescription: string;
  price: number; // 0 = Free
  rating: number;
  reviewCount: number;
  pages: number;
  edition: string;
  semester: string;
  isbn: string;
  format: string;
  coverImage: string;
  tags: string[];
  downloads: number;
  isFeatured: boolean;
  publishedYear: number;
  keyTopics: string[];
  chapters: Chapter[];
  sampleContent: SampleContent;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  courseCode: string;
  bookCount?: number;
}

export interface HubStats {
  totalBooks: number;
  totalCategories: number;
  totalDownloads: number;
  freeResources: number;
  activeStudents: number;
  partnerColleges: number;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  type: string;
  timestamp?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  count?: number;
  data: T;
  related?: Book[];
  message?: string;
}
