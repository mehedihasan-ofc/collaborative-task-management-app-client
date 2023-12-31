import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm, Controller } from 'react-hook-form';
import { AuthContext } from '../../../providers/AuthProvider';
import { toast } from 'react-hot-toast';

const SignUp = () => {
    const { handleSubmit, reset, control, formState: { errors } } = useForm();
    const { createUser, updateUserData, setReload } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = (data) => {
        // Handle form submission here (e.g., send data to the server).
        console.log(data);

        const { email, password, name, bio, profilePicture, role } = data;

        createUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);

                updateUserData(loggedUser, name, profilePicture, role)
                    .then(() => {
                        setReload(true);
                        console.log("updated");

                        // Get the existing user data from local storage (if any)
                        const userCollection = JSON.parse(localStorage.getItem("users")) || [];

                        // Add the new user data to the existing collection
                        userCollection.push({
                            name,
                            bio,
                            profilePicture,
                            email,
                            role,
                        });

                        // Save the updated user collection to local storage
                        localStorage.setItem("users", JSON.stringify(userCollection));

                        reset();
                        toast.success('Sign Up successful');
                    })
                    .catch(err => console.log(err))
                navigate(from, { replace: true });
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className="flex justify-center items-center h-full p-8">
            <div className="bg-white shadow rounded p-6 w-[500px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="text-2xl text-center font-bold mb-2">Create a workspace</h2>
                    <div className="mb-2">
                        <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                            Full Name
                        </label>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Name is required' }}
                            render={({ field }) => (
                                <input
                                    type="text"
                                    id="name"
                                    className={`border-gray-400 outline-none border-solid border py-2 px-3 w-full rounded-md ${errors.name ? 'border-red-500' : 'border-gray-400'}`}
                                    placeholder="Enter your name"
                                    {...field}
                                    required // Marked as required
                                />
                            )}
                        />
                        {errors.name && (
                            <p className="text-red-500 mt-1">{errors.name.message}</p>
                        )}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="bio" className="block text-gray-700 font-semibold mb-2">
                            Bio
                        </label>
                        <Controller
                            name="bio"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Bio is required' }}
                            render={({ field }) => (
                                <textarea
                                    id="bio"
                                    className={`border-gray-400 outline-none border-solid border py-2 px-3 w-full rounded-md h-20 ${errors.bio ? 'border-red-500' : 'border-gray-400'}`}
                                    placeholder="Enter your bio"
                                    {...field}
                                    required // Marked as required
                                />
                            )}
                        />
                        {errors.bio && (
                            <p className="text-red-500 mt-1">{errors.bio.message}</p>
                        )}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="profilePicture" className="block text-gray-700 font-semibold mb-2">
                            Profile Picture (URL)
                        </label>
                        <Controller
                            name="profilePicture"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Profile picture URL is required' }}
                            render={({ field }) => (
                                <input
                                    type="text"
                                    id="profilePicture"
                                    className={`border-gray-400 outline-none border-solid border py-2 px-3 w-full rounded-md ${errors.profilePicture ? 'border-red-500' : 'border-gray-400'}`}
                                    placeholder="Enter the URL of your profile picture"
                                    {...field}
                                    required // Marked as required
                                />
                            )}
                        />
                        {errors.profilePicture && (
                            <p className="text-red-500 mt-1">{errors.profilePicture.message}</p>
                        )}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="role" className="block text-gray-700 font-semibold mb-2">
                            What best describes your role?
                        </label>
                        <Controller
                            name="role"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Role selection is required' }}
                            render={({ field }) => (
                                <select
                                    id="role"
                                    className={`border-gray-400 outline-none border-solid border py-2 px-3 w-full rounded-md ${errors.role ? 'border-red-500' : 'border-gray-400'}`}
                                    {...field}
                                    required // Marked as required
                                >
                                    <option value="" disabled>
                                        Select your role
                                    </option>
                                    <option value="Team Leader">Team Leader</option>
                                    <option value="Team Member">Team Member</option>
                                </select>
                            )}
                        />
                        {errors.role && (
                            <p className="text-red-500 mt-1">{errors.role.message}</p>
                        )}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                            Email
                        </label>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address',
                                },
                            }}
                            render={({ field }) => (
                                <input
                                    type="email"
                                    id="email"
                                    className={`border-gray-400 outline-none border-solid border py-2 px-3 w-full rounded-md ${errors.email ? 'border-red-500' : 'border-gray-400'}`}
                                    placeholder="Enter your email"
                                    {...field}
                                    required // Marked as required
                                />
                            )}
                        />
                        {errors.email && (
                            <p className="text-red-500 mt-1">{errors.email.message}</p>
                        )}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                            Password
                        </label>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            }}
                            render={({ field }) => (
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        className={`border-gray-400 outline-none border-solid border py-2 px-3 w-full rounded-md ${errors.password ? 'border-red-500' : 'border-gray-400'}`}
                                        placeholder="Enter your password"
                                        {...field}
                                        required // Marked as required
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-1/2 right-3 transform -translate-y-1/2"
                                        onClick={togglePassword}
                                    >
                                        {showPassword ? <FaEye className="text-lg" /> : <FaEyeSlash className="text-lg" />}
                                    </button>
                                </div>
                            )}
                        />
                        {errors.password && (
                            <p className="text-red-500 mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <div className="text-center mt-4">
                        <button
                            type="submit"
                            className="btn brounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-purple-600 to-purple-500 border-purple-700 text-white w-full"
                        >
                            <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-full group-hover:h-32 opacity-10"></span>
                            <span className="relative">Sign up</span>
                        </button>
                    </div>
                </form>

                <p className="text-center mt-3 font-semibold">
                    Already have an account? <Link to="/login" className="text-purple-600">Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
