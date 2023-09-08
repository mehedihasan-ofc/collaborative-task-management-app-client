import React from 'react';
import { Area, CartesianGrid, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const Statistics = ({ tasks }) => {
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-black text-white p-3">
                    <p className="font-bold">{label}</p>
                    <p className="font-bold">{`Status: ${payload[0].value}`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <div>
            <div className="mx-auto border my-5 lg:w-11/12 py-2">
                <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart
                        width="100%"
                        height={250}
                        data={tasks}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="dueDate" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="status" // Use "status" instead of "mark"
                            stroke="#8884d8"
                            fillOpacity={1}
                            fill="url(#colorUv)"
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Statistics;
