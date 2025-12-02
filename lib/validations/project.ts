import { z } from 'zod'

// Schema for creating a project
export const createProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(255, 'Project name must be less than 255 characters'),
  description: z.string().max(1000, 'Description must be less than 1000 characters').optional().nullable(),
  status: z.enum(['active', 'archived', 'completed']).default('active').optional(),
})

// Schema for updating a project
export const updateProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(255, 'Project name must be less than 255 characters').optional(),
  description: z.string().max(1000, 'Description must be less than 1000 characters').optional().nullable(),
  status: z.enum(['active', 'archived', 'completed']).optional(),
})

export type CreateProjectInput = z.infer<typeof createProjectSchema>
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>

