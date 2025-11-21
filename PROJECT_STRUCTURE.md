# FadePyra Project Structure

This document provides a complete overview of the project structure created for your team.

## 📁 Root Directory

```
fadePyra/
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Git ignore rules
├── components.json         # Shadcn UI configuration
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── vitest.config.ts        # Vitest test configuration
├── middleware.ts           # Next.js middleware for auth
├── README.md               # Main project documentation
├── SETUP.md                # Setup instructions
└── CONTRIBUTING.md         # Contribution guidelines
```

## 📂 /app - Next.js App Router

### Authentication Routes (`/app/(auth)/`)
```
app/(auth)/
├── layout.tsx              # Auth layout with gradient background
├── login/
│   └── page.tsx           # Login page
└── signup/
    └── page.tsx           # Signup page
```

### Dashboard Routes (`/app/(dashboard)/`)
```
app/(dashboard)/
├── layout.tsx              # Protected dashboard layout
├── dashboard/
│   └── page.tsx           # Main dashboard (project list)
└── project/[id]/
    ├── page.tsx           # Project detail page (tabs view)
    └── discover/
        └── page.tsx       # Product discovery/search page
```

### API Routes (`/app/api/`)
```
app/api/
├── projects/
│   ├── route.ts           # GET (list), POST (create)
│   └── [id]/
│       └── route.ts       # GET, PUT, DELETE single project
├── requirements/
│   ├── route.ts           # GET (list), POST (create)
│   └── [id]/
│       └── route.ts       # PUT, DELETE single requirement
├── products/
│   ├── search/
│   │   └── route.ts       # GET - semantic search
│   ├── [id]/
│   │   └── route.ts       # GET - product details
│   ├── add/
│   │   └── route.ts       # POST - add to project
│   └── remove/
│       └── route.ts       # DELETE - remove from project
├── ai/
│   ├── score/
│   │   └── route.ts       # POST - score single product
│   └── compare/
│       └── route.ts       # POST - compare multiple products
└── auth/
    └── callback/
        └── route.ts       # GET - OAuth callback handler
```

### Root App Files
```
app/
├── globals.css             # Global styles with Tailwind
├── layout.tsx              # Root layout with providers
└── page.tsx                # Home page (redirects)
```

## 🧩 /components - React Components

### UI Components (`/components/ui/`)
Base Shadcn UI components - fully implemented:
```
components/ui/
├── accordion.tsx           # Collapsible content sections
├── avatar.tsx              # User avatar display
├── badge.tsx               # Status badges
├── button.tsx              # Button with variants
├── card.tsx                # Card container
├── checkbox.tsx            # Form checkbox
├── dialog.tsx              # Modal dialogs
├── dropdown-menu.tsx       # Dropdown menus
├── input.tsx               # Text input
├── label.tsx               # Form label
├── select.tsx              # Select dropdown
├── separator.tsx           # Divider line
├── tabs.tsx                # Tab navigation
├── textarea.tsx            # Multi-line text input
├── toast.tsx               # Toast notification base
├── toaster.tsx             # Toast container
└── use-toast.ts            # Toast hook
```

### Authentication Components (`/components/auth/`)
```
components/auth/
├── login-form.tsx          # Login form with validation
└── signup-form.tsx         # Signup form with validation
```

### Layout Components (`/components/layout/`)
```
components/layout/
├── header.tsx              # Main header with navigation
└── user-menu.tsx           # User dropdown menu
```

### Project Components (`/components/project/`)
```
components/project/
├── project-list.tsx        # Grid of project cards
├── project-card.tsx        # Single project card
├── new-project-dialog.tsx  # Create project modal
├── requirement-list.tsx    # List of requirements
├── requirement-item.tsx    # Single requirement item
└── add-requirement-dialog.tsx  # Add requirement modal
```

### Product Components (`/components/product/`)
```
components/product/
├── product-search.tsx      # Search input and filters
├── product-search-results.tsx  # Search results grid
├── product-search-card.tsx     # Product card in search
├── product-list.tsx        # Products in project
└── product-card.tsx        # Product card with AI score
```

