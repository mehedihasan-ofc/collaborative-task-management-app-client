import React, { useEffect, useState } from 'react';

const useTasks = () => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Retrieve tasks data from local storage
        const tasksData = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(tasksData);
    }, []); // Runs only once when the component mounts

    return [tasks];
};

export default useTasks;