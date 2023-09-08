import React, { useContext } from 'react';
import useTasks from '../../../hooks/useTasks';
import { AuthContext } from '../../../providers/AuthProvider';

const MyTask = () => {

    const { user } = useContext(AuthContext);
    const [tasks] = useTasks();

    const myTasks = tasks.filter(singleTask => singleTask.assignedTo === user.email);

    console.log(myTasks);

    return (
        <div className="overflow-x-auto shadow m-3">
            <table className="table">
                {/* head */}
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
                    {/* row 1 */}
                    {tasks.map((task, index) => (
                        <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.dueDate}</td>
                            <td>{task.priority}</td>
                            <td>{task.status}</td>
                            <td>
                                <button disabled={task.status === "progress" || task.status === "completed"} className="btn btn-xs btn-success">Progress</button>
                            </td>

                            <td>
                                <button disabled={task.status === "progress" || task.status === "completed"} className="btn btn-xs btn-success">Completed</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyTask;