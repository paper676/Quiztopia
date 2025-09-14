import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import AppLogo from '../assets/AppLogo.png'


function LandinNavbar() {
    const [open, setOpen] = React.useState(false)
  return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <Link to="/">
                <img className="h-12" src={AppLogo} alt="dummyLogoColored" />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to='/help'><a className='font-medium'>About</a></NavLink>
                <NavLink to='/help'><a className='font-medium'>Contact</a></NavLink>
                <Link to='/login'>
                    <button className="font-medium flex justify-center items-center cursor-pointer px-8 py-[4px] border border-indigo-600 hover:bg-indigo-100 hover:text-indigo transition text-indigo rounded-full">
                        <p>Login</p>
                    </button>
                </Link>
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
                <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="21" height="1.5" rx=".75" fill="#426287" />
                    <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
                    <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
                </svg>
            </button>

            {/* Mobile Menu */}
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                <NavLink to='/help' onClick={()=>setOpen(false)}>AboutUS</NavLink>
                <NavLink to='/help' onClick={()=>setOpen(false)}>Contact</NavLink>
                <NavLink to='/login'>
                    <button className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-100 transition text-white rounded-full text-sm">
                        Login
                    </button>
                </NavLink>
            </div>
        </nav>
    )
}

export default LandinNavbar