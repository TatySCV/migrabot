import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'

import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ServiceSection from './components/ServiceSection'
import HelpSection from './components/HelpSection'

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <HeroSection />
        <AboutSection />
        <ServiceSection />
        <HelpSection />
      </main>

      <Footer />
    </div>
  )
}

export default HomePage