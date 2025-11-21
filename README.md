# FadePyra - Product Discovery and Comparison Platform

A full-stack Next.js application for product discovery with AI-powered comparisons and semantic search.

## Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3.4
- **Components:** Shadcn UI (Radix + Tailwind)
- **State Management:** Zustand
- **Forms:** React Hook Form + Zod
- **Data Fetching:** TanStack Query (React Query)
- **Icons:** Lucide React

### Backend
- **Database:** PostgreSQL (Supabase) with pgvector
- **Authentication:** Supabase Auth
- **API:** Next.js App Router API Routes
- **AI:** OpenAI GPT-4 and text-embedding-3-small
- **Deployment:** Vercel

## Getting Started

### Prerequisites
- Node.js 20+ installed
- Supabase account
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fadePyra
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your actual credentials:
- Supabase URL and keys
- OpenAI API key
- Database connection string

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
fadePyra/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Authentication routes
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/             # Protected dashboard routes
│   │   ├── project/
│   │   └── settings/
│   ├── api/                     # API routes
│   │   ├── projects/
│   │   ├── requirements/
│   │   ├── products/
│   │   ├── ai/
│   │   └── auth/
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home/Dashboard page
├── components/                   # React components
│   ├── ui/                      # Shadcn base components
│   ├── project/                 # Project-related components
│   ├── product/                 # Product-related components
│   ├── comparison/              # AI comparison components
│   └── layout/                  # Layout components
├── lib/                         # Utilities and configurations
│   ├── supabase/               # Supabase client and utilities
│   ├── openai/                 # OpenAI client and utilities
│   ├── db/                     # Database queries and types
│   └── utils.ts                # General utilities
├── types/                       # TypeScript type definitions
├── public/                      # Static assets
└── styles/                      # Global styles
```

## Database Schema

### Tables
- `profiles` - User profiles linked to auth.users
- `projects` - User projects with metadata
- `requirements` - Flat list of project requirements
- `products` - Product catalog with embeddings
- `project_products` - Many-to-many with AI scores

See `/lib/db/schema.sql` for complete schema.

## API Endpoints

### Projects
- `POST /api/projects` - Create new project
- `GET /api/projects` - List user's projects
- `GET /api/projects/[id]` - Get single project
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Requirements
- `POST /api/requirements` - Create requirement
- `GET /api/requirements?projectId=X` - List by project
- `PUT /api/requirements/[id]` - Update requirement
- `DELETE /api/requirements/[id]` - Delete requirement

### Products
- `GET /api/products/search` - Semantic product search
- `GET /api/products/[id]` - Get product details
- `POST /api/products/add` - Add product to project
- `DELETE /api/products/remove` - Remove product from project

### AI
- `POST /api/ai/score` - Score product against requirements
- `POST /api/ai/compare` - Compare multiple products

## Development Workflow

### Running Tests
```bash
npm test
npm run test:coverage
```

### Linting
```bash
npm run lint
```

### Building for Production
```bash
npm run build
npm start
```

## Deployment

This project is designed to deploy on Vercel:

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

## Team Responsibilities

### Backend Team
- Database schema and migrations
- API endpoint implementation
- Authentication and authorization
- Vector search implementation
- AI integration (OpenAI)

### Frontend Team
- UI component development
- Page implementations
- Form handling and validation
- API integration
- Responsive design
- Loading and error states

## Timeline

- **Week 1:** Foundation and Architecture
- **Week 2:** Core API Development
- **Week 3:** Search and Data Integration
- **Week 4:** AI Integration and Optimization
- **Week 5:** Deployment and Documentation

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com)
- [Supabase Docs](https://supabase.com/docs)
- [OpenAI API](https://platform.openai.com/docs)

## Questions or Issues?

Reach out to Neel or Simon on Slack!

