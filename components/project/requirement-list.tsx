'use client'

import { RequirementItem } from './requirement-item'
import { AddRequirementDialog } from './add-requirement-dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface RequirementListProps {
  projectId: string
}

export function RequirementList({ projectId }: RequirementListProps) {
  // TODO: Fetch requirements using React Query
  // TODO: Handle loading state
  // TODO: Handle error state
  // TODO: Handle empty state

  const requirements: any[] = []

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Requirements</h2>
        <AddRequirementDialog projectId={projectId}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Requirement
          </Button>
        </AddRequirementDialog>
      </div>

      {requirements.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>No requirements yet</p>
          <p className="text-sm mt-2">Add requirements to start comparing products</p>
        </div>
      ) : (
        <div className="space-y-2">
          {requirements.map((requirement) => (
            <RequirementItem key={requirement.id} requirement={requirement} />
          ))}
        </div>
      )}
    </div>
  )
}

