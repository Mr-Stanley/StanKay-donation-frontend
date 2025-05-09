import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Slider from '../../components/Slider'
import Body from '../../components/Body'
import HeroSection from '../../components/HeroSection'
import VolunteerSection from '../../components/VolunteerSection'
import FooterSection from '../../components/FooterSection'
import AboutSection from '../../components/AboutSection'
import HowCanYouHelpSection from '../../components/HowCanYouHelpSection'
import '../index.css';


function HomePage() {
  return (
    <div className="min-h-screen   flex flex-col bg-white ">
      <Header />
      <main className="bg-black flex-grow  py-12">
       
        <Slider />
        <Body />
        <HeroSection />
        <div className="flex bg-black items-center animate__animated animate__fadeInUp">
    
    
      </div>
        <VolunteerSection />
        <HowCanYouHelpSection />
        <AboutSection />
       

      </main>
      <div className="flex justify-center mb-8 ">
        <FooterSection />
        </div>
      <Footer />
    </div>
  )
}
export default HomePage;