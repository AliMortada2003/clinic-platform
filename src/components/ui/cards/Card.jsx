import React from 'react';

const Card = ({ children, className = '', onClick, hover = true }) => {
    return (
        <div
            className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${hover ? 'hover:shadow-md transition-shadow' : ''} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Card;