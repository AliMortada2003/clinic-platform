import React from 'react';

const MobileOverlay = ({ isOpen, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`fixed inset-0 z-20 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${isOpen
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
                }`}
        />
    );
};

export default MobileOverlay;