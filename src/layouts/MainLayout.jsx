import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { toast } from 'react-hot-toast';

const MainLayout = () => {

    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('Log Out successful')
            })
            .catch(err => console.log(err))
    }

    const navOptions = <>
        <li><Link to='/'>Home</Link></li>
        {!user && <li><Link to='/login'>Log In</Link></li>}
        {!user && <li><Link to='/signup'>Sign Up</Link></li>}
        {user && <li onClick={handleLogOut}><Link>Log Out</Link></li>}
    </>

    return (
        // <>
        //     <div className="drawer">
        //         <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        //         <div className="drawer-content flex flex-col">
        //             {/* Navbar */}
        //             <div className="w-full navbar shadow-sm">
        //                 <div className="flex-none lg:hidden">
        //                     <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
        //                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        //                     </label>
        //                 </div>
        //                 <div className="flex-1 px-2 mx-2">CTMA</div>
        //                 <div className="flex-none items-center hidden lg:block">
        //                     <ul className="menu menu-horizontal">
        //                         {/* Navbar menu content here */}
        //                         {navOptions}
        //                     </ul>
        //                 </div>
        //             </div>
        //             {/* Page content here */}
        //             <Outlet />
        //         </div>
        //         <div className="drawer-side">
        //             <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        //             <ul className="menu p-4 w-80 min-h-full bg-base-200">
        //                 {/* Sidebar content here */}
        //                 {navOptions}
        //             </ul>

        //         </div>
        //     </div>
        // </>

        <>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center">
                    {/* Page content here */}

                    {/* navbar */}
                    <div className="navbar bg-base-200">
                        <div className="flex-1">
                            <a className="btn btn-ghost normal-case text-xl">CTMA</a>
                        </div>
                        <div className="flex-none gap-2">
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    {
                                        user && <div className="w-10 rounded-full">
                                            <img src={user?.photoURL} />
                                        </div>
                                    }
                                </label>
                                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                    <li>
                                        <Link to="/profile" className="justify-between">
                                            Profile
                                        </Link>
                                    </li>
                                    <li><a onClick={handleLogOut}>Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                    <Outlet />

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <li><a>Sidebar Item 1</a></li>
                        <li><a>Sidebar Item 2</a></li>
                    </ul>

                </div>
            </div>
        </>
    );
};

export default MainLayout;