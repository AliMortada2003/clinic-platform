import React from 'react';
import {
    PieChart as RechartsPieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import ChartTooltip from './ChartTooltip';

const PieChart = ({
    data = [],
    dataKey = "value",
    nameKey = "name",
    colors = ['#0e7490', '#f59e0b', '#10b981', '#8b5cf6', '#ef4444'],
    innerRadius = 40,
    outerRadius = 80,
    showTooltip = true,
    showLegend = true,
    legendPosition = "bottom",
    ...props
}) => {
    if (!data || data.length === 0) {
        return (
            <div className="h-full flex items-center justify-center text-slate-500">
                لا توجد بيانات
            </div>
        );
    }

    const legendConfig = {
        bottom: { verticalAlign: 'bottom', height: 36 },
        top: { verticalAlign: 'top', height: 36 },
        right: { verticalAlign: 'middle', layout: 'vertical', height: 'auto' }
    };

    const config = legendConfig[legendPosition] || legendConfig.bottom;

    return (
        <RechartsPieChart {...props}>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                paddingAngle={2}
                dataKey={dataKey}
                nameKey={nameKey}
                label={props.label || false}
            >
                {data.map((entry, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={entry.color || colors[index % colors.length]}
                    />
                ))}
            </Pie>

            {showTooltip && <Tooltip content={<ChartTooltip />} />}

            {showLegend && (
                <Legend
                    {...config}
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => <span className="text-xs text-slate-600">{value}</span>}
                />
            )}
        </RechartsPieChart>
    );
};

export default PieChart;