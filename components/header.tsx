"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search, User } from "lucide-react"

export function Header() {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <Home className="h-6 w-6" />
            ImóvelPro
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Início
            </Link>
            <Link href="/imoveis" className="text-foreground hover:text-primary transition-colors">
              Imóveis
            </Link>
            <Link href="/sobre" className="text-foreground hover:text-primary transition-colors">
              Sobre
            </Link>
            <Link href="/contato" className="text-foreground hover:text-primary transition-colors">
              Contato
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/imoveis">
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/auth/login">
                <User className="h-4 w-4 mr-2" />
                Entrar
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
