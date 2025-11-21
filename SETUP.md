# Setup Guide

This guide will help you set up the FadePyra development environment.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 20 or later
- npm or yarn
- Git

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new account
2. Create a new project
3. Wait for the project to be fully set up (this may take a few minutes)
4. Navigate to Project Settings > API
5. Copy the following:
   - Project URL (under "Project URL")
   - `anon` public key (under "Project API keys")
   - `service_role` key (under "Project API keys" - click "Reveal" to see it)

## Step 3: Configure Database

1. In your Supabase dashboard, go to the SQL Editor
2. Open the file `lib/db/schema.sql` from this project
3. Copy the entire contents and paste it into the SQL Editor
4. Click "Run" to execute the SQL commands
5. This will create all necessary tables, indexes, and security policies

## Step 4: Set Up OpenAI

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Navigate to API Keys
4. Click "Create new secret key"
5. Copy the key (you won't be able to see it again!)

## Step 5: Configure Environment Variables

1. Copy the `.env.local` file contents
2. Fill in the values:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 6: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 7: Verify Setup

1. You should see the home page load
2. Try navigating to `/login` - the login page should render
3. Try signing up with a test account

## Common Issues

### Port 3000 is already in use
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or run on a different port
PORT=3001 npm run dev
```

### Supabase connection errors
- Double-check your environment variables
- Make sure there are no extra spaces
- Verify your Supabase project is active
- Check if your IP is allowed (Supabase > Project Settings > Database > Connection Pooling)

### Module not found errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Project Structure Overview

```
fadePyra/
├── app/                    # Next.js App Router pages and API routes
│   ├── (auth)/            # Authentication pages (login, signup)
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── api/               # API endpoints
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Shadcn UI base components
│   ├── auth/             # Authentication components
│   ├── layout/           # Layout components (header, nav, etc.)
│   ├── project/          # Project-related components
│   ├── product/          # Product-related components
│   └── comparison/       # AI comparison components
├── lib/                   # Utility functions and configurations
│   ├── supabase/         # Supabase client configuration
│   ├── openai/           # OpenAI client and helpers
│   ├── db/               # Database queries and schema
│   └── utils.ts          # General utilities
├── types/                 # TypeScript type definitions
├── public/                # Static assets
└── styles/                # Additional styles
```

## Next Steps

1. **Backend Team**: Start implementing database queries in `lib/db/queries.ts`
2. **Frontend Team**: Start building out component logic in the `components/` directory
3. **Both Teams**: Review the TODOs throughout the codebase for guidance

## Testing

Run tests with:
```bash
npm test
```

Generate coverage report:
```bash
npm run test:coverage
```

## Building for Production

```bash
npm run build
npm start
```

## Deployment

This project is configured for Vercel deployment:

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## Getting Help

If you encounter any issues:
1. Check this SETUP.md guide
2. Review the README.md
3. Search existing issues in the repository
4. Reach out to Neel or Simon on Slack

## Development Workflow

1. Create a new branch for your feature: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Test your changes locally
4. Commit with clear messages: `git commit -m "Add: description of changes"`
5. Push to GitHub: `git push origin feature/your-feature-name`
6. Create a Pull Request

## Code Style

- Use TypeScript for type safety
- Follow the existing code structure
- Add comments for complex logic
- Use descriptive variable names
- Keep functions small and focused

Happy coding! 🚀

