"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Save, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface PropertyFormProps {
  userId: string
  property?: any
  isEditing?: boolean
}

export function PropertyForm({ userId, property, isEditing = false }: PropertyFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    titulo: property?.titulo || "",
    descricao: property?.descricao || "",
    preco: property?.preco || "",
    tipo: property?.tipo || "",
    endereco: property?.endereco || "",
    cidade: property?.cidade || "",
    estado: property?.estado || "",
    cep: property?.cep || "",
    area_total: property?.area_total || "",
    area_construida: property?.area_construida || "",
    quartos: property?.quartos || "",
    banheiros: property?.banheiros || "",
    vagas_garagem: property?.vagas_garagem || "",
    status: property?.status || "ativo",
    destaque: property?.destaque || false,
    imagens: property?.imagens?.join("\n") || "",
  })

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const propertyData = {
        titulo: formData.titulo,
        descricao: formData.descricao,
        preco: Number.parseFloat(formData.preco.toString()),
        tipo: formData.tipo,
        endereco: formData.endereco,
        cidade: formData.cidade,
        estado: formData.estado,
        cep: formData.cep,
        area_total: formData.area_total ? Number.parseFloat(formData.area_total.toString()) : null,
        area_construida: formData.area_construida ? Number.parseFloat(formData.area_construida.toString()) : null,
        quartos: formData.quartos ? Number.parseInt(formData.quartos.toString()) : null,
        banheiros: formData.banheiros ? Number.parseInt(formData.banheiros.toString()) : null,
        vagas_garagem: formData.vagas_garagem ? Number.parseInt(formData.vagas_garagem.toString()) : null,
        status: formData.status,
        destaque: formData.destaque,
        imagens: formData.imagens ? formData.imagens.split("\n").filter((url) => url.trim()) : null,
        usuario_id: userId,
      }

      let result
      if (isEditing && property) {
        result = await supabase.from("imoveis").update(propertyData).eq("id", property.id)
      } else {
        result = await supabase.from("imoveis").insert([propertyData])
      }

      if (result.error) throw result.error

      router.push("/admin/imoveis")
    } catch (error: any) {
      setError(error.message || "Erro ao salvar imóvel")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="titulo">Título *</Label>
              <Input
                id="titulo"
                required
                value={formData.titulo}
                onChange={(e) => handleInputChange("titulo", e.target.value)}
                placeholder="Ex: Casa com 3 quartos no centro"
              />
            </div>

            <div>
              <Label htmlFor="preco">Preço *</Label>
              <Input
                id="preco"
                type="number"
                required
                value={formData.preco}
                onChange={(e) => handleInputChange("preco", e.target.value)}
                placeholder="Ex: 350000"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => handleInputChange("descricao", e.target.value)}
              placeholder="Descreva as características do imóvel..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tipo">Tipo *</Label>
              <Select value={formData.tipo} onValueChange={(value) => handleInputChange("tipo", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casa">Casa</SelectItem>
                  <SelectItem value="apartamento">Apartamento</SelectItem>
                  <SelectItem value="terreno">Terreno</SelectItem>
                  <SelectItem value="comercial">Comercial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="vendido">Vendido</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Localização</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="endereco">Endereço *</Label>
            <Input
              id="endereco"
              required
              value={formData.endereco}
              onChange={(e) => handleInputChange("endereco", e.target.value)}
              placeholder="Ex: Rua das Flores, 123"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="cidade">Cidade *</Label>
              <Input
                id="cidade"
                required
                value={formData.cidade}
                onChange={(e) => handleInputChange("cidade", e.target.value)}
                placeholder="Ex: São Paulo"
              />
            </div>

            <div>
              <Label htmlFor="estado">Estado *</Label>
              <Input
                id="estado"
                required
                value={formData.estado}
                onChange={(e) => handleInputChange("estado", e.target.value)}
                placeholder="Ex: SP"
              />
            </div>

            <div>
              <Label htmlFor="cep">CEP</Label>
              <Input
                id="cep"
                value={formData.cep}
                onChange={(e) => handleInputChange("cep", e.target.value)}
                placeholder="Ex: 01234-567"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Características</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="area_total">Área Total (m²)</Label>
              <Input
                id="area_total"
                type="number"
                value={formData.area_total}
                onChange={(e) => handleInputChange("area_total", e.target.value)}
                placeholder="Ex: 200"
              />
            </div>

            <div>
              <Label htmlFor="area_construida">Área Construída (m²)</Label>
              <Input
                id="area_construida"
                type="number"
                value={formData.area_construida}
                onChange={(e) => handleInputChange("area_construida", e.target.value)}
                placeholder="Ex: 150"
              />
            </div>

            <div>
              <Label htmlFor="quartos">Quartos</Label>
              <Input
                id="quartos"
                type="number"
                value={formData.quartos}
                onChange={(e) => handleInputChange("quartos", e.target.value)}
                placeholder="Ex: 3"
              />
            </div>

            <div>
              <Label htmlFor="banheiros">Banheiros</Label>
              <Input
                id="banheiros"
                type="number"
                value={formData.banheiros}
                onChange={(e) => handleInputChange("banheiros", e.target.value)}
                placeholder="Ex: 2"
              />
            </div>

            <div>
              <Label htmlFor="vagas_garagem">Vagas Garagem</Label>
              <Input
                id="vagas_garagem"
                type="number"
                value={formData.vagas_garagem}
                onChange={(e) => handleInputChange("vagas_garagem", e.target.value)}
                placeholder="Ex: 1"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="destaque"
              checked={formData.destaque}
              onCheckedChange={(checked) => handleInputChange("destaque", checked)}
            />
            <Label htmlFor="destaque">Imóvel em destaque</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Imagens</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="imagens">URLs das Imagens (uma por linha)</Label>
            <Textarea
              id="imagens"
              value={formData.imagens}
              onChange={(e) => handleInputChange("imagens", e.target.value)}
              placeholder="https://exemplo.com/imagem1.jpg&#10;https://exemplo.com/imagem2.jpg"
              rows={4}
            />
            <p className="text-sm text-muted-foreground mt-1">Cole as URLs das imagens, uma por linha</p>
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
          {error}
        </div>
      )}

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={isLoading}>
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? "Salvando..." : isEditing ? "Atualizar" : "Salvar"}
        </Button>

        <Button type="button" variant="outline" asChild>
          <Link href="/admin/imoveis">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Link>
        </Button>
      </div>
    </form>
  )
}
