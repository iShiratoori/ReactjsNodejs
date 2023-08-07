import { Link } from "react-router-dom"
import { useSession } from "../context/session.context"

const Sidebar = ({ showSidebar, sidebarLinks }) => {
    const { logout } = useSession()
    return (
        <div className={`sidebar ${!showSidebar && 'hide'}`} >
            <Link className='brand' to="/">
                <i className="bi bi-emoji-smile icon"></i>smileClinic</Link>
            {sidebarLinks}
            <div className="logout">
                <div
                    className="logout-wrapper bg-neutral-400 p-3 rounded-2xl vh-auto">
                    <span
                        onClick={() => logout()}
                        className=" hover:cursor-pointer btn-logout"
                    >Logout</span>
                    <p>when done your session please logout</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
