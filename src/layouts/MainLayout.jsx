import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const MainLayout = () => {

    const navOptions = <>
    <li><Link to='/'>Home</Link></li>
    <li><Link to='/login'>Log In</Link></li>
    <li><Link to='/'>Get started</Link></li>
    {/* <li><Link to='/dashboard/mycart'>
        <button className="btn gap-2">
            <FaShoppingCart />
            <div className="badge badge-secondary">+{cart?.length || 0}</div>
        </button>
    </Link></li> */}

    {/* {
        user ? <><button onClick={handleLogOut} className='btn btn-ghost'>Log Out</button></> : <><li><Link to='/login'>Login</Link></li></>
    } */}
</>

    return (
        <>
            <div className="drawer">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div className="w-full navbar shadow-sm">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                        </div>
                        <div className="flex-1 px-2 mx-2">CTMA</div>
                        <div className="flex-none items-center hidden lg:block">
                            <ul className="menu menu-horizontal">
                                {/* Navbar menu content here */}
                                {navOptions}
                            </ul>
                        </div>
                    </div>
                    {/* Page content here */}
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200">
                        {/* Sidebar content here */}
                        {navOptions}
                    </ul>

                </div>
            </div>
        </>
    );
};

export default MainLayout;