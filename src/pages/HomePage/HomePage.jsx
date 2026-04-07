import React from "react";
import Header from "../../components/layout/Navbar";
import Hero from "../../sections/Hero";
import AboutSection from "../../sections/AboutSection";
import ServicesSection from "../../sections/ServicesSection";
import AdviceSection from "../../sections/AdviceSection";
import FAQ from "../../sections/FAQSection";
import ContactSection from "../../sections/ContactSection";
import Footer from "../../sections/FooterSection";
import ChatBot from "../../sections/ChatBot";

// ✅ استيراد الشات بوت الجديد

const HomePage = () => {
    return (
        <div className="relative overflow-x-hidden transition-colors duration-300">
            <main>
                <Hero />
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