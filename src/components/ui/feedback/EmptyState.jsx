// src/components/ui/feedback/EmptyState.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const EmptyState = ({
    title,
    description,
    icon,
    imageUrl,
    actionText,
    secondaryActionText,
    onAction,
    onSecondaryAction,
    children,
    size = 'medium',
    variant = 'default',
    align = 'center',
    className = '',
}) => {
    const sizeClasses = {
        small: 'py-6',
        medium: 'py-12',
        large: 'py-20',
    };

    const variantClasses = {
        default: 'bg-white',
        subtle: 'bg-gray-50',
        bordered: 'bg-white border border-gray-200',
    };

    const alignClasses = {
        center: 'text-center items-center',
        left: 'text-right items-end',
        right: 'text-left items-start',
    };

    const iconSize = {
        small: 'text-4xl',
        medium: 'text-5xl',
        large: 'text-6xl',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex flex-col rounded-lg ${sizeClasses[size]} ${variantClasses[variant]} ${alignClasses[align]} ${className}`}
        >
            {/* الصورة أو الأيقونة */}
            {imageUrl ? (
                <div className="mb-4">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="mx-auto h-32 w-32 object-contain opacity-80"
                    />
                </div>
            ) : icon ? (
                <div className="mb-4">
                    <div className={`inline-block ${iconSize[size]} text-gray-400 mb-2`}>
                        {icon}
                    </div>
                </div>
            ) : (
                <div className="mb-4">
                    <svg
                        className={`mx-auto ${size === 'small' ? 'h-12 w-12' : size === 'medium' ? 'h-16 w-16' : 'h-20 w-20'} text-gray-400`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        />
                    </svg>
                </div>
            )}

            {/* العنوان */}
            {title && (
                <h3 className={`font-semibold text-gray-900 ${size === 'small' ? 'text-lg' : size === 'medium' ? 'text-xl' : 'text-2xl'} mb-2`}>
                    {title}
                </h3>
            )}

            {/* الوصف */}
            {description && (
                <p className={`text-gray-600 max-w-md mx-auto ${size === 'small' ? 'text-sm' : 'text-base'} ${align === 'center' ? 'mx-auto' : ''}`}>
                    {description}
                </p>
            )}

            {/* محتوى إضافي */}
            {children && (
                <div className="mt-6">
                    {children}
                </div>
            )}

            {/* الأزرار والإجراءات */}
            {(actionText || secondaryActionText) && (
                <div className={`mt-6 flex ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-start' : 'justify-end'} gap-3`}>
                    {secondaryActionText && (
                        <button
                            onClick={onSecondaryAction}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition"
                        >
                            {secondaryActionText}
                        </button>
                    )}

                    {actionText && (
                        <button
                            onClick={onAction}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                        >
                            {actionText}
                        </button>
                    )}
                </div>
            )}
        </motion.div>
    );
};

EmptyState.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.node,
    imageUrl: PropTypes.string,
    actionText: PropTypes.string,
    secondaryActionText: PropTypes.string,
    onAction: PropTypes.func,
    onSecondaryAction: PropTypes.func,
    children: PropTypes.node,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    variant: PropTypes.oneOf(['default', 'subtle', 'bordered']),
    align: PropTypes.oneOf(['center', 'left', 'right']),
    className: PropTypes.string,
};

export default EmptyState;