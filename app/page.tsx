'use client'

import { useState, useRef } from 'react'
import { Search, ArrowRight, Star, ExternalLink, CheckCircle2, ChevronDown, ChevronUp, Scale } from 'lucide-react'

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
    tagline: "The issue tracking tool you will enjoy using",
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

// Security compliance vendors (hardcoded for "security" queries)
const SECURITY_VENDORS = [
  {
    id: 101,
    name: 'Drata',
    tagline: 'Compliance automation platform',
    description: 'Drata automates your compliance journey from start to finish, providing support for SOC 2, ISO 27001, HIPAA, and more.',
    category: 'Security Compliance',
    rating: 4.9,
    reviews: 2100,
    pricing: 'Custom pricing',
    features: ['Automated evidence collection', 'Continuous monitoring', '75+ integrations', 'Pre-mapped controls'],
    website: 'https://drata.com',
    matchReason: 'Best for fast-growing fintech companies. Drata excels at automating compliance for B2C companies handling financial data, with strong support for SOC 2 Type II and payment security standards required for wire transfer operations.',
    pros: ['Fastest time-to-compliance', 'Excellent for startups', 'Strong automation'],
    cons: ['Higher learning curve', 'Premium pricing'],
    bestFor: 'Fast-moving startups needing quick SOC 2 certification',
  },
  {
    id: 102,
    name: 'Vanta',
    tagline: 'Automate compliance, manage risk, and build trust',
    description: 'Vanta helps businesses get and stay compliant with SOC 2, ISO 27001, HIPAA, GDPR and more through automation.',
    category: 'Security Compliance',
    rating: 4.8,
    reviews: 3400,
    pricing: 'Starting at $10k/year',
    features: ['Trust Center', 'Vendor risk management', 'AI-powered questionnaires', 'Employee onboarding'],
    website: 'https://www.vanta.com',
    matchReason: 'Perfect for AI-powered B2C companies. Vanta offers comprehensive compliance coverage with specific support for AI governance frameworks (ISO 42001, NIST AI RMF), making it ideal for companies using AI for financial services.',
    pros: ['AI governance support', 'Trust center included', 'Great for B2C'],
    cons: ['Annual contracts only', 'Less customization'],
    bestFor: 'AI-driven companies needing modern compliance frameworks',
  },
  {
    id: 103,
    name: 'OneTrust',
    tagline: 'Trust intelligence platform for privacy and compliance',
    description: 'OneTrust provides privacy, security, and data governance solutions for enterprise organizations.',
    category: 'Security Compliance',
    rating: 4.6,
    reviews: 1800,
    pricing: 'Enterprise pricing',
    features: ['Data privacy management', 'Third-party risk', 'Consent management', 'Global compliance'],
    website: 'https://www.onetrust.com',
    matchReason: 'Enterprise-grade solution for global B2C operations. OneTrust offers robust consent management and data privacy features essential for wire transfer companies handling consumer financial data across multiple jurisdictions.',
    pros: ['Most comprehensive', 'Global compliance', 'Data privacy focus'],
    cons: ['Enterprise-focused pricing', 'Complex implementation'],
    bestFor: 'Large B2C companies with global compliance needs',
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
  const [securityResults, setSecurityResults] = useState<typeof SECURITY_VENDORS>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const [expandedVendor, setExpandedVendor] = useState<number | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const isSecurityQuery = (q: string) => q.toLowerCase().includes('security')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    
    setIsSearching(true)
    setHasSearched(true)
    setShowComparison(false)
    setExpandedVendor(null)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    if (isSecurityQuery(query)) {
      setSecurityResults(SECURITY_VENDORS)
      setResults([])
    } else {
      const matches = matchVendors(query)
      setResults(matches.length > 0 ? matches : VENDORS.slice(0, 3))
      setSecurityResults([])
    }
    setIsSearching(false)
    
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="px-8 py-6 border-b border-gray-100">
        <nav className="w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
              <span className="text-white text-base font-medium">H</span>
            </div>
            <span className="text-xl font-medium">Haven</span>
          </div>
          <span className="text-sm text-gray-500">Software Discovery</span>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="px-8 pt-20 pb-16">
        <div className="w-full max-w-4xl mx-auto text-center">
          {/* Main Title */}
          <h1 className="font-serif text-6xl md:text-7xl font-normal mb-6 leading-tight tracking-tight">
            Find Software
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            Describe what you need. We will match you with the right tools.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="w-full max-w-3xl mx-auto">
            <div className="flex items-center gap-4 border border-gray-200 rounded-xl px-5 py-4 focus-within:border-gray-400 transition-colors shadow-sm">
              <Search className="w-6 h-6 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="my b2c company for faster wire transfers through ai needs a security compliance tool"
                className="flex-1 bg-transparent text-lg placeholder:text-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isSearching || !query.trim()}
                className="px-6 py-2.5 bg-black text-white text-base font-medium rounded-lg hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
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
            <div className="mt-5 flex items-center justify-center gap-3 flex-wrap">
              <span className="text-sm text-gray-400">Try:</span>
              {['team chat', 'design tools', 'security compliance'].map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => setQuery(example)}
                  className="px-4 py-1.5 text-sm text-gray-600 hover:text-black border border-gray-200 hover:border-gray-300 rounded-full transition-colors"
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
        <section ref={resultsRef} className="px-8 pb-24">
          <div className="w-full max-w-6xl mx-auto">
            {isSearching ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-10 h-10 border-2 border-gray-200 border-t-gray-600 rounded-full animate-spin mb-4" />
                <p className="text-gray-500 text-lg">Finding the best matches for your needs...</p>
              </div>
            ) : securityResults.length > 0 ? (
              <>
                <div className="mb-10">
                  <h2 className="font-serif text-3xl font-normal mb-2">
                    Security Compliance Tools for Your Business
                  </h2>
                  <p className="text-gray-600">
                    Based on your query: "{query}"
                  </p>
                </div>

                <div className="space-y-6">
                  {securityResults.map((vendor, index) => (
                    <SecurityVendorCard 
                      key={vendor.id} 
                      vendor={vendor} 
                      rank={index + 1}
                      isExpanded={expandedVendor === vendor.id}
                      onToggle={() => setExpandedVendor(expandedVendor === vendor.id ? null : vendor.id)}
                    />
                  ))}
                </div>

                {/* Compare Button */}
                <div className="mt-12 text-center">
                  <button
                    onClick={() => setShowComparison(!showComparison)}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Scale className="w-5 h-5" />
                    {showComparison ? 'Hide Comparison' : 'Compare & Rank All Three'}
                  </button>
                </div>

                {/* Comparison Table */}
                {showComparison && (
                  <div className="mt-10 border border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                      <h3 className="font-serif text-xl">Side-by-Side Comparison</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Feature</th>
                            {securityResults.map(v => (
                              <th key={v.id} className="px-6 py-4 text-left text-sm font-medium">{v.name}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-100">
                            <td className="px-6 py-4 text-sm text-gray-500">Best For</td>
                            {securityResults.map(v => (
                              <td key={v.id} className="px-6 py-4 text-sm">{v.bestFor}</td>
                            ))}
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="px-6 py-4 text-sm text-gray-500">Rating</td>
                            {securityResults.map(v => (
                              <td key={v.id} className="px-6 py-4 text-sm">
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-gray-400 fill-gray-400" />
                                  {v.rating}
                                </div>
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="px-6 py-4 text-sm text-gray-500">Pricing</td>
                            {securityResults.map(v => (
                              <td key={v.id} className="px-6 py-4 text-sm">{v.pricing}</td>
                            ))}
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="px-6 py-4 text-sm text-gray-500">Key Strength</td>
                            {securityResults.map(v => (
                              <td key={v.id} className="px-6 py-4 text-sm text-green-700">{v.pros[0]}</td>
                            ))}
                          </tr>
                          <tr>
                            <td className="px-6 py-4 text-sm text-gray-500">Consider</td>
                            {securityResults.map(v => (
                              <td key={v.id} className="px-6 py-4 text-sm text-gray-500">{v.cons[0]}</td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        <strong>Recommendation:</strong> For a B2C company focused on AI-powered wire transfers, we recommend <strong>Vanta</strong> for its AI governance support and quick implementation, or <strong>Drata</strong> if speed-to-compliance is your top priority.
                      </p>
                    </div>
                  </div>
                )}

                <div className="text-center mt-10">
                  <button
                    onClick={() => {
                      setQuery('')
                      setHasSearched(false)
                      setResults([])
                      setSecurityResults([])
                      setShowComparison(false)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="text-sm text-gray-500 hover:text-black transition-colors"
                  >
                    ← New search
                  </button>
                </div>
              </>
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
      <footer className="px-8 py-8 border-t border-gray-100">
        <div className="w-full flex items-center justify-between text-sm text-gray-400">
          <span>Haven</span>
          <span>Software discovery, simplified.</span>
        </div>
      </footer>
    </main>
  )
}

function VendorCard({ vendor, rank }: { vendor: typeof VENDORS[0]; rank: number }) {
  return (
    <div className="border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center text-xl font-medium shrink-0">
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
          className="shrink-0 px-4 py-2 text-sm border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          Visit
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  )
}

function SecurityVendorCard({ 
  vendor, 
  rank,
  isExpanded,
  onToggle
}: { 
  vendor: typeof SECURITY_VENDORS[0]; 
  rank: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors">
      <div className="p-6">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center text-2xl font-medium shrink-0">
            {vendor.name[0]}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-medium text-white bg-black px-2 py-0.5 rounded">
                #{rank}
              </span>
              <h3 className="font-serif text-2xl">{vendor.name}</h3>
              <span className="text-xs text-gray-400 border border-gray-200 px-2 py-0.5 rounded">
                {vendor.category}
              </span>
            </div>
            
            <p className="text-gray-600 mb-3">{vendor.tagline}</p>
            
            <div className="flex items-center gap-5 text-sm mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-gray-400 fill-gray-400" />
                <span className="text-gray-700 font-medium">{vendor.rating}</span>
                <span className="text-gray-400">({vendor.reviews.toLocaleString()} reviews)</span>
              </div>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">{vendor.pricing}</span>
            </div>
            
            {/* Match Reason */}
            <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-800 mb-1">Why this matches your needs:</p>
                  <p className="text-sm text-green-700">{vendor.matchReason}</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {vendor.features.map((feature) => (
                <span key={feature} className="text-xs text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                  {feature}
                </span>
              ))}
            </div>
          </div>
          
          <div className="shrink-0 flex flex-col gap-2">
            <a
              href={vendor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              Visit Site
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onToggle}
              className="px-5 py-2.5 text-sm border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              {isExpanded ? 'Less Info' : 'More Info'}
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-gray-200 bg-gray-50 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-sm text-gray-700 mb-3">About</h4>
              <p className="text-sm text-gray-600">{vendor.description}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-gray-700 mb-3">Pros</h4>
              <ul className="space-y-2">
                {vendor.pros.map((pro, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-green-700">
                    <CheckCircle2 className="w-4 h-4" />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm text-gray-700 mb-3">Consider</h4>
              <ul className="space-y-2">
                {vendor.cons.map((con, i) => (
                  <li key={i} className="text-sm text-gray-500">• {con}</li>
                ))}
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                <strong>Best for:</strong> {vendor.bestFor}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
