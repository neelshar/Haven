import { Header } from '@/components/layout/header'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO: Check authentication
  // const session = await getServerSession()
  // if (!session) {
  //   redirect('/login')
  // }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>{children}</main>
    </div>
  )
}

