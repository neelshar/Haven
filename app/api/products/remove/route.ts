import { NextRequest, NextResponse } from 'next/server'

// DELETE /api/products/remove - Remove product from project
export async function DELETE(request: NextRequest) {
  try {
    // TODO: Get user from session
    // TODO: Parse request body (projectId, productId)
    // TODO: Verify user owns project
    // TODO: Remove from project_products table
    // TODO: Return success

    const body = await request.json()

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error('Error removing product:', error)
    return NextResponse.json(
      { error: 'Failed to remove product' },
      { status: 500 }
    )
  }
}

