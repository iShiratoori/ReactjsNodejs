
import React from 'react'
import useDropdown from './hooks/useDropdown'
import { Link, NavLink } from 'react-router-dom'
import { useSession } from './context/session.context'

const Home = () => {
    const { session, logout } = useSession()
    const [dropdown, toggleDropdown, dropdownRef] = useDropdown()
    const [navbar, toggleNavBar, navbarRef] = useDropdown()

    const navClasses = {
        default: 'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium',
        active: 'bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium'
    }
    return (
        <div>
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button type="button"
                                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                onClick={toggleNavBar}
                                ref={navbarRef}
                            >
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Open main menu</span>
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start w-full ">
                            <div className="flex flex-shrink-0  text-2xl font-semibold text-blue-600" >
                                <i className="bi bi-emoji-smile w-8 h-8 "></i>
                                <span className='font-bold'>smileClinic</span>
                            </div>
                            <div className="hidden  sm:block mx-auto">
                                <div className="flex space-x-4">
                                    <NavLink to="#home"
                                        className={({ isActive }) => isActive ? navClasses.active : navClasses.default}
                                    >Home
                                    </NavLink>
                                    <NavLink to="#about"
                                        className={({ isActive }) => isActive ? navClasses.active : navClasses.default}
                                    >About us
                                    </NavLink>
                                    <NavLink to="#contact"
                                        className={({ isActive }) => isActive ? navClasses.active : navClasses.default}
                                    >Contact
                                    </NavLink>
                                    <NavLink to="/book-appointment"
                                        className={({ isActive }) => isActive ? navClasses.active : `${navClasses.default} bg-blue-500`}
                                    >Book Appointment</NavLink>
                                </div>
                            </div>
                        </div>

                        {session ? (
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only">View notifications</span>
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                    </svg>
                                </button>
                                <div className="relative ml-3">
                                    <div>
                                        <button
                                            type="button"
                                            className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                            onClick={toggleDropdown}
                                            ref={dropdownRef}
                                        >
                                            <span className="absolute -inset-1.5"></span>
                                            <span className="sr-only">Open user menu</span>
                                            <img className="h-8 w-8 rounded-full"
                                                src={session.user.image.url} alt="" />
                                        </button>
                                    </div>
                                    {dropdown &&
                                        (
                                            <div className="profile" ref={dropdownRef}>
                                                <ul className={`profile-link ${dropdown && 'show'}`} >
                                                    <li>
                                                        <Link to={`dashboard/${session.role}`}><i className='bx bxs-user-circle icon'></i>Dashboard</Link>
                                                    </li>
                                                    <li>
                                                        <Link to={`dashboard/${session.role}/profile`}><i className='bx bxs-user-circle icon'></i> Profile</Link>
                                                    </li>
                                                    <li>
                                                        <Link to={`dashboard/${session.role}/setting`}><i className='bx bxs-cog'></i> Settings</Link>
                                                    </li>
                                                    <li>
                                                        <button onClick={() => logout()} className="btn btn-outline-danger border-0"><i className="bi bi-box-arrow-in-left"></i>Logout</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        ) : (
                            <div className='space-x-3'>
                                <NavLink to="/login"
                                    className={({ isActive }) => isActive ? navClasses.active : navClasses.default}
                                >Login
                                </NavLink>
                                <NavLink to="/register"
                                    className={({ isActive }) => isActive ? navClasses.active : navClasses.default}
                                >Register
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div>
                {navbar && (
                    <div className="sm:hidden" id="mobile-menu">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            <NavLink to="#" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Dashboard</NavLink>
                            <NavLink to="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Team</NavLink>
                            <NavLink to="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Projects</NavLink>
                            <NavLink to="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Calendar</NavLink>
                        </div>
                    </div>
                )}

            </nav>

            <div id='home' className="bg-[url('https://res.cloudinary.com/dm7zftkof/image/upload/v1687089883/dentalClinic/utils/home-bg_totxwy.jpg')]">
                Homepage
            </div>
            <div id='about'>
                About US
            </div>
            <div id='contact'>
                contact
            </div>
        </div>
    )
}

export default Home
