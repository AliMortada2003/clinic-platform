import React from 'react';
import {
    AreaChart as RechartsAreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Line
} from 'recharts';
import ChartTooltip from './ChartTooltip';

const AreaChart = ({
    data = [],
    area = {},
    line = null,
    xAxisDataKey = "name",
    yAxisFormatter,
    gridProps = {},
    showGrid = true,
    showTooltip = true,
    showLegend = true,
    gradientId = "colorArea",
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
        <RechartsAreaChart data={data} {...props}>
            <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={area.color} stopOpacity={area.opacity || 0.7} />
                    <stop offset="95%" stopColor={area.color} stopOpacity={area.opacityEnd || 0.05} />
                </linearGradient>
            </defs>

            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" {...gridProps} />}

            <XAxis
                dataKey={xAxisDataKey}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
            />

            <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={yAxisFormatter}
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

            <Area
                type="monotone"
                dataKey={area.dataKey}
                name={area.name}
                stroke={area.color}
                strokeWidth={area.strokeWidth || 2}
                fill={`url(#${gradientId})`}
                fillOpacity={area.fillOpacity || 0.3}
            />

            {line && (
                <Line
                    type="monotone"
                    dataKey={line.dataKey}
                    name={line.name}
                    stroke={line.color}
                    strokeWidth={line.width || 2}
                    strokeDasharray={line.dashed ? "5 5" : undefined}
                    dot={false}
                />
            )}
        </RechartsAreaChart>
    );
};

export default AreaChart;