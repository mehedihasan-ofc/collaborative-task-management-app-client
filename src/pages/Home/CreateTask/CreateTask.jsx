import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const CreateTask = () => {
    // State variables to store form data
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priorityLevel, setPriorityLevel] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users data from localStorage or an API and set it in the users state.
        const usersData = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(usersData);
    }, []); // Runs only once when the component mounts

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a new task object with the form data
        const newTask = {
            title: taskTitle,
            description: taskDescription,
            dueDate: dueDate,
            priority: priorityLevel,
            assignedTo: assignedTo,
            status: "pending"
        };

        // Retrieve existing tasks array from local storage or initialize it as an empty array
        const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Add the new task to the array
        existingTasks.push(newTask);

        // Save the updated tasks array back to local storage
        localStorage.setItem('tasks', JSON.stringify(existingTasks));

        toast.success("Task Created Successful")

        // Clear the form fields after submission
        setTaskTitle('');
        setTaskDescription('');
        setDueDate('');
        setPriorityLevel('');
        setAssignedTo('');
    };

    return (
        <div className="h-full p-5">
            <div className="bg-white p-6 rounded-md shadow-md w-full">
                <h1 className="text-2xl font-semibold mb-4">Create Task</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            className="border-gray-400 border-solid border py-2 px-3 w-full rounded-md"
                            placeholder="Enter task title"
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            className="border-gray-400 border-solid border py-2 px-3 w-full rounded-md h-32 resize-none"
                            placeholder="Enter task description"
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center mb-4 space-x-4">
                        <div className="w-1/2">
                            <label htmlFor="dueDate" className="block text-gray-700 font-semibold mb-2">
                                Due Date
                            </label>
                            <input
                                type="date"
                                id="dueDate"
                                className="border-gray-400 border-solid border py-2 px-3 w-full rounded-md"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="priorityLevel" className="block text-gray-700 font-semibold mb-2">
                                Priority Level
                            </label>
                            <select
                                id="priorityLevel"
                                className="border-gray-400 border-solid border py-2 px-3 w-full rounded-md"
                                value={priorityLevel}
                                onChange={(e) => setPriorityLevel(e.target.value)}
                                required
                            >
                                <option value="">Select Priority</option>
                                <option value="Low">Low</option>
                                <option value="Normal">Normal</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="assignedTo" className="block text-gray-700 font-semibold mb-2">
                            Assign To
                        </label>
                        <select
                            id="assignedTo"
                            className="border-gray-400 border-solid border py-2 px-3 w-full rounded-md"
                            value={assignedTo}
                            onChange={(e) => setAssignedTo(e.target.value)}
                        >
                            <option value="">Assign to team member</option>
                            {users.map((user, idx) => (
                                <option key={idx} value={user.email}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                            Create Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTask;