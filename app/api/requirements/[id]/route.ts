import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

// PUT /api/requirements/[id] - Update requirement
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const requirementId = params.id

    const supabase = createServerClient()

    // TODO: Get user from session
    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser()

    // Check if user is authenticated
    if (authError || !user) {
      return NextResponse.json({
        error: "Unauthorized",
        code: "ERROR_401",
        details: { message: "User must be authenticated" }
    }, { status: 401 })
    }

    // TODO: Verify user owns requirement
    // Get requirements of project
    const { data: requirement, error: reqFetchError } = await supabase
      .from("requirements")
      .select("id", "project_id")
      .eq("id", requirementId)
      .single()

    // Check if requirement fetch was successful
    if (reqFetchError || !requirement) {
      return NextResponse.json({
        error: "Requirement not found",
        code: "ERROR_404",
        details: { message: "No requirement with id '${requirementId}'" }
    },{ status: 404 })
    }
    
    // Get project from database
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("owner_id")
      .eq("id", requirement.project_id)
      .single()
    
    // Check if project exists in database
    if (projectError || !project) {
      return NextResponse.json({
        error: "Parent project not found",
        code: "ERROR_404",
        details: { message: "Unable to find project for this requirement" }
    }, { status: 404 })
    }

    // PROJECT OWNERSHIP CHECK
    if (project.owner_id !== user.id) {
      return NextResponse.json({
        error: "Forbidden",
        code: "ERROR_403",
        details: { message: "You do not own this requirement" }
    }, { status: 403 })
    }

    // TODO: Parse request body
    const body = await request.json()

    const allowedFields = ["description", "priority"]
    const updateData: Record<string, any> = {}

    for (const field of allowedFields) {
      if (body[field] !== undefined) updateData[field] = body[field]
    }

    // TODO: Validate input
    if (Object.keys(updateData).length == 0) {
      return NextResponse.json({
        error: "No valid fields to update",
        code: "ERROR_400",
        details: { message: "Allowed fields: description, priority" }
      }, { status: 400 })
    }

    // TODO: Update requirement in database
    const { data: updated, error: updateError } = await supabase
      .from("requirements")
      .update(updateData)
      .eq("id", requirementId)
      .select()
      .single()

    // Check if update was successful
    if (updateError) {
      return NextResponse.json({
        error: "Failed to update requirement",
        code: "ERROR_500",
        details: { message: "Database update failed" }
      },{ status: 500 })
    }

    // TODO: Return updated requirement
    return NextResponse.json({
      requirement: updated
    })
  } catch (error) {
    console.error('Error updating requirement:', error)
    return NextResponse.json(
      { error: 'Failed to update requirement' },
      { status: 500 }
    )
  }
}

// DELETE /api/requirements/[id] - Delete requirement
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const requirementId = params.id

    const supabase = createServerClient()

    // TODO: Get user from session
    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser()

    // Check that user is authenticated
    if (authError || !user) {
      return NextResponse({
        error: "Unauthorized",
        code: "ERROR_401",
        details: { message: "User must be authenticated" }
      }, { status: 401 })
    }

    // TODO: Verify user owns requirement
    // Fetch requirement from database
    const { data: requirement, error: reqError } = await supabase
      .from("requirements")
      .select("id, project_id")
      .eq("id", requirementId)
      .single()

    // Check if requirement fetch was successful
    if (reqError || !requirement) {
      return NextResponse.json({
        error: "Requirement not found",
        code: "ERROR_404",
        details: { message: "No requirement with id '${requirementId}'" }
      }, { status: 404 })
    }

    // Fetch project from database
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("owner_id")
      .eq("id", requirement.project_id)
      .single()

    // Check if project fetch was successful
    if (projectError || !project) {
      return NextResponse.json({
        error: "Parent project not found",
        code: "ERROR_404",
        details: { message: "Unable to find project for this requirement" }
      }, { status: 404 })
    }

    // PROJECT OWNERSHIP CHECK
    if (project.owner_id !== user.id) {
      return NextResponse.json({
        error: "Forbidden",
        code: "ERROR_403",
        details: { message: "You do not own this requirement" }
      }, { status: 403 })
    }

    // TODO: Delete requirement from database
    const { error: deleteError } = await supabase
      .from("requirements")
      .delete()
      .eq("id", requirementId)

    // Check if deletion was successful
    if (deleteError) {
      return NextResponse.json({
        error: "Failed to delete requirement",
        code: "ERROR_500",
        details: { message: "Database delete failed" }
      }, { status: 500 })
    }

    // TODO: Return success
    return NextResponse.json({
      success: true
    })
  } catch (error) {
    console.error('Error deleting requirement:', error)
    return NextResponse.json(
      { error: 'Failed to delete requirement' },
      { status: 500 }
    )
  }
}

