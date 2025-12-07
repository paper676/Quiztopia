import React, { useEffect, useState } from 'react'
import AppLogo from '../../assets/AppLogo.png'
import { Outlet } from 'react-router-dom'
import { CircleUser, SquarePen, LayoutDashboard, History, LogOut, Info, UserRoundPen, Save, File } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

import toast from 'react-hot-toast';
import { UseAppContext } from '../../context/AppContext';

function FixedStructure() {
    const { setUser, navigate, axios,setIsUser } = UseAppContext();
    const [open,setOpen]=useState(false);
    const toggle=()=>setOpen(!open);
    const logout = async () => {
        try {
            const { data } = await axios.get('/api/user/logout');
            if (data.success) {
                setUser(null);
                setIsUser(false);
                navigate('/');
                toast.success(data.message);
            } else {
                toast.success(data.message);
            }
        } catch (error) {
            toast.success(error.message);
        }
    }
    const sidebarLinks = [
        { name: "DashBoard", path: "/user", icon: <LayoutDashboard /> },
        { name: "Create a Quiz", path: "/user/create", icon: <SquarePen /> },
        { name: "Upload File", path: "/user/upload", icon: <File /> },
        { name: "Privious Quizes", path: "/user/previous", icon: <History /> },
        { name: "Saved Quizes", path: "/user/saved-quizes", icon: <Save /> },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
                <Link to='/'>
                    <img className="h-12 mx-5" src={AppLogo} alt="dummyLogoColored" />
                </Link>
                
                <div className="relative cursor-pointer mx-10">
                    <div onClick={toggle}>
                        <CircleUser size={32} className="text-4xl text-indigo-900 font-bold" />
                    </div>
                    { open && (
                        <ul className="absolute top-6 right-0 bg-white shadow-md border border-gray-200 w-45 rounded-md z-40 text-sm">
                            <Link to='/profile'><li className="px-4 py-2 hover:bg-zinc-200 cursor-pointer flex flex-row items-center">
                                <UserRoundPen size={15} />
                                <p className='px-1'>Profile</p>
                            </li></Link>
                            <hr className='text-zinc-200' />
                            <Link to='/help'><li className="px-4 py-2 hover:bg-zinc-200 cursor-pointer flex flex-row items-center">
                                <Info size={15} />
                                <p className='px-1'>Help</p>
                            </li></Link>
                            <hr className='text-zinc-200' />
                            <li onClick={logout} className="px-4 py-2 text-red-400 hover:bg-zinc-200 cursor-pointer flex flex-row items-center">
                                <LogOut size={15} />
                                <p className='px-1'>Logout</p>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
            <div className='flex flex-1 h-[89vh] overflow-hidden'>
                <div className="w-16 md:w-60 border-r border-gray-300 pt-4 flex flex-col shrink-0 transition-all duration-300">
                    {sidebarLinks.map((item) => (
                        <NavLink to={item.path} key={item.name} end={item.path === '/user'}
                            className={({ isActive }) => `flex items-center py-3 px-4 gap-3 
                                ${isActive ? "border-r-4 md:border-r-[3px] border-radius-5 bg-indigo-500/10 border-indigo-800 text-indigo-900"
                                    : "hover:bg-gray-100/95 border-white text-gray-700"
                                }`
                            }
                        >
                            {item.icon}
                            <p className="md:block hidden text-center font-medium">{item.name}</p>
                        </NavLink>
                    ))}
                </div>
                <div className="flex-1 overflow-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default FixedStructure