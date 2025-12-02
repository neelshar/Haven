import { describe, it, expect, vi, beforeEach } from 'vitest'
import { formatDate, truncateText } from '@/lib/utils'
import { NextRequest } from 'next/server'

// Import handlers
import { GET, POST } from '@/app/api/requirements/route'
import { PUT, DELETE as DEL } from '@/app/api/requirements/[id]/route'

// Mock auth()
vi.mock('@/auth', () => ({
    auth: vi.fn(),
}))

// Mock Supabase server client
vi.mock('@/lib/supabase/server', () => ({
    createClient: vi.fn(),
}))

import { auth } from '@/auth'
import { createClient } from '@/lib/supabase/server'

// Helper func to mock NextRequest
function mockReq(url: string, method: string, body?: any) {
    return new NextRequest(new Request(url, {
        method,
        body: body ? JSON.stringify(body) : undefined
    }))
}

beforeEach(() => {
    vi.clearAllMocks()
})

describe('API Requirements', () => {

    // GET /api/requirements
    describe('GET /api/requirements', () => {
        it('returns 400 if missing projectId', async () => {
            const req = mockReq('http://localhost/api/requirements', 'GET')

            const res = await GET(req)
            const json = await res.json()

            expect(res.status).toBe(400)
            expect(json.code).toBe('ERROR_400')
        })

        it('returns 401 if user is not authenticated', async () => {
            ;(auth as any).mockResolvedValue(null)

            const req = mockReq('http://localhost/api/requirements?projectId=p1', 'GET')

            const res = await GET(req)
            const json = await res.json()

            expect(res.status).toBe(401)
            expect(json.code).toBe('ERROR_401')
        })

        it('returns 403 if user does not own project', async () => {
            ;(auth as any).mockResolvedValue({ user: { id: 'u1' } })

            const supabaseMock = {
                from: vi.fn().mockReturnThis(),
                select: vi.fn().mockReturnThis(),
                single: vi.fn().mockResolvedValue({
                    data: { id: 'p1', owner_id: 'not-u1' },
                    error: null,
                }),
            }

            ;(createClient as any).mockReturnValue(supabaseMock)

            const req = mockReq('http://localhost/api/requirements?projectId=p1', 'GET')

            const res = await GET(req)
            const json = await res.json()
      
            expect(res.status).toBe(403)
            expect(json.code).toBe('ERROR_403')
        })

        it('returns requirements if authorized', async () => {
            ;(auth as any).mockResolvedValue({ user: { id: 'u1' } })
      
            const supabaseMock = {
              from: vi.fn().mockReturnThis(),
              select: vi.fn().mockReturnThis(),
              eq: vi.fn().mockReturnThis(),
              order: vi.fn().mockReturnThis(),
              single: vi.fn()
                .mockResolvedValueOnce({ data: { id: 'p1', owner_id: 'u1' }, error: null }), // project lookup
            }
      
            // Requirements query result
            supabaseMock.from().select().eq().order = vi.fn().mockResolvedValue({
              data: [{ id: 'r1', title: 'Req A' }],
              error: null,
            })
      
            ;(createClient as any).mockReturnValue(supabaseMock)
      
            const req = mockReq('http://localhost/api/requirements?projectId=p1', 'GET')
      
            const res = await GET(req)
            const json = await res.json()
      
            expect(res.status).toBe(200)
            expect(json.requirements.length).toBe(1)
            expect(json.requirements[0].id).toBe('r1')
        })

        it('returns 500 if project lookup fails', async () => {
            ;(auth as any).mockResolvedValue({ user: { id: 'u1' } })
          
            const supabaseMock = {
                from: vi.fn().mockReturnThis(),
                select: vi.fn().mockReturnThis(),
                eq: vi.fn().mockReturnThis(),
                single: vi.fn().mockResolvedValue({
                    data: null,
                    error: { message: 'DB error' }
                })
            }
          
            ;(createClient as any).mockReturnValue(supabaseMock)
          
            const req = mockReq('http://localhost/api/requirements?projectId=p1', 'GET')
          
            const res = await GET(req)
            const json = await res.json()
          
            expect(res.status).toBe(500)
            expect(json.code).toBe('ERROR_500')
        })

        it('returns 500 if requirements query fails', async () => {
            ;(auth as any).mockResolvedValue({ user: { id: 'u1' } })
          
            const supabaseMock = {
                from: vi.fn().mockReturnThis(),
                select: vi.fn().mockReturnThis(),
                eq: vi.fn().mockReturnThis(),
                single: vi
                    .fn()
                    .mockResolvedValueOnce({ data: { owner_id: 'u1' }, error: null }), // project ok
                order: vi.fn().mockResolvedValue({
                    data: null,
                    error: { message: 'Query failed' }
                })
            }
          
            ;(createClient as any).mockReturnValue(supabaseMock)
          
            const req = mockReq('http://localhost/api/requirements?projectId=p1', 'GET')
          
            const res = await GET(req)
            const json = await res.json()
          
            expect(res.status).toBe(500)
            expect(json.code).toBe('ERROR_500')
        })
    })

    // POST /api/requirements
    describe('POST /api/requirements', () => {
        it('returns 400 if invalid body', async () => {
            ;(auth as any).mockResolvedValue({ user: { id: 'u1' } })
    
            const req = mockReq('http://localhost/api/requirements', 'POST', {
                projectId: 'p1',
                title: '', // invalid
                priority: 'critical',
            })
    
            const res = await POST(req)
            const json = await res.json()
    
            expect(res.status).toBe(400)
            expect(json.code).toBe('ERROR_400')
        })
    
        it('creates requirement', async () => {
            ;(auth as any).mockResolvedValue({ user: { id: 'u1' } })
    
            const supabaseMock = {
                from: vi.fn().mockReturnThis(),
                select: vi.fn().mockReturnThis(),
                single: vi
                    .fn()
                    // project lookup
                    .mockResolvedValueOnce({ data: { id: 'p1', owner_id: 'u1' }, error: null })
                    // return newly created requirement
                    .mockResolvedValue({
                        data: { id: 'r1', title: 'New Requirement' },
                        error: null,
                    }),
                insert: vi.fn().mockReturnThis(),
            }
    
            ;(createClient as any).mockReturnValue(supabaseMock)
    
            const req = mockReq('http://localhost/api/requirements', 'POST', {
                projectId: 'p1',
                title: 'New Requirement',
                priority: 'high',
            })
    
            const res = await POST(req)
            const json = await res.json()
    
            expect(res.status).toBe(201)
            expect(json.requirement.id).toBe('r1')
        })

        it('returns 401 if auth() throws', async () => {
            ;(auth as any).mockRejectedValue(new Error('Auth error'))
          
            const req = mockReq('http://localhost/api/requirements', 'POST', {
                projectId: 'p1',
                title: 'Req',
                priority: 'high'
            })
          
            const res = await POST(req)
            const json = await res.json()
          
            expect(res.status).toBe(401)
            expect(json.code).toBe('ERROR_401')
        })

        it('returns 400 if priority is invalid', async () => {
            ;(auth as any).mockResolvedValue({ user: { id: 'u1' } })
          
            const req = mockReq('http://localhost/api/requirements', 'POST', {
                projectId: 'p1',
                title: 'Req',
                priority: 'invalid-priority'
            })
          
            const res = await POST(req)
            const json = await res.json()
          
            expect(res.status).toBe(400)
            expect(json.code).toBe('ERROR_400')
        })

        it('returns 500 if project lookup throws DB error', async () => {
            ;(auth as any).mockResolvedValue({ user: { id: 'u1' } })
          
            const supabaseMock = {
                from: vi.fn().mockReturnThis(),
                select: vi.fn().mockReturnThis(),
                single: vi.fn().mockResolvedValue({
                    data: null,
                    error: { message: 'Database crash' }
                })
            }
          
            ;(createClient as any).mockReturnValue(supabaseMock)
          
            const req = mockReq('http://localhost/api/requirements', 'POST', {
                projectId: 'p1',
                title: 'Req',
                priority: 'high'
            })
          
            const res = await POST(req)
            const json = await res.json()
          
            expect(res.status).toBe(500)
            expect(json.code).toBe('ERROR_500')
        })

        it('returns 500 if insert() fails', async () => {
            ;(auth as any).mockResolvedValue({ user: { id: 'u1' } })
          
            const supabaseMock = {
                from: vi.fn().mockReturnThis(),
                select: vi.fn().mockReturnThis(),
                single: vi.fn()
                    .mockResolvedValueOnce({ data: { owner_id: 'u1' }, error: null }), // project ok
                insert: vi.fn().mockReturnThis(),
                eq: vi.fn().mockReturnThis(),
                // fail insert
                select: vi.fn().mockReturnThis(),
                single: vi.fn().mockResolvedValue({
                    data: null,
                    error: { message: 'Insert error' }
                })
            }
          
            ;(createClient as any).mockReturnValue(supabaseMock)
          
            const req = mockReq('http://localhost/api/requirements', 'POST', {
                projectId: 'p1',
                title: 'Req',
                priority: 'high'
            })
          
            const res = await POST(req)
            const json = await res.json()
          
            expect(res.status).toBe(500)
            expect(json.code).toBe('ERROR_500')
        })
    })

    // PUT /api/requirements
    describe('PUT /api/requirements/:id', () => {
        it('updates requirement successfully', async () => {
            ;(auth as any).mockResolvedValue({ user: { id: 'u1' } })
        
            const supabaseMock = {
                from: vi.fn().mockReturnThis(),
                select: vi.fn().mockReturnThis(),
                single: vi
                    .fn()
                    // fetch requirement
                    .mockResolvedValueOnce({
                        data: { id: 'r1', project_id: 'p1' },
                        error: null,
                    })
                    // fetch project
                    .mockResolvedValueOnce({
                        data: { id: 'p1', owner_id: 'u1' },
                        error: null,
                    })
                    // updated requirement result
                    .mockResolvedValue({
                        data: { id: 'r1', title: 'Updated Title' },
                        error: null,
                    }),
                update: vi.fn().mockReturnThis(),
                eq: vi.fn().mockReturnThis(),
            }
        
            ;(createClient as any).mockReturnValue(supabaseMock)
        
            const req = mockReq('http://localhost/api/requirements/r1', 'PUT', {
                title: 'Updated Title',
                priority: 'low',
            })
        
            const res = await PUT(req, { params: { id: 'r1' } })
            const json = await res.json()
        
            expect(res.status).toBe(200)
            expect(json.requirement.title).toBe('Updated Title')
        })

        it('returns 404 if requirement not found', async () => {
            ;(auth as any).mockResolvedValue({ user: { id: 'u1' } })
          
            const supabaseMock = {
                from: vi.fn().mockReturnThis(),
                select: vi.fn().mockReturnThis(),
                single: vi.fn().mockResolvedValue({
                    data: null,
                    error: { message: 'Missing requirement' }
                })
            }
          
            ;(createClient as any).mockReturnValue(supabaseMock)
          
            const req = mockReq('http://localhost/api/requirements/r1', 'PUT', {
                title: 'New Title'
            })
          
            const res = await PUT(req, { params: { id: 'r1' } })
            const json = await res.json()
          
            expect(res.status).toBe(404)
            expect(json.code).toBe('ERROR_404')
        })

        it('returns 400 if no updatable fields provided', async () => {
            ;(auth as any).mockResolvedValue({ user: { id: 'u1' } })
          
            // mock requirement + project
            const supabaseMock = {
                from: vi.fn().mockReturnThis(),
                select: vi.fn().mockReturnThis(),
                single: vi
                    .fn()
                    .mockResolvedValueOnce({ data: { project_id: 'p1' }, error: null })
                    .mockResolvedValueOnce({ data: { owner_id: 'u1' }, error: null })
            }
          
            ;(createClient as any).mockReturnValue(supabaseMock)
          
            const req = mockReq('http://localhost/api/requirements/r1', 'PUT', {})
          
            const res = await PUT(req, { params: { id: 'r1' } })
            const json = await res.json()
          
            expect(res.status).toBe(400)
            expect(json.code).toBe('ERROR_400')
        })

        it('returns 500 if update fails', async () => {
            ;(auth as any).mockResolvedValue({ user: { id: 'u1' } })
          
            const supabaseMock = {
                from: vi.fn().mockReturnThis(),
                select: vi.fn().mockReturnThis(),
                update: vi.fn().mockReturnThis(),
                eq: vi.fn().mockReturnThis(),
                single: vi
                    .fn()
                    // requirement
                    .mockResolvedValueOnce({ data: { project_id: 'p1' }, error: null })
                    // project
                    .mockResolvedValueOnce({ data: { owner_id: 'u1' }, error: null })
                    // update fails
                    .mockResolvedValue({
                        data: null,
                        error: { message: 'Update failed' }
                    })
            }
          
            ;(createClient as any).mockReturnValue(supabaseMock)
          
            const req = mockReq('http://localhost/api/requirements/r1', 'PUT', {
                title: 'New Title'
            })
          
            const res = await PUT(req, { params: { id: 'r1' } })
            const json = await res.json()
          
            expect(res.status).toBe(500)
            expect(json.code).toBe('ERROR_500')
        })
    })

    // DELETE /api/requirements
    describe('DELETE /api/requirements/:id', () => {
        it('deletes requirement successfully', async () => {
            ;(auth as any).mockResolvedValue({ user: { id: 'u1' } })
    
            const supabaseMock = {
                from: vi.fn().mockReturnThis(),
                select: vi.fn().mockReturnThis(),
                single: vi
                    .fn()
                    // fetch requirement
                    .mockResolvedValueOnce({
                        data: { id: 'r1', project_id: 'p1' },
                        error: null,
                    })
                    // fetch project
                    .mockResolvedValueOnce({
                        data: { id: 'p1', owner_id: 'u1' },
                        error: null,
                    }),
                delete: vi.fn().mockReturnThis(),
                eq: vi.fn().mockReturnThis(),
            }
        
            ;(createClient as any).mockReturnValue(supabaseMock)
        
            const req = mockReq('http://localhost/api/requirements/r1', 'DELETE')
    
            const res = await DEL(req, { params: { id: 'r1' } })
            const json = await res.json()
        
            expect(res.status).toBe(200)
            expect(json.success).toBe(true)
        })

        it('returns 404 if requirement does not exist', async () => {
            ;(auth as any).mockResolvedValue({ user: { id: 'u1' } })
          
            const supabaseMock = {
                from: vi.fn().mockReturnThis(),
                select: vi.fn().mockReturnThis(),
                single: vi.fn().mockResolvedValue({
                    data: null,
                    error: { message: 'no row found' }
                })
            }
          
            ;(createClient as any).mockReturnValue(supabaseMock)
          
            const req = mockReq('http://localhost/api/requirements/r1', 'DELETE')
          
            const res = await DEL(req, { params: { id: 'r1' } })
            const json = await res.json()
          
            expect(res.status).toBe(404)
            expect(json.code).toBe('ERROR_404')
        })

        it('returns 403 if user does not own the project', async () => {
            ;(auth as any).mockResolvedValue({ user: { id: 'u1' } })
          
            const supabaseMock = {
                from: vi.fn().mockReturnThis(),
                select: vi.fn().mockReturnThis(),
                single: vi
                    .fn()
                    .mockResolvedValueOnce({ data: { project_id: 'p1' }, error: null })
                    .mockResolvedValueOnce({ data: { owner_id: 'other-user' }, error: null })
            }
          
            ;(createClient as any).mockReturnValue(supabaseMock)
          
            const req = mockReq('http://localhost/api/requirements/r1', 'DELETE')
          
            const res = await DEL(req, { params: { id: 'r1' } })
            const json = await res.json()
          
            expect(res.status).toBe(403)
            expect(json.code).toBe('ERROR_403')
        })

        it('returns 500 if deletion fails', async () => {
            ;(auth as any).mockResolvedValue({ user: { id: 'u1' } })
          
            const supabaseMock = {
                from: vi.fn().mockReturnThis(),
                select: vi.fn().mockReturnThis(),
                delete: vi.fn().mockReturnThis(),
                eq: vi.fn().mockReturnThis(),
                single: vi
                    .fn()
                    // requirement ok
                    .mockResolvedValueOnce({ data: { project_id: 'p1' }, error: null })
                    // project ok
                    .mockResolvedValueOnce({ data: { owner_id: 'u1' }, error: null }),
                // delete error
                delete: vi.fn().mockReturnThis(),
                eq: vi.fn().mockReturnThis(),
                error: { message: 'Delete failed' }
            }
          
            supabaseMock.delete = vi.fn().mockReturnValue({
                error: { message: 'Delete failed' }
            })
          
            ;(createClient as any).mockReturnValue(supabaseMock)
          
            const req = mockReq('http://localhost/api/requirements/r1', 'DELETE')
          
            const res = await DEL(req, { params: { id: 'r1' } })
            const json = await res.json()
          
            expect(res.status).toBe(500)
            expect(json.code).toBe('ERROR_500')
        })
    })
})

