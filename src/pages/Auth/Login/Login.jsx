import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm, Controller } from 'react-hook-form';
import { AuthContext } from '../../../providers/AuthProvider';
import { toast } from 'react-hot-toast';

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const { handleSubmit, control, formState: { errors } } = useForm();
    const [passwordType, setPasswordType] = useState('password');
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const onSubmit = (data) => {
        // Handle form submission here (e.g., send data to the server).
        console.log(data);

        signIn(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                
                toast.success("Login successful");
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error);
            })
    };

    return (
        <div className="flex justify-center items-center h-screen p-8">
            <div className="bg-white shadow rounded p-6 w-[400px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="text-3xl text-center font-merriweather font-bold mb-2">Login</h2>
                    <div className="mb-2">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                            Email
                        </label>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue="" // Initialize with a default value
                            rules={{ required: 'Email is required' }}
                            render={({ field }) => (
                                <input
                                    type="email"
                                    id="email"
                                    className={`border-gray-400 border-solid border py-2 px-3 w-full rounded-md ${errors.email ? 'border-red-500' : 'border-gray-400'}`}
                                    placeholder="Enter your email"
                                    {...field}
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
                            defaultValue="" // Initialize with a default value
                            rules={{ required: 'Password is required' }}
                            render={({ field }) => (
                                <div className="relative">
                                    <input
                                        type={passwordType}
                                        id="password"
                                        className={`border-gray-400 border-solid border py-2 px-3 w-full rounded-md ${errors.password ? 'border-red-500' : 'border-gray-400'}`}
                                        placeholder="Enter your password"
                                        {...field}
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-1/2 right-3 transform -translate-y-1/2"
                                        onClick={() => setPasswordType(passwordType === 'password' ? 'text' : 'password')}
                                    >
                                        {passwordType === 'password' ? <FaEyeSlash className='text-lg' /> : <FaEye className='text-lg' />}
                                    </button>
                                </div>
                            )}
                        />
                        {errors.password && (
                            <p className="text-red-500 mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <div className='text-end'>
                        <p className='link link-hover'>Forget Password</p>
                    </div>

                    <div className='text-center mt-4'>
                        <button
                            type="submit"
                            className="btn btn-active btn-primary btn-sm w-full"
                        >
                            Login
                        </button>
                    </div>
                </form>

                <p className='text-center mt-3 font-semibold'>
                    New to CTMA? <Link to='/signup' className='text-yellow-500'>Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
