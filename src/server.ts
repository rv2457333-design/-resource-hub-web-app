import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import {join} from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  next();
});

// Category Data
interface Category {
  id: string;
  name: string;
  description: string;
  icon: string; // FontAwesome icon class
  color: string; // Tailwind color class
  courseCode: string;
  bookCount?: number;
}

const CATEGORIES: Category[] = [
  {
    id: 'cpp',
    name: 'C++',
    description: 'Object-oriented programming, memory management, templates, and STL for high-performance computing.',
    icon: 'fa-solid fa-code',
    color: 'from-blue-600 to-indigo-700',
    courseCode: 'CS102 / CS201'
  },
  {
    id: 'java',
    name: 'Java',
    description: 'Enterprise architecture, multithreading, JVM internals, and Spring Boot development.',
    icon: 'fa-brands fa-java',
    color: 'from-amber-600 to-orange-700',
    courseCode: 'CS204'
  },
  {
    id: 'web-dev',
    name: 'Web Development',
    description: 'Full-stack modern web engineering: Angular, TypeScript, Node.js, REST APIs, and responsive design.',
    icon: 'fa-solid fa-globe',
    color: 'from-emerald-600 to-teal-700',
    courseCode: 'CS305 / IT210'
  },
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    description: 'Trees, graphs, dynamic programming, algorithmic complexity (Big-O), and competitive coding notes.',
    icon: 'fa-solid fa-diagram-project',
    color: 'from-purple-600 to-violet-800',
    courseCode: 'CS201 / CS301'
  },
  {
    id: 'python',
    name: 'Python',
    description: 'Scripting, computational logic, data analysis with Pandas/NumPy, and automation notebooks.',
    icon: 'fa-brands fa-python',
    color: 'from-sky-500 to-blue-600',
    courseCode: 'CS101 / DS202'
  },
  {
    id: 'ai-ml',
    name: 'Artificial Intelligence',
    description: 'Neural networks, computer vision, natural language processing, and statistical machine learning.',
    icon: 'fa-solid fa-brain',
    color: 'from-rose-600 to-pink-700',
    courseCode: 'CS401 / AI302'
  },
  {
    id: 'dbms',
    name: 'Database Systems',
    description: 'Relational algebra, SQL query optimization, ACID transactions, normalization, and NoSQL engines.',
    icon: 'fa-solid fa-database',
    color: 'from-cyan-600 to-blue-700',
    courseCode: 'CS208'
  },
  {
    id: 'os',
    name: 'Operating Systems',
    description: 'Process scheduling, deadlocks, virtual memory paging, Linux kernel architecture, and file systems.',
    icon: 'fa-solid fa-microchip',
    color: 'from-slate-700 to-slate-900',
    courseCode: 'CS302'
  }
];

// Book Interface
export interface Book {
  id: string;
  title: string;
  author: string;
  categoryId: string;
  categoryName: string;
  description: string;
  longDescription: string;
  price: number; // 0 for free
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
  chapters: {
    number: number;
    title: string;
    summary: string;
    codeSnippet?: string;
  }[];
  sampleContent: {
    overview: string;
    keyTakeaway: string;
    quickRevisionNotes: string[];
  };
}

