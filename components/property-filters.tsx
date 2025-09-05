"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"

export function PropertyFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState({
    cidade: searchParams.get("cidade") || "",
    tipo: searchParams.get("tipo") || "Todos",
    precoMin: searchParams.get("precoMin") || "",
    precoMax: searchParams.get("precoMax") || "",
  })

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const applyFilters = () => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    router.push(`/imoveis?${params.toString()}`)
  }

  const clearFilters = () => {
    setFilters({
      cidade: "",
      tipo: "Todos",
      precoMin: "",
      precoMax: "",
    })
    router.push("/imoveis")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filtros
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="cidade">Cidade</Label>
          <Input
            id="cidade"
            placeholder="Digite a cidade"
            value={filters.cidade}
            onChange={(e) => handleFilterChange("cidade", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="tipo">Tipo de Imóvel</Label>
          <Select value={filters.tipo} onValueChange={(value) => handleFilterChange("tipo", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todos</SelectItem>
              <SelectItem value="casa">Casa</SelectItem>
              <SelectItem value="apartamento">Apartamento</SelectItem>
              <SelectItem value="terreno">Terreno</SelectItem>
              <SelectItem value="comercial">Comercial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="precoMin">Preço Mínimo</Label>
          <Input
            id="precoMin"
            type="number"
            placeholder="R$ 0"
            value={filters.precoMin}
            onChange={(e) => handleFilterChange("precoMin", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="precoMax">Preço Máximo</Label>
          <Input
            id="precoMax"
            type="number"
            placeholder="R$ 999.999"
            value={filters.precoMax}
            onChange={(e) => handleFilterChange("precoMax", e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={applyFilters} className="flex-1">
            Aplicar
          </Button>
          <Button onClick={clearFilters} variant="outline" className="flex-1 bg-transparent">
            Limpar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
