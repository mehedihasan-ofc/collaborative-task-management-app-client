import React, { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const userJSON = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="flex flex-col items-center justify-center mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-40 h-40 mx-auto relative mb-4">
                    <img
                        src={user.photoURL}
                        alt={`${user.displayName}'s Profile`}
                        className="w-full h-full object-cover rounded-full border-4 border-white"
                    />
                </div>
                <div className="text-center">
                    <input
                        type="text"
                        value={user.displayName}
                        readOnly
                        className="bg-gray-100 px-2 py-1 w-full rounded-md mb-2 text-gray-700 font-semibold"
                    />
                </div>
                <div className="text-center">
                    <textarea
                        value={userJSON.bio}
                        readOnly
                        className="bg-gray-100 px-2 py-1 w-full rounded-md text-gray-700"
                    />
                </div>
            </div>
        </div>
    );
};

export default Profile;
