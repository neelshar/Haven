'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

interface RequirementItemProps {
  requirement: any // TODO: Add proper type
}

export function RequirementItem({ requirement }: RequirementItemProps) {
  // TODO: Implement delete functionality
  // TODO: Add confirmation dialog

  const handleDelete = async () => {
    // TODO: Implement delete logic
  }

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">{requirement.priority || 'Medium'}</Badge>
          </div>
          <p className="text-sm">{requirement.description}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={handleDelete}>
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    </Card>
  )
}

