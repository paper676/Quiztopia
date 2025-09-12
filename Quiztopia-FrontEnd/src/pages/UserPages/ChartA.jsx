import React from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

function ChartA() {
    const data = [
        { name: 'Science', value: 400 },
        { name: 'Math', value: 300 },
        { name: 'History', value: 200 },
        { name: 'Geography', value: 100 },
    ];

    const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444'];
    return (
        <div className="w-full h-72">
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default ChartA