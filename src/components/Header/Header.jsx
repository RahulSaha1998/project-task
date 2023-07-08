import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import Lottie from "lottie-react";
import g2 from '../../../public/g2.json'
import useAdmin from '../../hooks/useAdmin';
import DarkMode from '../DarkMode/DarkMode';


const Header = () => {

    const { user, logOut, setLoading } = useContext(AuthContext);
    const [isAdmin] = useAdmin();


    const handleLogOut = () => {
        logOut()
            .then(() => setLoading(false))
            .catch(error => {
                console.log(error)
            })
    }


    const navItems = <>

        <li> <Link className='font-semibold' to="/">Home</Link> </li>
        {/* {
            isAdmin &&
            <li> <Link className='font-semibold' to="/dashboard">Admin Dashboard</Link> </li>
        }
        <li> <Link className='font-semibold' to="/allTask">Tasks</Link> </li> */}
        {
            isAdmin ? <>
                <li> <Link className='font-semibold' to="/dashboard">Admin Dashboard</Link> </li>
            </>
                :
                <>
                    <li> <Link className='font-semibold' to="/allTask">Tasks</Link> </li>
                </>
        }
    </>

    const btn = <>
        <button className='btn btn-info' onClick={handleLogOut}>Log out</button>
    </>

    return (
        <div className="navbar h-28 mb-4 rounded-lg shadow-xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navItems}
                        {user && btn}
                    </ul>
                </div>
                <Lottie className='w-24' animationData={g2}></Lottie>


                <div className='w-14 lg:w-52'>
                    <h2 className='font-bold lg:text-3xl'>To Do <span className='text-red-600 font-semibold'>List</span></h2>
                </div>

            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end gap-2">
                <div>
                    <DarkMode/>
                </div>
                <div className=' flex items-center gap-4'>
                    {
                        user?.email ? <>

                            <div className=' w-12 mt-1'>
                                <div className="tooltip tooltip-bottom" data-tip={user?.displayName}>
                                    <img className='rounded-full cursor-pointer' src={user?.photoURL} alt="" />
                                </div>
                            </div>
                            <div className="navbar-center hidden lg:flex">
                                <ul className="menu menu-horizontal px-1">
                                    {btn}
                                </ul>
                            </div>

                        </>
                            : <Link to="/login"><button className='btn btn-info'>Login</button></Link>
                    }
                </div>
            </div>
        </div>

    );
};

export default Header;