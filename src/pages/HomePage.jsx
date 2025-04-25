import Header from '../components/Header'
import Footer from '../components/Footer'
import Slider from '../components/Slider'
import Body from '../components/Body'
import HeroSection from '../components/HeroSection'
import VolunteerSection from '../components/VolunteerSection'
import FooterSection from '../components/FooterSection'
import AboutSection from '../components/AboutSection'
import HowCanYouHelpSection from '../components/HowCanYouHelpSection'
import { Link } from 'react-router-dom';
// import { useAuth } from '../AuthContext'
import '../index.css';


function HomePage() {
  return (
    <div className="min-h-screen bg-black  flex flex-col bg-white ">
      <Header />
      <main className="flex-grow ml-30  mr-30 py-12">
        {/* <section className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4"> Make A Difference Today</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          </p>
        </section> */}
        <Slider />
        <Body />
        <HeroSection />
        <div className="flex items-center animate__animated animate__fadeInUp">
        {/* <Link
          to={user ? "/Donation-Form" : "/LoginPage"} // Navigate to /donate if logged in, else /login
          className="bg-amber-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-amber-600 transition duration-300"
        >
          Donate Now
        </Link> */}
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