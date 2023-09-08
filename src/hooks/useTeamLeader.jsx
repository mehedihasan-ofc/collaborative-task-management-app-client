import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const useTeamLeader = () => {

    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users data from localStorage or an API and set it in the users state.
        const usersData = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(usersData);
    }, []); // Runs only once when the component mounts

    const findUser = users.find(singleUser => singleUser?.email === user?.email);
    const isTeamLeader = findUser?.role === "Team Leader";

    return [isTeamLeader];
};

export default useTeamLeader;