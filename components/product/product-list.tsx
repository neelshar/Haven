'use client'

import { ProductCard } from './product-card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

interface ProductListProps {
  projectId: string
}

export function ProductList({ projectId }: ProductListProps) {
  // TODO: Fetch products for project using React Query
  // TODO: Handle loading state
  // TODO: Handle error state
  // TODO: Handle empty state

  const products: any[] = []

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products</h2>
        <Link href={`/project/${projectId}/discover`}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Products
          </Button>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>No products added yet</p>
          <p className="text-sm mt-2">Search and add products to compare</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} projectId={projectId} />
          ))}
        </div>
      )}
    </div>
  )
}

