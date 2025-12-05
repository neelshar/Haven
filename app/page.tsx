'use client'

import { useState, useRef } from 'react'
import { Search, ArrowRight, Star, ExternalLink, CheckCircle2 } from 'lucide-react'

// Hardcoded vendor data
const VENDORS = [
  {
    id: 1,
    name: 'Notion',
    tagline: 'All-in-one workspace for notes, docs, and projects',
    description: "A connected workspace where better, faster work happens. Notion blends your everyday work apps into one.",
    category: 'Productivity',
    rating: 4.8,
    reviews: 12500,
    pricing: 'Free - $15/user/mo',
    features: ['Real-time collaboration', 'AI-powered writing', 'Database views', 'API integrations'],
    website: 'https://notion.so',
    matchKeywords: ['notes', 'documentation', 'wiki', 'project management', 'collaboration', 'workspace', 'team', 'organize', 'planning', 'database'],
  },
  {
    id: 2,
    name: 'Slack',
    tagline: 'Where work happens',
    description: 'Slack is your digital HQ. Transform the way you work with one place for everyone and everything.',
    category: 'Communication',
    rating: 4.7,
    reviews: 32000,
    pricing: 'Free - $12.50/user/mo',
    features: ['Channels & DMs', 'Huddles & clips', '2,400+ integrations', 'Enterprise security'],
    website: 'https://slack.com',
    matchKeywords: ['communication', 'chat', 'messaging', 'team', 'channels', 'remote', 'async', 'collaboration'],
  },
  {
    id: 3,
    name: 'Linear',
    tagline: "The issue tracking tool you'll enjoy using",
    description: 'Linear is a better way to build products. Streamline issues, projects, and product roadmaps.',
    category: 'Project Management',
    rating: 4.9,
    reviews: 4200,
    pricing: 'Free - $8/user/mo',
    features: ['Lightning fast UI', 'Keyboard-first design', 'GitHub sync', 'Cycles & roadmaps'],
    website: 'https://linear.app',
    matchKeywords: ['issues', 'bugs', 'tickets', 'sprints', 'agile', 'development', 'engineering', 'tracking', 'roadmap'],
  },
  {
    id: 4,
    name: 'Figma',
    tagline: 'Design, prototype, and collaborate in one place',
    description: 'Figma helps teams create, test, and ship better designs from start to finish.',
    category: 'Design',
    rating: 4.8,
    reviews: 18900,
    pricing: 'Free - $15/editor/mo',
    features: ['Real-time collaboration', 'Prototyping', 'Design systems', 'Dev mode'],
    website: 'https://figma.com',
    matchKeywords: ['design', 'ui', 'ux', 'prototype', 'wireframe', 'mockup', 'creative', 'interface'],
  },
  {
    id: 5,
    name: 'Vercel',
    tagline: 'Develop. Preview. Ship.',
    description: 'Vercel is the platform for frontend developers, providing speed and reliability.',
    category: 'Development',
    rating: 4.9,
    reviews: 8700,
    pricing: 'Free - $20/user/mo',
    features: ['Edge network', 'Serverless functions', 'Preview deployments', 'Analytics'],
    website: 'https://vercel.com',
    matchKeywords: ['hosting', 'deployment', 'frontend', 'react', 'nextjs', 'serverless', 'website', 'developer'],
  },
  {
    id: 6,
    name: 'Stripe',
    tagline: 'Financial infrastructure for the internet',
    description: 'Stripe powers online and in-person payment processing for businesses of all sizes.',
    category: 'Payments',
    rating: 4.7,
    reviews: 15600,
    pricing: '2.9% + 30¢ per txn',
    features: ['Payment processing', 'Billing & subscriptions', 'Fraud prevention', 'Global payments'],
    website: 'https://stripe.com',
    matchKeywords: ['payments', 'billing', 'subscriptions', 'ecommerce', 'checkout', 'transactions', 'money'],
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
    
    await new Promise(resolve => setTimeout(resolve, 1200))
    
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
      <header className="px-6 py-6 border-b border-gray-100">
        <nav className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
              <span className="text-white text-sm font-medium">H</span>
            </div>
            <span className="text-lg font-medium">Haven</span>
          </div>
          <span className="text-sm text-gray-500">Software Discovery</span>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="px-6 pt-24 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Main Title */}
          <h1 className="font-serif text-5xl md:text-6xl font-normal mb-6 leading-tight tracking-tight">
            Find Software
          </h1>
          
          <p className="text-lg text-gray-600 max-w-xl mx-auto mb-12">
            Describe what you need. We'll match you with the right tools.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto">
            <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-4 py-3 focus-within:border-gray-400 transition-colors">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="I need a tool for..."
                className="flex-1 bg-transparent text-base placeholder:text-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isSearching || !query.trim()}
                className="px-5 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {isSearching ? (
                  <span>Searching...</span>
                ) : (
                  <>
                    <span>Search</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Example queries */}
            <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
              <span className="text-sm text-gray-400">Try:</span>
              {['team chat', 'design tools', 'issue tracking'].map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => setQuery(example)}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-black border border-gray-200 hover:border-gray-300 rounded-full transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </form>
        </div>
      </section>

      {/* Results Section */}
      {hasSearched && (
        <section ref={resultsRef} className="px-6 pb-24">
          <div className="max-w-4xl mx-auto">
            {isSearching ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-600 rounded-full animate-spin mb-4" />
                <p className="text-gray-500">Finding matches...</p>
              </div>
            ) : results.length > 0 ? (
              <>
                <div className="mb-8">
                  <h2 className="font-serif text-2xl font-normal">
                    Results for "{query}"
                  </h2>
                </div>

                <div className="space-y-4">
                  {results.map((vendor, index) => (
                    <VendorCard key={vendor.id} vendor={vendor} rank={index + 1} />
                  ))}
                </div>

                <div className="text-center mt-10">
                  <button
                    onClick={() => {
                      setQuery('')
                      setHasSearched(false)
                      setResults([])
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="text-sm text-gray-500 hover:text-black transition-colors"
                  >
                    ← New search
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="px-6 py-6 border-t border-gray-100">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-sm text-gray-400">
          <span>Haven</span>
          <span>Software discovery, simplified.</span>
        </div>
      </footer>
    </main>
  )
}

function VendorCard({ vendor, rank }: { vendor: typeof VENDORS[0]; rank: number }) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-lg font-medium shrink-0">
          {vendor.name[0]}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-serif text-xl">{vendor.name}</h3>
            <span className="text-xs text-gray-400 border border-gray-200 px-2 py-0.5 rounded">
              {vendor.category}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mb-3">{vendor.tagline}</p>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-gray-400 fill-gray-400" />
              <span className="text-gray-700">{vendor.rating}</span>
              <span className="text-gray-400">({vendor.reviews.toLocaleString()})</span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">{vendor.pricing}</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {vendor.features.slice(0, 3).map((feature) => (
              <span key={feature} className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                {feature}
              </span>
            ))}
          </div>
        </div>
        
        <a
          href={vendor.website}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-4 py-2 text-sm border border-gray-200 rounded-md hover:border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          Visit
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  )
}
