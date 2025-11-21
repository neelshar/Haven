import { ProjectList } from '@/components/project/project-list'
import { NewProjectDialog } from '@/components/project/new-project-dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Projects</h1>
          <p className="text-muted-foreground">
            Manage your product comparison projects
          </p>
        </div>
        <NewProjectDialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </NewProjectDialog>
      </div>
      <ProjectList />
    </div>
  )
}

