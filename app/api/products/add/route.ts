import { NextRequest, NextResponse } from 'next/server'

// POST /api/products/add - Add product to project
export async function POST(request: NextRequest) {
  try {
    // TODO: Get user from session
    // TODO: Parse request body (projectId, productId)
    // TODO: Verify user owns project
    // TODO: Add product to project_products table
    // TODO: Return success

    const body = await request.json()

    return NextResponse.json({
      success: true,
    }, { status: 201 })
  } catch (error) {
    console.error('Error adding product:', error)
    return NextResponse.json(
      { error: 'Failed to add product' },
      { status: 500 }
    )
  }
}

