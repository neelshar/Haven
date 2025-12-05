'use client'

import { useState, useRef } from 'react'
import { Search, ArrowRight, Star, ExternalLink, Check } from 'lucide-react'

// Hardcoded vendor data
const VENDORS = [
  {
    id: 1,
    name: 'Notion',
    tagline: 'All-in-one workspace for notes, docs, and projects',
    description: "A connected workspace where better, faster work happens. Notion blends your everyday work apps into one — it's the all-in-one workspace for you and your team.",
    category: 'Productivity',
    rating: 4.8,
    reviews: 12500,
    pricing: 'Free - $15/user/mo',
    features: ['Real-time collaboration', 'AI-powered writing', 'Database views', 'API integrations'],
    website: 'https://notion.so',
    matchKeywords: ['notes', 'documentation', 'wiki', 'project management', 'collaboration', 'workspace', 'team', 'organize', 'planning', 'database', 'knowledge base'],
  },
  {
    id: 2,
    name: 'Slack',
    tagline: 'Where work happens',
    description: 'Slack is your digital HQ. Transform the way you work with one place for everyone and everything you need to get stuff done.',
    category: 'Communication',
    rating: 4.7,
    reviews: 32000,
    pricing: 'Free - $12.50/user/mo',
    features: ['Channels & DMs', 'Huddles & clips', '2,400+ integrations', 'Enterprise security'],
    website: 'https://slack.com',
    matchKeywords: ['communication', 'chat', 'messaging', 'team', 'channels', 'remote', 'async', 'collaboration', 'integrations', 'workflow'],
  },
  {
    id: 3,
    name: 'Linear',
    tagline: "The issue tracking tool you'll enjoy using",
    description: 'Linear is a better way to build products. Streamline issues, projects, and product roadmaps with a beautiful, fast interface.',
    category: 'Project Management',
    rating: 4.9,
    reviews: 4200,
    pricing: 'Free - $8/user/mo',
    features: ['Lightning fast UI', 'Keyboard-first design', 'GitHub sync', 'Cycles & roadmaps'],
    website: 'https://linear.app',
    matchKeywords: ['issues', 'bugs', 'tickets', 'sprints', 'agile', 'development', 'engineering', 'tracking', 'roadmap', 'product', 'scrum', 'kanban'],
  },
  {
    id: 4,
    name: 'Figma',
    tagline: 'Design, prototype, and collaborate in one place',
    description: 'Figma helps teams create, test, and ship better designs from start to finish. The collaborative interface design tool.',
    category: 'Design',
    rating: 4.8,
    reviews: 18900,
    pricing: 'Free - $15/editor/mo',
    features: ['Real-time collaboration', 'Prototyping', 'Design systems', 'Dev mode'],
    website: 'https://figma.com',
    matchKeywords: ['design', 'ui', 'ux', 'prototype', 'wireframe', 'mockup', 'creative', 'interface', 'graphics', 'visual', 'collaboration'],
  },
  {
    id: 5,
    name: 'Vercel',
    tagline: 'Develop. Preview. Ship.',
    description: 'Vercel is the platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.',
    category: 'Development',
    rating: 4.9,
    reviews: 8700,
    pricing: 'Free - $20/user/mo',
    features: ['Edge network', 'Serverless functions', 'Preview deployments', 'Analytics'],
    website: 'https://vercel.com',
    matchKeywords: ['hosting', 'deployment', 'frontend', 'react', 'nextjs', 'serverless', 'website', 'web app', 'developer', 'infrastructure', 'cloud'],
  },
  {
    id: 6,
    name: 'Stripe',
    tagline: 'Financial infrastructure for the internet',
    description: 'Stripe powers online and in-person payment processing and financial solutions for businesses of all sizes.',
    category: 'Payments',
    rating: 4.7,
    reviews: 15600,
    pricing: '2.9% + 30¢ per txn',
    features: ['Payment processing', 'Billing & subscriptions', 'Fraud prevention', 'Global payments'],
    website: 'https://stripe.com',
    matchKeywords: ['payments', 'billing', 'subscriptions', 'ecommerce', 'checkout', 'transactions', 'money', 'revenue', 'invoicing', 'financial'],
  },
  {
    id: 7,
    name: 'GitHub',
    tagline: 'Where the world builds software',
    description: 'GitHub is the complete developer platform to build, scale, and deliver secure software. Code, collaborate, and ship.',
    category: 'Development',
    rating: 4.8,
    reviews: 45000,
    pricing: 'Free - $21/user/mo',
    features: ['Git repositories', 'GitHub Actions CI/CD', 'Copilot AI', 'Code review'],
    website: 'https://github.com',
    matchKeywords: ['code', 'git', 'repository', 'version control', 'ci/cd', 'devops', 'open source', 'collaboration', 'developer', 'software'],
  },
  {
    id: 8,
    name: 'HubSpot',
    tagline: 'Grow better with HubSpot',
    description: "HubSpot's CRM platform has all the tools and integrations you need for marketing, sales, content management, and customer service.",
    category: 'CRM & Marketing',
    rating: 4.6,
    reviews: 28000,
    pricing: 'Free - $800+/mo',
    features: ['CRM & contacts', 'Email marketing', 'Marketing automation', 'Sales pipeline'],
    website: 'https://hubspot.com',
    matchKeywords: ['crm', 'marketing', 'sales', 'leads', 'customers', 'email', 'automation', 'pipeline', 'growth', 'contacts', 'inbound'],
  },
  {
    id: 9,
    name: 'Datadog',
    tagline: 'See inside any stack, any app, at any scale',
    description: 'Datadog is the monitoring and security platform for cloud applications. Bring together metrics, traces, and logs.',
    category: 'DevOps',
    rating: 4.7,
    reviews: 6800,
    pricing: 'Free - $15+/host/mo',
    features: ['Infrastructure monitoring', 'APM & tracing', 'Log management', 'Security monitoring'],
    website: 'https://datadoghq.com',
    matchKeywords: ['monitoring', 'observability', 'logs', 'metrics', 'alerts', 'infrastructure', 'apm', 'devops', 'cloud', 'performance'],
  },
  {
    id: 10,
    name: 'Airtable',
    tagline: "Create apps that perfectly fit your team's needs",
    description: 'Airtable is a low-code platform to build next-gen apps. Move beyond rigid tools with a collaborative app platform.',
    category: 'No-Code',
    rating: 4.7,
    reviews: 11200,
    pricing: 'Free - $20/user/mo',
    features: ['Flexible databases', 'Automations', 'Interface designer', 'Extensions'],
    website: 'https://airtable.com',
    matchKeywords: ['database', 'spreadsheet', 'no-code', 'automation', 'workflow', 'organize', 'tables', 'data', 'apps', 'low-code'],
  },
]

