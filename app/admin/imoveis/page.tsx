import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { AdminHeader } from "@/components/admin-header"
import { PropertyActions } from "@/components/property-actions"
import { Plus, Building, Eye, Edit } from "lucide-react"

export default async function AdminImoveisPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get user's properties
  const { data: properties } = await supabase
    .from("imoveis")
    .select("*")
    .eq("usuario_id", data.user.id)
    .order("created_at", { ascending: false })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-green-100 text-green-800"
      case "vendido":
        return "bg-blue-100 text-blue-800"
      case "inativo":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Meus Imóveis</h1>
            <p className="text-muted-foreground">{properties?.length || 0} imóveis cadastrados</p>
          </div>
          <Button asChild>
            <Link href="/admin/imoveis/novo">
              <Plus className="h-4 w-4 mr-2" />
              Novo Imóvel
            </Link>
          </Button>
        </div>

        {properties && properties.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {properties.map((property) => (
              <Card key={property.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-48 h-32 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      {property.imagens && property.imagens.length > 0 ? (
                        <img
                          src={property.imagens[0] || "/placeholder.svg"}
                          alt={property.titulo}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <Building className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold text-foreground line-clamp-2">{property.titulo}</h3>
                        <div className="flex items-center gap-2 ml-4">
                          <Badge className={getStatusColor(property.status)}>{property.status}</Badge>
                          {property.destaque && <Badge variant="secondary">Destaque</Badge>}
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-3 line-clamp-2">{property.descricao}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Tipo:</span>
                          <p className="font-medium capitalize">{property.tipo}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Localização:</span>
                          <p className="font-medium">
                            {property.cidade}, {property.estado}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Área:</span>
                          <p className="font-medium">{property.area_total}m²</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Preço:</span>
                          <p className="font-bold text-primary">{formatPrice(property.preco)}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/imoveis/${property.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            Visualizar
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/admin/imoveis/${property.id}/editar`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </Link>
                        </Button>
                        <PropertyActions propertyId={property.id} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum imóvel cadastrado</h3>
              <p className="text-muted-foreground mb-4">Comece adicionando seu primeiro imóvel ao sistema.</p>
              <Button asChild>
                <Link href="/admin/imoveis/novo">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Primeiro Imóvel
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
