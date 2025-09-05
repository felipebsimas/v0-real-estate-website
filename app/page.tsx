import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import { SearchSection } from "@/components/search-section"
import { FeaturedProperties } from "@/components/featured-properties"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default async function HomePage() {
  const supabase = await createClient()

  // Get featured properties
  const { data: featuredProperties } = await supabase
    .from("imoveis")
    .select("*")
    .eq("status", "ativo")
    .eq("destaque", true)
    .limit(6)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <SearchSection />
        <Suspense fallback={<div className="h-96 bg-muted animate-pulse" />}>
          <FeaturedProperties properties={featuredProperties || []} />
        </Suspense>
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  )
}
