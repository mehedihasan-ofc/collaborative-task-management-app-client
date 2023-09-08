import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { toast } from 'react-hot-toast';
import { FaChartBar, FaRegCalendarPlus, FaTable, FaTasks, FaUserPlus } from "react-icons/fa";
import useTeamLeader from '../hooks/useTeamLeader';

const MainLayout = () => {

    const { user, logOut } = useContext(AuthContext);
    const [isTeamLeader] = useTeamLeader();

    console.log(isTeamLeader);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('Log Out successful')
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
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
                        <li><Link to="/dashboard"><FaChartBar />Dashboard</Link></li>
                        {isTeamLeader && <li><Link to="/add-member"><FaUserPlus />Add Member</Link></li>}
                        {!isTeamLeader && <li><Link to="/my-task"><FaTable />My Task</Link></li>}
                        <li><Link to="/all-task"><FaTasks />All Task</Link></li>
                        {isTeamLeader && <li><Link to="/create-task"><FaRegCalendarPlus />Create Task</Link></li>}
                    </ul>

                </div>
            </div>
        </>
    );
};

export default MainLayout;