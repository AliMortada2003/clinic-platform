import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const LineChart = ({
    data,
    lines,
    xAxisDataKey,
    yAxisFormatter,
    ...props
}) => {
    return (
        <RechartsLineChart data={data} {...props}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey={xAxisDataKey} axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} tickFormatter={yAxisFormatter} />
            <Tooltip />
            <Legend />
            {lines.map((line, index) => (
                <Line
                    key={index}
                    type="monotone"
                    dataKey={line.dataKey}
                    name={line.name}
                    stroke={line.color}
                    strokeWidth={line.width || 2}
                    strokeDasharray={line.dashed ? "5 5" : undefined}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                />
            ))}
        </RechartsLineChart>
    );
};

export default LineChart;