import React from 'react';

const ProgressBar = ({ value, max = 100, color = 'bg-blue-500', showLabel = true, height = 'h-2' }) => {
    const percentage = Math.min((value / max) * 100, 100);

    return (
        <div className="space-y-1">
            {showLabel && (
                <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">التقدم</span>
                    <span className="font-medium">{value}%</span>
                </div>
            )}
            <div className={`w-full bg-slate-200 rounded-full overflow-hidden ${height}`}>
                <div
                    className={`h-full rounded-full ${color} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;