// In-Memory Database initialized with high-quality academic books & notes
const BOOKS: Book[] = [
  {
    id: 'b-dsa-01',
    title: 'Data Structures and Algorithms: Complete Master Notes',
    author: 'Prof. Cormen & College Academic Board',
    categoryId: 'dsa',
    categoryName: 'Data Structures & Algorithms',
    description: 'Comprehensive college lecture handbook covering Binary Trees, Heaps, Graph traversals, Dijkstra, and Dynamic Programming with solved university past exams.',
    longDescription: 'Designed specifically for undergraduate Computer Science cohorts, this handbook synthesizes core algorithmic theory with rigorous pseudocode and C++/Java solutions. Includes step-by-step Big-O proofs, memory diagrams, and 50+ classic university exam problems solved in depth.',
    price: 0,
    rating: 4.9,
    reviewCount: 342,
    pages: 420,
    edition: '2025 Revised College Edition',
    semester: 'Semester 3 & 4',
    isbn: '978-0-262-03384-8',
    format: 'PDF Notes + Solved Code',
    coverImage: 'https://images.unsplash.com/photo-1516116211227-bbc042c1be9f?auto=format&fit=crop&w=800&q=80',
    tags: ['Algorithms', 'Trees & Graphs', 'Dynamic Programming', 'University Exam Prep'],
    downloads: 5120,
    isFeatured: true,
    publishedYear: 2025,
    keyTopics: ['Asymptotic Analysis', 'Red-Black Trees & AVL', 'Graph BFS/DFS & TopoSort', 'Dynamic Programming Patterns', 'Greedy Paradigms'],
    chapters: [
      {
        number: 1,
        title: 'Asymptotic Notation and Mathematical Foundations',
        summary: 'Rigorous derivation of Big-O, Big-Omega, and Big-Theta bounds with master theorem recurrence formulas.',
        codeSnippet: '// Master Theorem: T(n) = a*T(n/b) + f(n)\n// For MergeSort: T(n) = 2T(n/2) + O(n) => O(n log n)'
      },
      {
        number: 2,
        title: 'Non-Linear Structures: Self-Balancing AVL Trees',
        summary: 'Tree rotations (LL, RR, LR, RL) with balance factor tracking and time complexity verification.',
        codeSnippet: 'int getBalance(Node *N) {\n  if (N == NULL) return 0;\n  return height(N->left) - height(N->right);\n}'
      },
      {
        number: 3,
        title: 'Shortest Path Algorithms: Dijkstra & Bellman-Ford',
        summary: 'Priority queue implementation of single-source shortest path and negative edge detection strategies.',
        codeSnippet: 'priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;\npq.push({0, source});'
      }
    ],
    sampleContent: {
      overview: 'This compilation was prepared under the supervision of university faculties to serve as both an everyday textbook companion and a high-yield semester final review guide.',
      keyTakeaway: 'Mastering algorithmic invariants and space-time trade-offs is crucial for campus placements and theoretical gate exams.',
      quickRevisionNotes: [
        'Time Complexity: QuickSort average is O(N log N), worst is O(N^2) without median-of-three.',
        'Binary Search requires monotonic ordered space; always prevent integer overflow with low + (high - low) / 2.',
        'Graph Dijkstra works only on non-negative weights; for negative weights, employ Bellman-Ford (O(V*E)).'
      ]
    }
  },
  {
    id: 'b-web-01',
    title: 'Modern Full-Stack Web Architecture: Angular & Node.js',
    author: 'Dr. Sarah Lin & Engineering Lab Team',
    categoryId: 'web-dev',
    categoryName: 'Web Development',
    description: 'Production blueprint for building reactive web applications using Angular 21, TypeScript, Express REST APIs, and modern responsive Tailwind styling.',
    longDescription: 'From client-side single page routing to server-side rendering (SSR) and Express microservices, this book guides students through building robust, enterprise-ready web applications. Contains hands-on laboratory exercises and capstone project blueprints.',
    price: 0,
    rating: 4.8,
    reviewCount: 215,
    pages: 365,
    edition: '4th Edition (Latest LTS)',
    semester: 'Semester 5 & 6',
    isbn: '978-1-491-95035-7',
    format: 'Interactive eBook + Lab Source',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    tags: ['Angular', 'TypeScript', 'Node.js', 'REST API', 'Tailwind CSS'],
    downloads: 3840,
    isFeatured: true,
    publishedYear: 2024,
    keyTopics: ['Zoneless Angular & Signals', 'Express REST Middleware', 'Reactive State Management', 'Security & JWT Auth'],
    chapters: [
      {
        number: 1,
        title: 'Modern Angular Architecture and Reactivity with Signals',
        summary: 'Deep dive into signal primitives, computed derivations, and zoneless change detection.',
        codeSnippet: 'const count = signal(0);\nconst double = computed(() => count() * 2);\ncount.update(n => n + 1);'
      },
      {
        number: 2,
        title: 'RESTful API Engineering in Express',
        summary: 'Configuring modular routers, payload sanitization, error-handling middleware, and CORS policies.',
        codeSnippet: 'app.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(500).json({ error: "Internal Server Error" });\n});'
      }
    ],
    sampleContent: {
      overview: 'Focuses on the full lifecycle of software products from student prototype to scalable cloud deployment.',
      keyTakeaway: 'Declarative reactivity and clear API contracts make software maintainable and testable.',
      quickRevisionNotes: [
        'Prefer Angular signals for synchronous reactivity over complex RxJS subject chains when possible.',
        'Use HTTP interceptors for automatic Bearer token injection and centralized 401 error redirection.',
        'Always implement rate limiting and request validation (Zod/Joi) in Node.js endpoints.'
      ]
    }
  },
  {
    id: 'b-ai-01',
    title: 'Applied Artificial Intelligence & Deep Learning Primer',
    author: 'Prof. Andrew Zhang',
    categoryId: 'ai-ml',
    categoryName: 'Artificial Intelligence',
    description: 'Practical guide to neural networks, backpropagation, CNNs for computer vision, Transformers, and LLM fine-tuning tailored for student research.',
    longDescription: 'An accessible yet mathematically grounded treatment of modern artificial intelligence. Starts from foundational linear algebra and gradient descent, moving steadily through convolutional layers, attention mechanisms, and contemporary generative AI.',
    price: 9.99,
    rating: 4.95,
    reviewCount: 420,
    pages: 490,
    edition: 'Collegiate Student Edition',
    semester: 'Semester 6 & 7',
    isbn: '978-0-134-61099-3',
    format: 'Hardcover & PDF Bundle',
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    tags: ['Artificial Intelligence', 'Deep Learning', 'PyTorch', 'Neural Networks'],
    downloads: 4420,
    isFeatured: true,
    publishedYear: 2025,
    keyTopics: ['Gradient Descent & Loss Functions', 'Backpropagation Calculus', 'Convolutional Feature Maps', 'Self-Attention & Transformers'],
    chapters: [
      {
        number: 1,
        title: 'Optimization Foundations: Stochastic Gradient Descent',
        summary: 'Analytical derivatives of loss functions, learning rate scheduling, and momentum techniques.',
        codeSnippet: 'optimizer = torch.optim.Adam(model.parameters(), lr=1e-3, weight_decay=1e-5)'
      },
      {
        number: 2,
        title: 'Self-Attention and Transformer Blocks',
        summary: 'Derivation of Scaled Dot-Product Attention: Softmax(Q * K^T / sqrt(d_k)) * V.',
        codeSnippet: 'attn_scores = torch.matmul(q, k.transpose(-2, -1)) / math.sqrt(d_k)\nweights = F.softmax(attn_scores, dim=-1)'
      }
    ],
    sampleContent: {
      overview: 'Curated by leading university lab researchers to bridge mathematical derivations with practical PyTorch implementations.',
      keyTakeaway: 'Understanding loss manifolds and regularizations is the secret to building high-performing neural models.',
      quickRevisionNotes: [
        'Batch Normalization mitigates internal covariate shift and acts as an implicit regularizer.',
        'Residual connections (ResNets) solve the vanishing gradient problem in deep architectures.',
        'Temperature scaling in language models governs entropy: lower yields deterministic tokens, higher enables creative generation.'
      ]
    }
  },
  {
    id: 'b-cpp-01',
    title: 'Modern C++20 for Systems & Competitive Programming',
    author: 'Bjarne Peterson & Campus Coding Guild',
    categoryId: 'cpp',
    categoryName: 'C++',
    description: 'Pointers, RAII, Smart Pointers, Move Semantics, Concepts, and the Standard Template Library (STL) broken down with visual memory diagrams.',
    longDescription: 'Whether preparing for low-level systems engineering or campus competitive programming contests, this book delivers clear insight into memory layout, zero-cost abstractions, custom allocators, and modern C++20 features.',
    price: 0,
    rating: 4.75,
    reviewCount: 188,
    pages: 380,
    edition: '3rd College Edition',
    semester: 'Semester 2 & 3',
    isbn: '978-0-321-56384-2',
    format: 'Digital Course Pack',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    tags: ['C++', 'STL', 'Pointers & Memory', 'Competitive Programming'],
    downloads: 2950,
    isFeatured: true,
    publishedYear: 2024,
    keyTopics: ['RAII & Smart Pointers', 'Move Semantics & Rvalues', 'STL Containers & Iterators', 'Templates & Metaprogramming'],
    chapters: [
      {
        number: 1,
        title: 'Smart Pointers and Memory Management',
        summary: 'Unique_ptr vs shared_ptr internals, reference counting blocks, and weak_ptr cycle prevention.',
        codeSnippet: 'auto ptr = std::make_unique<CustomResource>();\n// Automatic cleanup upon leaving scope'
      },
      {
        number: 2,
        title: 'Move Semantics and Perfect Forwarding',
        summary: 'Rvalue references (T&&), std::move, and eliminating expensive deep copies in container operations.',
        codeSnippet: 'Buffer(Buffer&& other) noexcept : data_(other.data_), size_(other.size_) {\n  other.data_ = nullptr;\n}'
      }
    ],
    sampleContent: {
      overview: 'Essential reading for any student aiming for high-performance computing, game development, or operating system labs.',
      keyTakeaway: 'RAII guarantees deterministic resource cleanup without the non-deterministic overhead of garbage collection.',
      quickRevisionNotes: [
        'Never mix raw pointers and smart pointers for the same memory address.',
        'Use std::vector as your default container unless specific random insertion demands exist.',
        'Passing large read-only objects should be done via const reference (const T&) to prevent copy overhead.'
      ]
    }
  },
  {
    id: 'b-java-01',
    title: 'Core Java & Object-Oriented Design Patterns',
    author: 'James Gosling Study Group',
    categoryId: 'java',
    categoryName: 'Java',
    description: 'Deep dive into JVM memory model, Garbage Collection algorithms, SOLID principles, Gang of Four patterns, and Spring Boot enterprise practices.',
    longDescription: 'Master object-oriented architecture with clean, robust Java. Covers polymorphism, functional streams, lambda expressions, concurrent collections, and modular design patterns vital for technical interviews.',
    price: 0,
    rating: 4.7,
    reviewCount: 165,
    pages: 410,
    edition: 'Student Laboratory Edition',
    semester: 'Semester 3 & 4',
    isbn: '978-0-134-68599-1',
    format: 'PDF Guide + Interview Cheatsheet',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    tags: ['Java', 'Design Patterns', 'JVM Architecture', 'SOLID Principles'],
    downloads: 3100,
    isFeatured: false,
    publishedYear: 2023,
    keyTopics: ['JVM Stack vs Heap', 'Generics & Wildcards', 'Java 21 Virtual Threads', 'Factory & Singleton Patterns'],
    chapters: [
      {
        number: 1,
        title: 'JVM Memory Mechanics & Garbage Collection',
        summary: 'Eden space, survivor spaces, tenured generation, and the G1 garbage collector algorithm.',
        codeSnippet: 'Runtime runtime = Runtime.getRuntime();\nlong memoryUsed = runtime.totalMemory() - runtime.freeMemory();'
      }
    ],
    sampleContent: {
      overview: 'Covers core university Java syllabus along with industry design patterns demanded in tech interviews.',
      keyTakeaway: 'Composition over inheritance provides flexibility and decouples software components.',
      quickRevisionNotes: [
        'Immutable classes (like String) are inherently thread-safe; mark fields private and final.',
        'Java equals() must always be overridden alongside hashCode() to maintain collection contracts.',
        'Use try-with-resources (AutoCloseable) to guarantee stream and socket closure.'
      ]
    }
  },
  {
    id: 'b-py-01',
    title: 'Python for Data Science and Scientific Computing',
    author: 'Dr. Elena Rostova',
    categoryId: 'python',
    categoryName: 'Python',
    description: 'Hands-on laboratory manual covering Python fundamentals, NumPy vectorization, Pandas dataframes, Matplotlib visualization, and statistical modeling.',
    longDescription: 'A friendly yet rigorous college handbook for students venturing into data analytics, bio-informatics, and machine learning. Contains 40+ notebook exercises with step-by-step solutions.',
    price: 0,
    rating: 4.88,
    reviewCount: 290,
    pages: 350,
    edition: '2nd Edition',
    semester: 'Semester 2 & 5',
    isbn: '978-1-492-03264-9',
    format: 'Jupyter Notebooks + PDF',
    coverImage: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=800&q=80',
    tags: ['Python', 'NumPy', 'Pandas', 'Data Science', 'Statistics'],
    downloads: 4890,
    isFeatured: true,
    publishedYear: 2024,
    keyTopics: ['List Comprehensions & Generators', 'NumPy Broadcasting', 'Data Cleaning with Pandas', 'Exploratory Data Analysis'],
    chapters: [
      {
        number: 1,
        title: 'Broadcasting and Vectorized Computation in NumPy',
        summary: 'Eliminating slow Python loops through SIMD vectorized operations and contiguous C-array buffers.',
        codeSnippet: 'import numpy as np\narr = np.linspace(0, 10, 1000)\nnormalized = (arr - np.mean(arr)) / np.std(arr)'
      }
    ],
    sampleContent: {
      overview: 'Ideal for semester laboratory assignments and final year capstone data pipelines.',
      keyTakeaway: 'Vectorization avoids interpreter loop overhead by dispatching calculations to optimized C/Fortran routines.',
      quickRevisionNotes: [
        'Generators yield values lazily, saving substantial memory when processing gigabyte-scale datasets.',
        'Pandas loc selects by label, while iloc selects by integer index location.',
        'Always check for and handle missing values (.isna().sum()) before model training.'
      ]
    }
  },
  {
    id: 'b-dbms-01',
    title: 'Database System Concepts: SQL & ACID Internals',
    author: 'Prof. Ramakrishnan & Database Guild',
    categoryId: 'dbms',
    categoryName: 'Database Systems',
    description: 'Relational algebra, B+ Tree indexing, normalization (1NF through BCNF), transaction concurrency, and write-ahead logging (WAL).',
    longDescription: 'Comprehensive academic study companion for the core undergraduate database course. Contains practical SQL query optimization strategies, deadlock detection algorithms, and schema normalization exercises.',
    price: 0,
    rating: 4.65,
    reviewCount: 174,
    pages: 440,
    edition: '7th Revised Campus Edition',
    semester: 'Semester 4',
    isbn: '978-0-078-02215-9',
    format: 'Lecture Slides + Complete Textbook Notes',
    coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80',
    tags: ['SQL', 'DBMS', 'Normalization', 'ACID Transactions', 'B+ Trees'],
    downloads: 2780,
    isFeatured: false,
    publishedYear: 2023,
    keyTopics: ['Boyce-Codd Normal Form (BCNF)', 'B+ Tree Page Splitting', 'Two-Phase Locking (2PL)', 'Query Execution Plans'],
    chapters: [
      {
        number: 1,
        title: 'Transaction Isolation & Serializability',
        summary: 'Dirty reads, non-repeatable reads, and phantom reads under ANSI SQL isolation levels.',
        codeSnippet: 'BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;\nUPDATE accounts SET balance = balance - 500 WHERE id = 12;\nCOMMIT;'
      }
    ],
    sampleContent: {
      overview: 'Syllabus aligned for major computer science university engineering exams worldwide.',
      keyTakeaway: 'Database indexing involves a trade-off: fast reads at the cost of slower writes and additional disk storage.',
      quickRevisionNotes: [
        'BCNF guarantees that for every non-trivial functional dependency X -> Y, X must be a superkey.',
        'B+ Trees store records only at the leaf nodes, enabling rapid sequential range scans.',
        'WAL (Write-Ahead Logging) ensures Durability in ACID: log buffers flush before page buffers dirty the disk.'
      ]
    }
  },
  {
    id: 'b-os-01',
    title: 'Operating System Internals: Concurrency & Virtual Memory',
    author: 'Silberschatz Academic Study Group',
    categoryId: 'os',
    categoryName: 'Operating Systems',
    description: 'Semaphores, Mutexes, Dining Philosophers solution, Peterson Algorithm, Paging & Segmentation, and Linux ext4 file system architecture.',
    longDescription: 'Essential syllabus coverage for Operating Systems. Breaks down complex OS kernel operations including context switching, interrupt handlers, multi-level feedback queue CPU scheduling, and page fault handling.',
    price: 4.99,
    rating: 4.82,
    reviewCount: 205,
    pages: 395,
    edition: '10th Academic Edition',
    semester: 'Semester 4 & 5',
    isbn: '978-1-119-80036-1',
    format: 'Study Guide & Lab Manual',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    tags: ['Operating Systems', 'Concurrency', 'Paging', 'Linux Kernel', 'Semaphores'],
    downloads: 3600,
    isFeatured: true,
    publishedYear: 2024,
    keyTopics: ['Process Control Blocks (PCB)', 'Semaphores vs Mutex', 'Virtual Memory TLB', 'Disk Scheduling (SSTF, SCAN)'],
    chapters: [
      {
        number: 1,
        title: 'Synchronization Primitives: Semaphores and Deadlock',
        summary: 'Coffman four conditions, Banker algorithm for deadlock avoidance, and producer-consumer queue design.',
        codeSnippet: 'sem_wait(&empty_slots);\npthread_mutex_lock(&mutex);\n// Critical section insert\npthread_mutex_unlock(&mutex);\nsem_post(&full_slots);'
      }
    ],
    sampleContent: {
      overview: 'The definitive guide to understanding what occurs between user-space code and bare hardware silicon.',
      keyTakeaway: 'Deadlock can only occur if Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait are all simultaneously present.',
      quickRevisionNotes: [
        'TLB (Translation Lookaside Buffer) caches virtual-to-physical address translations for single-cycle access.',
        'Thrashing occurs when the system spends more time servicing page faults than executing actual instructions.',
        'Context switches incur cold cache penalties as L1/L2 data lines are invalidated.'
      ]
    }
  }
];

// Helper to calculate book counts per category
function getCategoriesWithCounts(): Category[] {
  return CATEGORIES.map((cat) => {
    const count = BOOKS.filter((b) => b.categoryId === cat.id).length;
    return { ...cat, bookCount: count };
  });
}

// In-Memory Contact Messages
interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  type: string;
  timestamp: string;
}

const CONTACT_MESSAGES: ContactSubmission[] = [
  {
    id: 'msg-01',
    name: 'Purushottam Kumar',
    email: 'purushottamkumar22238@gmail.com',
    subject: 'Request for Distributed Systems Notes',
    message: 'Could you please upload university lecture notes for CS403 Distributed Systems with Paxos and Raft consensus algorithms?',
    type: 'Study Material Request',
    timestamp: new Date(Date.now() - 86400000).toISOString()
  }
];

// -------------------------------------------------------------
// REST API ENDPOINTS
// -------------------------------------------------------------

/**
 * GET /api/categories
 * Returns all categories with active resource counts
 */
app.get('/api/categories', (req, res) => {
  res.json({
    success: true,
    data: getCategoriesWithCounts()
  });
});

/**
 * GET /api/books
 * Supports queries: ?category=dsa&q=algorithm&sort=rating&featured=true
 */
app.get('/api/books', (req, res) => {
  const { category, q, sort, featured } = req.query;

  let results = [...BOOKS];

  // Filter by category
  if (category && typeof category === 'string' && category !== 'all') {
    results = results.filter(
      (b) => b.categoryId.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by search query (title, author, tags, description)
  if (q && typeof q === 'string') {
    const query = q.toLowerCase().trim();
    results = results.filter(
      (b) =>
        b.title.toLowerCase().includes(query) ||
        b.author.toLowerCase().includes(query) ||
        b.description.toLowerCase().includes(query) ||
        b.categoryName.toLowerCase().includes(query) ||
        b.tags.some((t) => t.toLowerCase().includes(query))
    );
  }

  // Filter featured
  if (featured === 'true') {
    results = results.filter((b) => b.isFeatured);
  }

  // Sorting
  if (sort === 'rating') {
    results.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'downloads') {
    results.sort((a, b) => b.downloads - a.downloads);
  } else if (sort === 'newest') {
    results.sort((a, b) => b.publishedYear - a.publishedYear);
  } else if (sort === 'price-low') {
    results.sort((a, b) => a.price - b.price);
  }

  res.json({
    success: true,
    count: results.length,
    data: results
  });
});

/**
 * GET /api/books/:id
 * Retrieve details of a specific book
 */
app.get('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const book = BOOKS.find((b) => b.id === id);

  if (!book) {
    res.status(404).json({
      success: false,
      message: `Book with id '${id}' not found`
    });
    return;
  }

  // Also recommend 2 related books from the same category
  const related = BOOKS.filter((b) => b.categoryId === book.categoryId && b.id !== book.id).slice(0, 3);

  res.json({
    success: true,
    data: book,
    related
  });
});

/**
 * POST /api/books
 * Add a new book resource (College contribution / Admin)
 */
app.post('/api/books', (req, res) => {
  const {
    title,
    author,
    categoryId,
    description,
    price = 0,
    semester = 'General Undergrad',
    edition = '1st Edition',
    pages = 250,
    tags = []
  } = req.body;

  if (!title || !author || !categoryId || !description) {
    res.status(400).json({
      success: false,
      message: 'Title, author, category, and description are required.'
    });
    return;
  }

  const categoryObj = CATEGORIES.find((c) => c.id === categoryId);
  const categoryName = categoryObj ? categoryObj.name : 'Computer Science';

  const newBook: Book = {
    id: `b-custom-${Date.now()}`,
    title: title.trim(),
    author: author.trim(),
    categoryId,
    categoryName,
    description: description.trim(),
    longDescription: req.body.longDescription || description.trim(),
    price: Number(price) || 0,
    rating: 5.0,
    reviewCount: 1,
    pages: Number(pages) || 200,
    edition: edition.trim(),
    semester: semester.trim(),
    isbn: `978-COL-${Math.floor(100000 + Math.random() * 900000)}`,
    format: req.body.format || 'Student Community Notes (PDF)',
    coverImage: req.body.coverImage || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    tags: Array.isArray(tags) && tags.length > 0 ? tags : [categoryName, 'Student Notes', 'Exam Prep'],
    downloads: 1,
    isFeatured: false,
    publishedYear: new Date().getFullYear(),
    keyTopics: req.body.keyTopics || ['Core Concepts', 'Exam Solutions', 'Practical Lab Notes'],
    chapters: [
      {
        number: 1,
        title: 'Introduction & Core Foundations',
        summary: 'Overview of fundamental definitions and semester curriculum highlights.',
        codeSnippet: '// Resource uploaded by academic student contributor'
      }
    ],
    sampleContent: {
      overview: 'Contributed by collegiate student member for peer academic review.',
      keyTakeaway: 'Review key formulas and exam past questions systematically.',
      quickRevisionNotes: [
        'Review syllabus topics regularly before end-semester examinations.',
        'Practice algorithmic problem sets and lab assignments weekly.'
      ]
    }
  };

  BOOKS.unshift(newBook);

  res.status(201).json({
    success: true,
    message: 'Book resource contributed successfully!',
    data: newBook
  });
});

/**
 * POST /api/books/:id/download
 * Increment download counter and return verified download payload
 */
app.post('/api/books/:id/download', (req, res) => {
  const { id } = req.params;
  const book = BOOKS.find((b) => b.id === id);

  if (!book) {
    res.status(404).json({ success: false, message: 'Book not found' });
    return;
  }

  book.downloads += 1;

  res.json({
    success: true,
    message: 'Download initiated successfully',
    downloads: book.downloads,
    downloadUrl: `https://scholarhub.college.edu/downloads/${book.id}.pdf`
  });
});

/**
 * POST /api/contact
 * Handle student contact, feedback, or book request
 */
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message, type = 'General Inquiry' } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({
      success: false,
      message: 'Name, email, and message are required.'
    });
    return;
  }

  const newMsg: ContactSubmission = {
    id: `msg-${Date.now()}`,
    name: name.trim(),
    email: email.trim(),
    subject: subject ? subject.trim() : 'Academic Inquiry',
    message: message.trim(),
    type,
    timestamp: new Date().toISOString()
  };

  CONTACT_MESSAGES.unshift(newMsg);

  res.status(201).json({
    success: true,
    message: 'Thank you! Your request has been logged and the student resource team will review it.',
    data: newMsg
  });
});

/**
 * GET /api/stats
 * Return hub statistics for the dashboard
 */
app.get('/api/stats', (req, res) => {
  const totalBooks = BOOKS.length;
  const totalCategories = CATEGORIES.length;
  const totalDownloads = BOOKS.reduce((acc, b) => acc + b.downloads, 0);
  const freeResources = BOOKS.filter((b) => b.price === 0).length;

  res.json({
    success: true,
    data: {
      totalBooks,
      totalCategories,
      totalDownloads,
      freeResources,
      activeStudents: 14850,
      partnerColleges: 34
    }
  });
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`ScholarHub Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
