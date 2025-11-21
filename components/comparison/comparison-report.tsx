'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScoreBar } from './score-bar'
import { RequirementBreakdown } from './requirement-breakdown'
import { Sparkles } from 'lucide-react'

interface ComparisonReportProps {
  projectId: string
}

export function ComparisonReport({ projectId }: ComparisonReportProps) {
  // TODO: Fetch comparison data
  // TODO: Handle loading state
  // TODO: Handle error state
  // TODO: Implement generate comparison
  // TODO: Show regenerate button

  const hasComparison = false

  if (!hasComparison) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground mb-4">
          No comparison generated yet
        </p>
        <Button>
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Comparison
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">AI Comparison Report</h2>
        <Button variant="outline">
          <Sparkles className="mr-2 h-4 w-4" />
          Regenerate
        </Button>
      </div>

      {/* TODO: Display comparison data */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Scores</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* TODO: Map over products and show scores */}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          {/* TODO: Display insights */}
        </CardContent>
      </Card>

      <RequirementBreakdown projectId={projectId} />
    </div>
  )
}

