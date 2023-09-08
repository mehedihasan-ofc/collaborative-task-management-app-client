import React, { useEffect, useState } from 'react';
import { Area, CartesianGrid, ComposedChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Retrieve tasks data from local storage
        const tasksData = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(tasksData);
    }, []); // Runs only once when the component mounts

    return (
        <>
            <div className="mx-auto border my-5 lg:w-11/12 py-2">
                <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart
                        width="100%"
                        height={250}
                        data={tasks}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="dueDate" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area
                            type="monotone"
                            dataKey="status"
                            name="Pending"
                            stackId="status"
                            stroke="#FFA500" // Customize the color for pending
                            fill="#FFA500" // Customize the color for pending
                        />
                        <Area
                            type="monotone"
                            dataKey="status"
                            name="In Progress"
                            stackId="status"
                            stroke="#4F02C0" // Customize the color for in progress
                            fill="#4F02C0" // Customize the color for in progress
                        />
                        <Area
                            type="monotone"
                            dataKey="status"
                            name="Completed"
                            stackId="status"
                            stroke="#008000" // Customize the color for completed
                            fill="#008000" // Customize the color for completed
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </>
    );
};

export default Dashboard;
