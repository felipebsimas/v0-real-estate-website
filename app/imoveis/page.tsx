import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PropertyFilters } from "@/components/property-filters"
import { PropertyGrid } from "@/components/property-grid"
import { Card, CardContent } from "@/components/ui/card"

interface SearchParams {
  cidade?: string
  tipo?: string
  precoMin?: string
  precoMax?: string
  page?: string
}

export default async function ImoveisPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const supabase = await createClient()

  // Build query based on search parameters
  let query = supabase.from("imoveis").select("*").eq("status", "ativo").order("created_at", { ascending: false })

  if (params.cidade) {
    query = query.ilike("cidade", `%${params.cidade}%`)
  }

  if (params.tipo) {
    query = query.eq("tipo", params.tipo)
  }

  if (params.precoMin) {
    query = query.gte("preco", Number.parseFloat(params.precoMin))
  }

  if (params.precoMax) {
    query = query.lte("preco", Number.parseFloat(params.precoMax))
  }

  const { data: properties, error } = await query

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Imóveis Disponíveis</h1>
          <p className="text-muted-foreground">{properties?.length || 0} imóveis encontrados</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Suspense
              fallback={
                <Card>
                  <CardContent className="p-4 h-96 bg-muted animate-pulse" />
                </Card>
              }
            >
              <PropertyFilters />
            </Suspense>
          </div>

          <div className="lg:col-span-3">
            <Suspense
              fallback={
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i}>
                      <CardContent className="p-4 h-96 bg-muted animate-pulse" />
                    </Card>
                  ))}
                </div>
              }
            >
              <PropertyGrid properties={properties || []} />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
