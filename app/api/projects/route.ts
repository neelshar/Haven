import { NextRequest, NextResponse } from 'next/server'

// GET /api/projects - List user's projects
export async function GET(request: NextRequest) {
  try {
    // TODO: Get user from session
    // TODO: Query projects from database
    // TODO: Return projects

    return NextResponse.json({
      projects: [],
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// POST /api/projects - Create new project
export async function POST(request: NextRequest) {
  try {
    // TODO: Get user from session
    // TODO: Parse request body
    // TODO: Validate input
    // TODO: Create project in database
    // TODO: Return created project

    const body = await request.json()

    return NextResponse.json({
      project: {},
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}

