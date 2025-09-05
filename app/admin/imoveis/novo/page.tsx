import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminHeader } from "@/components/admin-header"
import { PropertyForm } from "@/components/property-form"

export default async function NovoImovelPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Novo Imóvel</h1>
          <p className="text-muted-foreground">Preencha as informações do imóvel</p>
        </div>

        <PropertyForm userId={data.user.id} />
      </main>
    </div>
  )
}
