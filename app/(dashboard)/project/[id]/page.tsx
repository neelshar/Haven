import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RequirementList } from '@/components/project/requirement-list'
import { ProductList } from '@/components/product/product-list'
import { ComparisonReport } from '@/components/comparison/comparison-report'

interface ProjectPageProps {
  params: {
    id: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <div className="container py-8">
      {/* TODO: Fetch and display project data */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Project Name</h1>
        <p className="text-muted-foreground">Project description goes here</p>
      </div>

      <Tabs defaultValue="requirements" className="w-full">
        <TabsList>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="requirements">
          <RequirementList projectId={params.id} />
        </TabsContent>

        <TabsContent value="products">
          <ProductList projectId={params.id} />
        </TabsContent>

        <TabsContent value="comparison">
          <ComparisonReport projectId={params.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

