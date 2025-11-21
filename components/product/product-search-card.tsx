'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, ExternalLink } from 'lucide-react'

interface ProductSearchCardProps {
  product: any // TODO: Add proper type
  projectId: string
}

export function ProductSearchCard({ product, projectId }: ProductSearchCardProps) {
  // TODO: Implement add to project functionality
  // TODO: Show loading state on button
  // TODO: Disable button if already added
  // TODO: Open details dialog

  const handleAdd = async () => {
    // TODO: Implement add logic
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg line-clamp-1">
            {product.name || 'Unnamed Product'}
          </CardTitle>
          <Badge variant="secondary">{product.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {product.description || 'No description available'}
        </p>
        <div className="flex items-center gap-2 mt-4">
          <span className="text-sm">⭐ {product.rating || 'N/A'}</span>
          <span className="text-xs text-muted-foreground">
            ({product.reviews || 0} reviews)
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button onClick={handleAdd} className="flex-1">
          <Plus className="mr-2 h-4 w-4" />
          Add
        </Button>
        <Button variant="outline" size="icon">
          <ExternalLink className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