// Smart matching algorithm
function matchVendors(query: string): typeof VENDORS {
  const queryLower = query.toLowerCase()
  const words = queryLower.split(/\s+/).filter(w => w.length > 2)
  
  const scored = VENDORS.map(vendor => {
    let score = 0
    
    vendor.matchKeywords.forEach(keyword => {
      if (queryLower.includes(keyword)) score += 15
      words.forEach(word => {
        if (keyword.includes(word)) score += 8
        if (word.includes(keyword)) score += 5
      })
    })
    
    if (queryLower.includes(vendor.name.toLowerCase())) score += 30
    if (vendor.category.toLowerCase().includes(queryLower)) score += 12
    
    words.forEach(word => {
      if (vendor.category.toLowerCase().includes(word)) score += 8
      if (vendor.tagline.toLowerCase().includes(word)) score += 5
      if (vendor.description.toLowerCase().includes(word)) score += 2
    })
    
    return { ...vendor, score }
  })
  
  return scored
    .filter(v => v.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
}

export default function HavenPage() {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<typeof VENDORS>([])
  const [hasSearched, setHasSearched] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    
    setIsSearching(true)
    setHasSearched(true)
    
    // Brief delay for UX
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const matches = matchVendors(query)
    setResults(matches.length > 0 ? matches : VENDORS.slice(0, 3))
    setIsSearching(false)
    
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-serif text-xl font-medium">Haven</span>
          <span className="text-sm text-gray-500">Software Discovery</span>
        </nav>
      </header>

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-600 mb-12">
            <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
            AI-powered recommendations
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight mb-8 leading-[1.1]">
            Find Your Software
          </h1>

          <p className="text-xl text-gray-600 max-w-xl mx-auto mb-12 leading-relaxed">
            Describe what you need in plain English. We'll match you with the best tools for your business.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="w-full max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What kind of software do you need?"
                className="w-full px-6 py-4 pr-32 text-lg border border-gray-200 rounded-full focus:outline-none focus:border-gray-400 transition-colors"
              />
              <button
                type="submit"
                disabled={isSearching || !query.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {isSearching ? (
                  'Searching...'
                ) : (
                  <>
                    Search
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Example queries */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="text-gray-400">Try:</span>
            {['project management', 'team chat', 'design tools'].map((example) => (
              <button
                key={example}
                onClick={() => setQuery(example)}
                className="px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-black transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      {hasSearched && (
        <section ref={resultsRef} className="px-6 py-24 border-t border-gray-100">
          <div className="max-w-5xl mx-auto">
            {isSearching ? (
              <div className="text-center py-20">
                <div className="inline-block w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600">Finding the best matches...</p>
              </div>
            ) : results.length > 0 ? (
              <>
                <div className="text-center mb-16">
                  <p className="text-sm text-gray-500 mb-2">Results for</p>
                  <h2 className="font-serif text-3xl">{query}</h2>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  {results.map((vendor, index) => (
                    <VendorCard key={vendor.id} vendor={vendor} rank={index + 1} />
                  ))}
                </div>

                <div className="text-center mt-16">
                  <button
                    onClick={() => {
                      setQuery('')
                      setHasSearched(false)
                      setResults([])
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-full text-sm hover:border-gray-400 transition-colors"
                  >
                    <Search className="w-4 h-4" />
                    New search
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-gray-100">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-sm text-gray-400">
          <span className="font-serif">Haven</span>
          <span>Software discovery, simplified</span>
        </div>
      </footer>
    </main>
  )
}

function VendorCard({ vendor, rank }: { vendor: typeof VENDORS[0]; rank: number }) {
  return (
    <div className="group p-6 border border-gray-200 rounded-2xl hover:border-gray-400 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-serif text-xl mb-1">{vendor.name}</h3>
          <p className="text-sm text-gray-500">{vendor.category}</p>
        </div>
        <span className="text-xs text-gray-400 font-medium">#{rank}</span>
      </div>

      {/* Tagline */}
      <p className="text-gray-600 text-sm mb-6 leading-relaxed">{vendor.tagline}</p>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-6 pb-6 border-b border-gray-100">
        <Star className="w-4 h-4 fill-black" />
        <span className="font-medium">{vendor.rating}</span>
        <span className="text-sm text-gray-400">({vendor.reviews.toLocaleString()} reviews)</span>
      </div>

      {/* Features */}
      <div className="space-y-2 mb-6">
        {vendor.features.slice(0, 3).map((feature) => (
          <div key={feature} className="flex items-center gap-2 text-sm text-gray-600">
            <Check className="w-4 h-4 text-gray-400" />
            {feature}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div>
          <p className="text-xs text-gray-400">Starting at</p>
          <p className="font-medium text-sm">{vendor.pricing}</p>
        </div>
        <a
          href={vendor.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium border border-gray-200 rounded-full hover:bg-black hover:text-white hover:border-black transition-colors"
        >
          Visit
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  )
}
