import React from 'react';

const PageHeader = ({
    title,
    subtitle,
    actions,
    breadcrumb,
    dark
}) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="space-y-1">
                {breadcrumb && (
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        {breadcrumb}
                    </div>
                )}
                <h1 className="text-3xl font-bold bg-linear-to-r from-[#00c8ff] to-[#00a2ff] bg-clip-text text-transparent">
                    {title}
                </h1>
                {subtitle && (
                    <p className={`text-lg font-medium ${dark ? "text-white" : "text-slate-50"}`}>{subtitle}</p>
                )}
            </div>

            {actions && (
                <div className="flex items-center gap-3">
                    {actions}
                </div>
            )}
        </div>
    );
};

export default PageHeader;