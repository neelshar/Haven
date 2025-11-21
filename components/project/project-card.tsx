'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

interface ProjectCardProps {
  project: any // TODO: Add proper type
}

export function ProjectCard({ project }: ProjectCardProps) {
  // TODO: Format dates
  // TODO: Add click handler
  // TODO: Add hover effects

  return (
    <Link href={`/project/${project.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-xl">{project.name || 'Untitled Project'}</CardTitle>
            <Badge variant="secondary">Active</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description || 'No description'}
          </p>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          <div className="flex w-full justify-between">
            <span>0 products</span>
            <span>0 requirements</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

