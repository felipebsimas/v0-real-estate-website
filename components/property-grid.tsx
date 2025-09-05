import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Bed, Bath, Car, Square } from "lucide-react"

interface Property {
  id: string
  titulo: string
  preco: number
  tipo: string
  cidade: string
  estado: string
  area_total?: number
  quartos?: number
  banheiros?: number
  vagas_garagem?: number
  imagens?: string[]
}

interface PropertyGridProps {
  properties: Property[]
}

export function PropertyGrid({ properties }: PropertyGridProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">Nenhum imóvel encontrado com os filtros selecionados.</p>
        <p className="text-muted-foreground">Tente ajustar os filtros ou remover algumas opções.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {properties.map((property) => (
        <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="aspect-video bg-muted relative">
            {property.imagens && property.imagens.length > 0 ? (
              <img
                src={property.imagens[0] || "/placeholder.svg"}
                alt={property.titulo}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="text-muted-foreground">Sem imagem</span>
              </div>
            )}
            <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">{property.tipo}</Badge>
          </div>

          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">{property.titulo}</h3>

            <div className="flex items-center text-muted-foreground mb-3">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">
                {property.cidade}, {property.estado}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              {property.area_total && (
                <div className="flex items-center gap-1">
                  <Square className="h-4 w-4" />
                  <span>{property.area_total}m²</span>
                </div>
              )}
              {property.quartos && (
                <div className="flex items-center gap-1">
                  <Bed className="h-4 w-4" />
                  <span>{property.quartos}</span>
                </div>
              )}
              {property.banheiros && (
                <div className="flex items-center gap-1">
                  <Bath className="h-4 w-4" />
                  <span>{property.banheiros}</span>
                </div>
              )}
              {property.vagas_garagem && (
                <div className="flex items-center gap-1">
                  <Car className="h-4 w-4" />
                  <span>{property.vagas_garagem}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary">{formatPrice(property.preco)}</span>
              <Button size="sm" asChild>
                <Link href={`/imoveis/${property.id}`}>Ver Detalhes</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
