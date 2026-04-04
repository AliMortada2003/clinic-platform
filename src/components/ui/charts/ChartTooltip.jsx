import React from 'react';

const ChartTooltip = ({ active, payload, label, formatter }) => {
    if (!active || !payload || !payload.length) {
        return null;
    }

    const formatValue = (value) => {
        if (formatter) {
            return formatter(value);
        }
        return typeof value === 'number' ? value.toLocaleString() : value;
    };

    return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
            <p className="text-sm font-semibold text-slate-800 mb-2">{label}</p>
            <div className="space-y-1">
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <div
                                className="h-2 w-2 rounded-full"
                                style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-xs text-slate-600">{entry.name}</span>
                        </div>
                        <span className="text-xs font-semibold text-slate-800">
                            {formatValue(entry.value)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChartTooltip;