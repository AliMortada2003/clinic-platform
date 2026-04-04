import React from 'react';
import BookingSystem from '../../sections/BookingSystem';
import Footer from '../../sections/FooterSection';
import Header from '../../components/layout/Navbar';

const ReservePage = () => {
    return (
        <>
            <Header />
            <div className="py-20 transition-colors duration-300">
                <BookingSystem />
            </div>
            <Footer />
        </>
    );
}

export default ReservePage;
