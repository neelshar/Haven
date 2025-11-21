'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface RequirementBreakdownProps {
  projectId: string
}

export function RequirementBreakdown({ projectId }: RequirementBreakdownProps) {
  // TODO: Fetch breakdown data
  // TODO: Display requirement-by-requirement analysis
  // TODO: Show met/partial/not met indicators

  const requirements: any[] = []

  return (
    <Card>
      <CardHeader>
        <CardTitle>Requirement Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {requirements.map((requirement, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{requirement.priority}</Badge>
                  <span className="text-left">{requirement.description}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {/* TODO: Display product-by-product analysis for this requirement */}
                <div className="space-y-2 text-sm">
                  {/* Product analysis goes here */}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}

