import Link from "next/link"
import { Home, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary mb-4">
              <Home className="h-6 w-6" />
              ImóvelPro
            </Link>
            <p className="text-muted-foreground text-sm">
              Sua plataforma completa para encontrar o imóvel perfeito. Conectamos pessoas aos seus sonhos imobiliários.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/imoveis" className="text-muted-foreground hover:text-primary transition-colors">
                  Imóveis
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-muted-foreground hover:text-primary transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-muted-foreground hover:text-primary transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Tipos de Imóveis</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/imoveis?tipo=casa" className="text-muted-foreground hover:text-primary transition-colors">
                  Casas
                </Link>
              </li>
              <li>
                <Link
                  href="/imoveis?tipo=apartamento"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Apartamentos
                </Link>
              </li>
              <li>
                <Link
                  href="/imoveis?tipo=terreno"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terrenos
                </Link>
              </li>
              <li>
                <Link
                  href="/imoveis?tipo=comercial"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Comerciais
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Contato</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                (11) 9999-9999
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                contato@imovelpro.com
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                São Paulo, SP
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 ImóvelPro. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
