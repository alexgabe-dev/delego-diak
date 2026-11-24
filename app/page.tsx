import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { SearchSection } from '@/components/search-section'
import { FeaturedJobsSection } from '@/components/featured-jobs-section'
import { WhyDelegoSection } from '@/components/why-delego-section'
import { StatsSection } from '@/components/stats-section'
import { ForCompaniesSection } from '@/components/for-companies-section'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <SearchSection />
        <FeaturedJobsSection />
        <WhyDelegoSection />
        <ForCompaniesSection />
        <StatsSection />
      </main>
      <Footer />
    </div>
  )
}
