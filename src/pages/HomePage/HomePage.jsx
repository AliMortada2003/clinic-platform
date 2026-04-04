import AboutSection from "../../sections/AboutSection";
import AdviceSection from "../../sections/AdviceSection";
import ContactSection from "../../sections/ContactSection";
import FAQ from "../../sections/FAQSection";
import Footer from "../../sections/FooterSection";
import Hero from "../../sections/Hero";
import ServicesSection from "../../sections/ServicesSection";
import WorkingHours from "../../sections/WorkingHours";
import BookingSystem from "../../sections/BookingSystem";
import Header from "../../components/layout/Navbar";
const HomePage = () =>
    <div className="">
        <Header />
        <Hero />
        <AboutSection />
        <ServicesSection />
        {/* <WorkingHours /> */}
        {/* <BookingSystem /> */}
        <AdviceSection />
        <FAQ />
        <ContactSection />
        <Footer/>
    </div>;
export default HomePage;
