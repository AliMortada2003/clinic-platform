
import AboutSection from "../../sections/AboutSection";
import ServicesSection from "../../sections/ServicesSection";
import AdviceSection from "../../sections/AdviceSection";
import FAQ from "../../sections/FAQSection";
import ContactSection from "../../sections/ContactSection";
import HeroSection from "../../sections/Hero";

// ✅ استيراد الشات بوت الجديد

const HomePage = () => {
    return (
        <div className="relative overflow-x-hidden transition-colors duration-300">
            <main>
                <HeroSection />
                <AboutSection />
                <ServicesSection />
                <AdviceSection />
                <FAQ />
                <ContactSection />
            </main>
        </div>
    );
};

export default HomePage;