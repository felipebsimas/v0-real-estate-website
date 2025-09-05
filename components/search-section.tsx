"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Search, MapPin } from "lucide-react"

export function SearchSection() {
  const [cidade, setCidade] = useState("")
  const [tipo, setTipo] = useState("")
  const [precoMin, setPrecoMin] = useState("")
  const [precoMax, setPrecoMax] = useState("")
  const router = useRouter()

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (cidade) params.set("cidade", cidade)
    if (tipo) params.set("tipo", tipo)
    if (precoMin) params.set("precoMin", precoMin)
    if (precoMax) params.set("precoMax", precoMax)

    router.push(`/imoveis?${params.toString()}`)
  }

  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 text-balance">
            Encontre o Imóvel dos Seus Sonhos
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Descubra as melhores oportunidades do mercado imobiliário com nossa plataforma moderna e intuitiva.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Cidade ou região"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={tipo} onValueChange={setTipo}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casa">Casa</SelectItem>
                  <SelectItem value="apartamento">Apartamento</SelectItem>
                  <SelectItem value="terreno">Terreno</SelectItem>
                  <SelectItem value="comercial">Comercial</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Preço mín."
                value={precoMin}
                onChange={(e) => setPrecoMin(e.target.value)}
                type="number"
              />

              <Input
                placeholder="Preço máx."
                value={precoMax}
                onChange={(e) => setPrecoMax(e.target.value)}
                type="number"
              />

              <Button onClick={handleSearch} className="lg:col-span-1">
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
