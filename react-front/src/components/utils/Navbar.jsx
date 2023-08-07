import { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { DispatchThemeContext } from '../context/theme.context'
import { useSession } from '../context/session.context'
const Navbar = () => {
    const { logout } = useSession()
    const [showProfileLinks, setShowProfileLinks] = useState(false)
    const { toggleTheme } = useContext(DispatchThemeContext)
    const dropdownRef = useRef(null);

    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowProfileLinks(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);
    return (
        <nav>
            <div className='flex justify-between items-center'>
                <div >
                    <button onClick={() => toggleTheme()}><i className="bi bi-cloud-sun fs-3"></i></button>
                </div>
                <div className='flex items-center gap-3 mt-3'>
                    <div >
                        <p className='font-bold'>3:45 PM</p>
                        <p className='text-sm'>22 june, 2023</p>
                    </div>
                    <div className='mx-3 flex gap-3'>
                        <div>
                            <Link to="#notification" className="nav-link " id="notificationBell">
                                <i className="bi bi-bell"></i>
                                <span className="badge">5</span>
                            </Link>
                        </div>
                        <div>
                            <span className="divider">|</span>
                        </div>
                        <div>
                            <Link to="#messsages" className="nav-link " id="messagesIcon">
                                <i className="bi bi-chat-dots"></i>
                                <span className="badge">8</span>
                            </Link>
                        </div>
                    </div>
                    <div className="profile" ref={dropdownRef} onClick={() => setShowProfileLinks((pevState) => !pevState)}>
                        <img src="http://res.cloudinary.com/dm7zftkof/image/upload/v1687176779/dentalClinic/patients/6490464ab1d15ceccc5c4c3c/p8y61jr6ciwaom6nojuq.jpg" alt="profile" />
                        <ul className={`profile-link ${showProfileLinks && 'show'}`}>
                            <li>
                                <Link to="profile"><i className='bx bxs-user-circle icon'></i> Profile</Link>
                            </li>
                            <li>
                                <Link to="setting"><i className='bx bxs-cog'></i> Settings</Link>
                            </li>
                            <li>
                                <button onClick={() => logout()} className="btn btn-outline-danger border-0"><i className="bi bi-box-arrow-in-left"></i>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
