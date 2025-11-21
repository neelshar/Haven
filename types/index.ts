export interface User {
  id: string
  email: string
  fullName?: string
}

export interface Project {
  id: string
  userId: string
  name: string
  description?: string
  status: 'active' | 'archived'
  createdAt: string
  updatedAt: string
}

export interface Requirement {
  id: string
  projectId: string
  description: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  createdAt: string
  updatedAt: string
}

export interface Product {
  id: string
  name: string
  description?: string
  category?: string
  rating?: number
  reviewCount?: number
  websiteUrl?: string
  features?: Record<string, any>
  createdAt: string
  updatedAt: string
}

export interface ProjectProduct {
  id: string
  projectId: string
  productId: string
  aiScore?: number
  aiReasoning?: string
  product?: Product
  createdAt: string
  updatedAt: string
}

export interface ComparisonResult {
  scores: Record<string, number>
  insights: string[]
  breakdown: RequirementBreakdown[]
  recommendation: string
}

export interface RequirementBreakdown {
  requirementId: string
  requirement: string
  priority: string
  productAnalysis: ProductAnalysis[]
}

export interface ProductAnalysis {
  productId: string
  productName: string
  status: 'met' | 'partial' | 'not_met'
  reasoning: string
}

