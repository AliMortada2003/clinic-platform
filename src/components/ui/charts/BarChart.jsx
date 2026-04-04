import React from 'react';
import {
    BarChart as RechartsBarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Cell
} from 'recharts';
import ChartTooltip from './ChartTooltip';
import { gradesByCourse } from '../../../utils/data';
const BarChart = ({
    data = [],
    bars = [],
    xAxisDataKey = "name",
    yAxisFormatter,
    gridProps = {},
    showGrid = true,
    showTooltip = true,
    showLegend = true,
    barSize = 30,
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
        <RechartsBarChart data={data} {...props}>
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

            {bars.map((bar, index) => (
                <Bar
                    key={bar.dataKey}
                    dataKey={bar.dataKey}
                    name={bar.name}
                    fill={bar.color}
                    radius={bar.radius || [8, 8, 0, 0]}
                    barSize={barSize}
                    opacity={bar.opacity || 1}
                >
                    {bar.cellColors && data.map((entry, cellIndex) => (
                        <Cell
                            key={`cell-${cellIndex}`}
                            fill={bar.cellColors[cellIndex % bar.cellColors.length]}
                        />
                    ))}
                </Bar>
            ))}
        </RechartsBarChart>
    );
};

export default BarChart;