import { ProductSearch } from '@/components/product/product-search'
import { ProductSearchResults } from '@/components/product/product-search-results'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface DiscoverPageProps {
  params: {
    id: string
  }
}

export default function DiscoverPage({ params }: DiscoverPageProps) {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <Link href={`/project/${params.id}`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Project
          </Button>
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Discover Products</h1>
        <p className="text-muted-foreground">
          Search for products to add to your project
        </p>
      </div>

      <ProductSearch projectId={params.id} />
      <ProductSearchResults projectId={params.id} />
    </div>
  )
}