### Comparison Components (`/components/comparison/`)
```
components/comparison/
├── comparison-report.tsx   # Full comparison report
├── score-bar.tsx           # Visual score display
└── requirement-breakdown.tsx  # Requirement-by-requirement analysis
```

### Root Component Files
```
components/
└── providers.tsx           # React Query & Toast providers
```

## 🔧 /lib - Utilities and Configuration

### Supabase (`/lib/supabase/`)
```
lib/supabase/
├── client.ts               # Client-side Supabase client
├── server.ts               # Server-side Supabase client
└── middleware.ts           # Auth middleware
```

### OpenAI (`/lib/openai/`)
```
lib/openai/
├── client.ts               # OpenAI client setup
├── embeddings.ts           # Embedding generation
├── scoring.ts              # Product scoring logic
└── comparison.ts           # Product comparison logic
```

### Database (`/lib/db/`)
```
lib/db/
├── schema.sql              # Complete database schema
│                          # - 5 tables with relationships
│                          # - Indexes for performance
│                          # - RLS policies for security
│                          # - Vector search function
└── queries.ts              # Database query functions
```

### State Management (`/lib/store/`)
```
lib/store/
├── auth-store.ts           # User auth state (Zustand)
└── project-store.ts        # Current project state (Zustand)
```

### Root Lib Files
```
lib/
└── utils.ts                # Utility functions (cn, formatDate, etc.)
```

## 📘 /types - TypeScript Types

```
types/
├── database.ts             # Supabase database types
└── index.ts                # Application types
                           # - User, Project, Requirement
                           # - Product, ProjectProduct
                           # - ComparisonResult, etc.
```

## 🧪 /__tests__ - Test Files

```
__tests__/
└── example.test.ts         # Example test file with Vitest
```

## 📦 /public - Static Assets

```
public/
└── .gitkeep                # Placeholder for static files
```

## 📊 Key Features by Directory

### Backend Features (/app/api/, /lib/)
- ✅ 8 API endpoints (projects, requirements, products, AI)
- ✅ Database schema with 5 tables
- ✅ Row-level security policies
- ✅ Vector search setup
- ✅ OpenAI integration structure
- ✅ Supabase authentication setup

### Frontend Features (/app/, /components/)
- ✅ 5 main pages (login, signup, dashboard, project, discover)
- ✅ 30+ reusable components
- ✅ Complete UI component library (Shadcn)
- ✅ Form handling structure
- ✅ State management setup
- ✅ Responsive layout components

## 🎯 Implementation Status

### ✅ Completed (Template/Structure)
- Project structure and folders
- All configuration files
- Component templates with TODO markers
- API route templates with TODO markers
- Database schema (ready to run)
- Type definitions
- UI component library
- Documentation (README, SETUP, CONTRIBUTING)

### 🔨 To Be Implemented (Your Team)
- Database query logic
- API endpoint business logic
- Authentication logic
- Form submission handlers
- Data fetching with React Query
- AI prompt engineering
- OpenAI API calls
- Error handling
- Loading states
- Test coverage

## 📝 TODO Markers

Throughout the codebase, you'll find `// TODO:` comments marking where your team needs to implement logic. Examples:

- **API Routes**: `// TODO: Query database`, `// TODO: Validate input`
- **Components**: `// TODO: Implement form handling`, `// TODO: Fetch data`
- **Lib Functions**: `// TODO: Call OpenAI API`, `// TODO: Handle errors`

## 🚀 Getting Started

1. **Setup**: Follow [SETUP.md](./SETUP.md)
2. **Backend Team**: Start with `lib/db/queries.ts` and `app/api/`
3. **Frontend Team**: Start with component logic in `components/`
4. **Both Teams**: Review TODOs throughout codebase

## 📞 Contact

- **Backend PM**: Neel
- **Frontend PM**: Simon

For questions or blockers, reach out on Slack!

