import React, { useContext } from 'react';
import useTasks from '../../../hooks/useTasks';
import { AuthContext } from '../../../providers/AuthProvider';

const MyTask = () => {

    const { user } = useContext(AuthContext);
    const [tasks] = useTasks();

    const myTasks = tasks.filter(singleTask => singleTask.assignto === user.email);

    console.log(myTasks);

    return (
        <div>
            MyTask
        </div>
    );
};

export default MyTask;