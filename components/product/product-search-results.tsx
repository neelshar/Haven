'use client'

import { ProductSearchCard } from './product-search-card'

interface ProductSearchResultsProps {
  projectId: string
}

export function ProductSearchResults({ projectId }: ProductSearchResultsProps) {
  // TODO: Get search results from state/query
  // TODO: Handle loading state with skeletons
  // TODO: Handle error state
  // TODO: Handle empty state

  const results: any[] = []

  if (results.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No products found</p>
        <p className="text-sm mt-2">Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-4">
        {results.length} results found
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((product) => (
          <ProductSearchCard
            key={product.id}
            product={product}
            projectId={projectId}
          />
        ))}
      </div>
    </div>
  )
}

