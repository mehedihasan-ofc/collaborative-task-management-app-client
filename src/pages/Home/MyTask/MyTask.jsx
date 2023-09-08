import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';

const MyTask = () => {
    const { user } = useContext(AuthContext);
    const [tasksData, setTasksData] = useState([]);
    const [myTasks, setMyTasks] = useState([]);

    useEffect(() => {
        const tasksData = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasksData(tasksData);

        const myTasks = tasksData.filter(singleTask => singleTask.assignedTo === user.email);
        setMyTasks(myTasks);
    }, [user.email]);

    // Function to update the status of a task in local storage and UI
    const updateTaskStatusInLocalStorage = (index, newStatus) => {
        const updatedTasksData = [...tasksData];
        updatedTasksData[index].status = newStatus;
        localStorage.setItem('tasks', JSON.stringify(updatedTasksData));

        // Update the state directly with the updated data
        setTasksData(updatedTasksData);
        setMyTasks(updatedTasksData.filter(singleTask => singleTask.assignedTo === user.email));
    };

    return (
        <div className="overflow-x-auto shadow m-3">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {myTasks.map((task, index) => (
                        <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.dueDate}</td>
                            <td>{task.priority}</td>
                            <td>{task.status}</td>
                            <td>
                                <button
                                    disabled={task.status === "progress"}
                                    className="btn btn-xs btn-success"
                                    onClick={() => {
                                        updateTaskStatusInLocalStorage(index, 'progress');
                                    }}
                                >
                                    Progress
                                </button>
                            </td>
                            <td>
                                <button
                                    disabled={task.status === "completed"}
                                    className="btn btn-xs btn-success"
                                    onClick={() => {
                                        updateTaskStatusInLocalStorage(index, 'completed');
                                    }}
                                >
                                    Completed
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyTask;
