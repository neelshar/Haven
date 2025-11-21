# Contributing to FadePyra

Thank you for contributing to FadePyra! This guide will help you get started.

## Development Setup

See [SETUP.md](./SETUP.md) for detailed setup instructions.

## Team Structure

### Backend Team
- **PM**: Neel
- **Focus**: Database, APIs, Authentication
- **Key Files**:
  - `app/api/**/*.ts` - API routes
  - `lib/db/**/*.ts` - Database queries
  - `lib/supabase/**/*.ts` - Supabase configuration
  - `lib/openai/**/*.ts` - OpenAI integration

### Frontend Team
- **PM**: Simon
- **Focus**: UI/UX, Components, User Flows
- **Key Files**:
  - `components/**/*.tsx` - React components
  - `app/(auth)/**/*.tsx` - Auth pages
  - `app/(dashboard)/**/*.tsx` - Dashboard pages

## Development Workflow

### 1. Pick a Task
- Check the weekly plan in the roadmap
- Look for TODO comments in the code
- Coordinate with your team PM

### 2. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation updates

### 3. Write Code
- Follow the existing code style
- Add TODO comments if you can't complete something
- Write clean, readable code
- Add comments for complex logic

### 4. Test Your Changes
```bash
# Run the dev server
npm run dev

# Run tests (when implemented)
npm test

# Check for linting errors
npm run lint
```

### 5. Commit Your Changes
Use clear, descriptive commit messages:
```bash
git commit -m "Add: user authentication flow"
git commit -m "Fix: product search returning null results"
git commit -m "Update: improve loading state animations"
```

### 6. Push and Create PR
```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear title and description
- List of changes made
- Any TODOs or known issues
- Screenshots (if UI changes)

## Code Style Guidelines

### TypeScript
- Use explicit types when possible
- Avoid `any` type
- Use interfaces for object shapes
- Use type for unions and primitives

```typescript
// Good
interface User {
  id: string
  email: string
  name: string
}

// Avoid
const user: any = { ... }
```

### React Components
- Use functional components
- Use TypeScript for props
- Destructure props
- Use meaningful variable names

```typescript
// Good
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return <button onClick={onClick} className={variant}>{label}</button>
}
```

### API Routes
- Handle errors properly
- Return consistent response formats
- Validate input data
- Add authentication checks

```typescript
// Good
export async function GET(request: NextRequest) {
  try {
    // Check auth
    // Validate input
    // Query database
    // Return data
    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
```

### CSS/Tailwind
- Use Tailwind utility classes
- Follow mobile-first approach
- Use consistent spacing
- Leverage design tokens from theme

```tsx
// Good
<div className="flex flex-col gap-4 p-6 md:flex-row md:gap-6">
  {/* content */}
</div>
```

## File Organization

### Components
```
components/
├── ui/              # Base Shadcn components (don't modify often)
├── auth/            # Auth-specific components
├── layout/          # Layout components (header, nav, etc.)
├── project/         # Project-related components
├── product/         # Product-related components
└── comparison/      # Comparison-related components
```

### API Routes
```
app/api/
├── projects/        # Project CRUD operations
├── requirements/    # Requirements CRUD operations
├── products/        # Product search and management
├── ai/             # AI scoring and comparison
└── auth/           # Authentication callbacks
```

## Common Patterns

### Data Fetching (Frontend)
Use TanStack Query for server state:

```typescript
import { useQuery } from '@tanstack/react-query'

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await fetch('/api/projects')
      if (!res.ok) throw new Error('Failed to fetch')
      return res.json()
    },
  })
}
```

### Database Queries (Backend)
Create reusable query functions:

```typescript
// lib/db/queries.ts
export async function getProjects(userId: string) {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', userId)
  
  if (error) throw error
  return data
}
```

### Form Handling
Use react-hook-form with Zod validation:

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
})

export function MyForm() {
  const form = useForm({
    resolver: zodResolver(schema),
  })
  
  // ... form implementation
}
```

## Testing

### Unit Tests
```typescript
import { describe, it, expect } from 'vitest'

describe('MyFunction', () => {
  it('should do something', () => {
    expect(myFunction()).toBe(expected)
  })
})
```

### Integration Tests
- Test API endpoints with sample data
- Test user flows end-to-end
- Use Postman for API testing

## Debugging Tips

### Common Issues

**Supabase RLS Errors**
- Check if RLS policies are correct
- Verify user authentication
- Test with service role key (temporarily)

**OpenAI API Errors**
- Check API key validity
- Monitor rate limits
- Add retry logic with exponential backoff

**Type Errors**
- Check type definitions in `types/`
- Ensure imports are correct
- Use TypeScript strict mode

### Debugging Tools
- Browser DevTools (Network, Console)
- React DevTools extension
- Supabase Studio (database viewer)
- Postman (API testing)

## Getting Help

If you're stuck:
1. Check the documentation (README, SETUP, this file)
2. Search for similar issues in the codebase
3. Ask in your team channel (Backend/Frontend)
4. Reach out to your PM (Neel or Simon)
5. Don't hesitate to ask questions!

## Pull Request Checklist

Before submitting a PR:
- [ ] Code runs without errors
- [ ] No console errors in browser
- [ ] Tested on localhost
- [ ] TODOs are documented
- [ ] Code is clean and commented
- [ ] No sensitive data (API keys, etc.)
- [ ] Commit messages are clear
- [ ] PR description is complete

## Weekly Sync

- Backend team syncs: TBD
- Frontend team syncs: TBD
- Full team demos: End of each week

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com)
- [TanStack Query](https://tanstack.com/query/latest)

Happy coding! 🚀

