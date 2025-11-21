'use client'

import { ProjectCard } from './project-card'
import { useQuery } from '@tanstack/react-query'

export function ProjectList() {
  // TODO: Fetch projects using React Query
  // TODO: Handle loading state
  // TODO: Handle error state
  // TODO: Handle empty state

  const projects: any[] = []

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-lg text-muted-foreground">No projects yet</p>
        <p className="text-sm text-muted-foreground mt-2">
          Create your first project to get started
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}

