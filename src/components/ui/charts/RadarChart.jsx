import React from 'react';
import {
    RadarChart as RechartsRadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Tooltip,
    Legend
} from 'recharts';
import ChartTooltip from './ChartTooltip';

const RadarChart = ({
    data = [],
    radar = {},
    polarAngleAxisDataKey = "skill",
    showTooltip = true,
    showLegend = true,
    ...props
}) => {
    if (!data || data.length === 0) {
        return (
            <div className="h-full flex items-center justify-center text-slate-500">
                لا توجد بيانات
            </div>
        );
    }

    return (
        <RechartsRadarChart data={data} {...props}>
            <PolarGrid stroke="#e5e7eb" />

            <PolarAngleAxis
                dataKey={polarAngleAxisDataKey}
                tick={{ fontSize: 12 }}
            />

            <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fontSize: 10 }}
            />

            {showTooltip && <Tooltip content={<ChartTooltip />} />}

            {showLegend && (
                <Legend
                    verticalAlign="top"
                    height={36}
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => <span className="text-xs text-slate-600">{value}</span>}
                />
            )}

            <Radar
                name={radar.name}
                dataKey={radar.dataKey}
                stroke={radar.color}
                fill={radar.color}
                fillOpacity={radar.opacity || 0.4}
            />
        </RechartsRadarChart>
    );
};

export default RadarChart;