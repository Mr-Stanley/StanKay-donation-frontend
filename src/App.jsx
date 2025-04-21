import Header from './components/Header'
import Footer from './components/Footer'
import Slider from './components/Slider'
import Body from './components/Body'
import HeroSection from './components/HeroSection'
import VolunteerSection from './components/VolunteerSection'
import FooterSection from './components/FooterSection'
import './index.css';


function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Make a Difference Today</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your donation helps us empower communities and create lasting impact. Every contribution counts!
          </p>
        </section>
        <Slider />
        <Body />
        <HeroSection />
        <VolunteerSection />
        <FooterSection />

      </main>
      <Footer />
    </div>
  )
}


export default App;
