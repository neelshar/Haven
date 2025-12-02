import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

const VALID_PRIORITIES = ['critical', 'high', 'medium', 'low'] as const

// GET /api/requirements?projectId=X - List requirements by project
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()

    const searchParams = request.nextUrl.searchParams
    const projectId = searchParams.get('projectId')

    if (!projectId) {
      return NextResponse.json({
        "error": "Bad Request",
        "code": "ERROR_400",
        "details": {
          "message": "Project ID is required"
        }
      }, {status: 400})
    }

    // TODO: Get user from session
    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextRequest.json({
        error: "Unauthorized",
        code: "ERROR_401",
        details: { message: "User must be authenticated" }
    }, { status: 401 })
    }

    // TODO: Verify user owns project
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("owner_id")
      .eq("id", projectId)
      .single()

    if (projectError || !project) {
      return NextResponse.json({
        error: "Project not found",
        code: "ERROR_404",
        details: { message: "No project exists with id '${projectId}'" }
    },{ status: 404 })
    }

    if (project.owner_id !== user.id) {
      return NextResponse.json({
        error: "Forbidden",
        code: "ERROR_403",
        details: { message: "You do not have permission to view this project's requirements" }
    }, { status: 403 })
    }

    // TODO: Query requirements from database
    const { data: requirements, error: reqError } = await supabase
      .from("requirements")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: true })

    if (reqError) {
      return NextResponse.json({
        error: "Failed to fetch requirements",
        code: "ERROR_500",
        details: { message: "Database query failed" }
    }, { status: 500 })
    }

    // TODO: Return requirements
    return NextResponse.json({ 
      requirements,
      count: requirements?.length ?? 0 
    }, {status: 200})

  } catch (error) {
    console.error('Error fetching requirements:', error)
    return NextResponse.json(
      { error: 'Failed to fetch requirements' },
      { status: 500 }
    )
  }
}

// POST /api/requirements - Create requirement
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    // TODO: Get user from session
    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ 
        "error": "Unauthorized",
        "code": "ERROR_401",
        "details": {
          "message": "User must be authenticated to create requirements"
        }
      }, {status: 401})
    }

    // TODO: Parse request body
    let body
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({
        "error": "Bad Request",
        "code": "ERROR_400",
        "details": {
          "message": "Invalid JSON body"
        }
      }, {status: 400})
    }

    const { projectId, title, description, priority } = body

    // TODO: Validate input
    if (!projectId || !title || !priority) {
      return NextResponse.json({
        "error": "Bad Request",
        "code": "ERROR_400",
        "details": {
          "message": "Missing required fields: projectId, title, priority"
        }
      }, {status: 400})
    }

    if (!VALID_PRIORITIES.includes(priority)) { 
      return NextResponse.json({
        "error": "Bad Request",
        "code": "ERROR_400",
        "details": {
          "message": "Invalid priority: must be one of " + VALID_PRIORITIES.join(', ')
        }
      }, {status: 400})
    }

    // TODO: Verify user owns project
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("owner_id")
      .eq("id", projectId)
      .single()

    if (projectError || !project) {
      return NextResponse.json({
        "error": "Not Found",
        "code": "ERROR_404",
        "details": {
          "message": "No project exists with id '${projectId}'"
        }
      }, {status: 404})
    }

    if (project.owner_id !== user.id) { 
      return NextResponse.json({
        "error": "Forbidden",
        "code": "ERROR_403",
        "details": {
          "message": "User does not have permission to create requirements for this project"
        }
      }, {status: 403})
    }
    
    // TODO: Create requirement in database
    const { data: requirement, error: insertError } = await supabase
      .from("requirements")
      .insert({
        project_id: projectId,
        title,
        description: description || "",
        priority
      })
      .select()
      .single()

    if (insertError) {
      return NextResponse.json({
        error: "Failed to create requirement",
        code: "ERROR_500",
        details: { message: "Database insert failed" }
    }, { status: 500 })
    }

    // TODO: Return created requirement
    return NextResponse.json({ requirement }, { status: 201 })

  } catch (error) {
    console.error('Error creating requirement:', error)
    return NextResponse.json(
      { error: 'Failed to create requirement' },
      { status: 500 }
    )
  }
}

