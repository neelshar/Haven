'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Trash2, ExternalLink } from 'lucide-react'
import { ScoreBar } from '@/components/comparison/score-bar'

interface ProductCardProps {
  product: any // TODO: Add proper type
  projectId: string
}

export function ProductCard({ product, projectId }: ProductCardProps) {
  // TODO: Implement remove functionality
  // TODO: Add confirmation dialog
  // TODO: Show AI score if available
  // TODO: Expandable reasoning section

  const handleRemove = async () => {
    // TODO: Implement remove logic
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{product.name}</CardTitle>
          <Badge variant="secondary">{product.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        {product.score && (
          <div className="space-y-2">
            <ScoreBar score={product.score} />
            {product.reasoning && (
              <p className="text-xs text-muted-foreground">{product.reasoning}</p>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" size="icon">
          <ExternalLink className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleRemove}>
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </CardFooter>
    </Card>
  )
}

