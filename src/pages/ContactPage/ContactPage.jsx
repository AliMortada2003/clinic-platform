import React from 'react'
import ContactSection from '../../sections/ContactSection'
import ServicesSection from '../../sections/ServicesSection'
import Footer from '../../sections/FooterSection'
import ChatBot from '../../sections/ChatBot'

function ContactPage() {

    return (
    <div className="py-20 transition-colors duration-300">
            <ContactSection />
            <ServicesSection />
        </div >
    )
}

export default ContactPage