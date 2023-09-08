import React, { useState } from 'react';
import useTasks from '../../../hooks/useTasks';

const AllTask = () => {
    const [tasks] = useTasks();
    const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'completed', 'inProgress', 'pending'
    const [sortBy, setSortBy] = useState('dueDate'); // 'dueDate', 'priority', 'title'

    // Filter tasks based on the selected status
    const filteredTasks = tasks.filter((task) => {
        if (filterStatus === 'all') return true;
        if (filterStatus === 'completed') return task.mark === 'completed';
        if (filterStatus === 'progress') return task.mark === 'progress';
        if (filterStatus === 'pending') return task.mark === 'pending';
        return true;
    });

    // Sort tasks based on the selected criteria
    filteredTasks.sort((a, b) => {
        if (sortBy === 'dueDate') {
            return new Date(a.dueDate) - new Date(b.dueDate);
        }
        if (sortBy === 'priority') {
            return a.priority.localeCompare(b.priority);
        }
        if (sortBy === 'title') {
            return a.title.localeCompare(b.title);
        }
        return 0;
    });

    return (
        <>
            <div className='flex justify-between items-center shadow h-10 m-3 p-2'>
                <div>
                    <label htmlFor="filterStatus">Filter by Status:</label>
                    <select
                        id="filterStatus"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="progress">In Progress</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="sortBy">Sort by:</label>
                    <select
                        id="sortBy"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="dueDate">Due Date</option>
                        <option value="priority">Priority</option>
                        <option value="title">Title</option>
                    </select>
                </div>
            </div>
            <div className="overflow-x-auto shadow m-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Assigned To</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Due Date</th>
                            <th>Priority</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasks.map((task, index) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{task.assignedTo}</td>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{task.dueDate}</td>
                                <td>{task.priority}</td>
                                <td>{task.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AllTask;
