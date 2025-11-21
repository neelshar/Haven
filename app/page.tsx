import { redirect } from 'next/navigation'
// TODO: Import auth utilities
// import { getServerSession } from '@/lib/auth'

export default async function HomePage() {
  // TODO: Check authentication status
  // const session = await getServerSession()
  
  // TODO: Redirect to login if not authenticated
  // if (!session) {
  //   redirect('/login')
  // }
  
  // TODO: Redirect to dashboard if authenticated
  // redirect('/dashboard')

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Welcome to FadePyra</h1>
        <p className="mt-4 text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}

