# Quick Start Guide

Get up and running in 5 minutes!

## 🚀 Installation

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
# Edit .env.local with your actual credentials
# - Get Supabase credentials from supabase.com
# - Get OpenAI API key from platform.openai.com

# 3. Run the database schema
# Copy contents of lib/db/schema.sql
# Paste and run in Supabase SQL Editor

# 4. Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📋 First Tasks

### Backend Team (Start Here)
1. **Set up database**: Run `lib/db/schema.sql` in Supabase
2. **Implement queries**: Fill in `lib/db/queries.ts`
3. **Build API endpoints**: Start with `/api/projects/route.ts`
4. **Test with Postman**: Create requests for each endpoint

### Frontend Team (Start Here)
1. **Test pages**: Visit `/login`, `/signup`, `/dashboard`
2. **Implement forms**: Add logic to `components/auth/login-form.tsx`
3. **Add data fetching**: Use React Query in list components
4. **Style and polish**: Update components as needed

## 🔍 Key Files to Know

| File | Purpose |
|------|---------|
| `app/api/*/route.ts` | API endpoint implementations |
| `lib/db/queries.ts` | Database query functions |
| `components/**/*.tsx` | React UI components |
| `lib/supabase/client.ts` | Database client setup |
| `lib/openai/client.ts` | OpenAI client setup |
| `types/index.ts` | TypeScript type definitions |

## 🛠️ Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Testing
npm test                 # Run tests
npm run test:coverage    # Test coverage report

# Code Quality
npm run lint             # Run ESLint
```

## 📁 Where to Add Code

### Adding a new API endpoint
1. Create file: `app/api/your-endpoint/route.ts`
2. Implement GET/POST/PUT/DELETE handlers
3. Add query function in `lib/db/queries.ts`
4. Test with Postman or curl

### Adding a new page
1. Create file: `app/(dashboard)/your-page/page.tsx`
2. Add to navigation in `components/layout/header.tsx`
3. Create components in `components/your-feature/`

### Adding a new component
1. Create file: `components/your-feature/component-name.tsx`
2. Follow existing patterns (props interface, exports)
3. Import and use in pages

## 🐛 Common Issues

### "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### "Supabase connection failed"
- Check `.env.local` has correct values
- No spaces around `=` in env file
- Restart dev server after env changes

### "Type errors"
- Check imports from `@/types`
- Ensure types match database schema
- Run `npm run build` to see all errors

## 📚 Learn More

- [Full Setup Guide](./SETUP.md)
- [Project Structure](./PROJECT_STRUCTURE.md)
- [Contributing Guidelines](./CONTRIBUTING.md)
- [README](./README.md)

## 💡 Pro Tips

1. **Search for TODOs**: `grep -r "TODO" .` to find all tasks
2. **Check examples**: Look at existing components for patterns
3. **Use TypeScript**: Let types guide your implementation
4. **Test early**: Don't wait until the end to test
5. **Ask questions**: Reach out to Neel or Simon anytime!

## 🎯 Week 1 Goals

### Backend
- [ ] Database schema deployed to Supabase
- [ ] Basic CRUD for projects working
- [ ] Authentication flow functional
- [ ] API tested with Postman

### Frontend
- [ ] Login/signup pages functional
- [ ] Dashboard showing projects
- [ ] Can create new project
- [ ] Navigation working

## 📞 Need Help?

- **Backend PM**: Neel
- **Frontend PM**: Simon
- **Slack**: Post in team channel
- **Documentation**: Check SETUP.md and README.md

Happy coding! 🎉

