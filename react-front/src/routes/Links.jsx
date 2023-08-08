import { NavLink } from "react-router-dom"
export const AdminSidebarLinks = (
    <ul className="side-menu">
        <li>
            <NavLink
                className={({ isActive }) => isActive ? "active" : ""}
                to="/dashboard/admin/" >
                <i className="bi bi-grid icon"></i>
                Overview
            </NavLink>
        </li>
        <li className="mt-20">
            <NavLink
                className={({ isActive }) => isActive ? "active" : ""}
                to="/dashboard/admin/dentists">
                <i className="bi bi-person-fill icon"></i>
                Dentists
            </NavLink>
        </li>
        <li>
            <NavLink
                className={({ isActive }) => isActive ? "active" : ""}
                to="/dashboard/admin/patients">
                <i className="bi bi-person icon"></i>
                Patients
            </NavLink>
        </li>
        <li>
            <NavLink
                className={({ isActive }) => isActive ? "active" : ""}
                to="/dashboard/admin/appointments">
                <i className="bi bi-calendar icon"></i>
                Appointments
            </NavLink>
        </li>
        <li>
            <NavLink
                className={({ isActive }) => isActive ? "active" : ""}
                to="/dashboard/admin/users">
                <i className='bi bi-chat-dots icon'></i>
                Users
            </NavLink>
        </li>
        <li>
            <NavLink
                className={({ isActive }) => isActive ? "active" : ""}
                to="/dashboard/admin/payments">
                <i className='bi bi-credit-card icon'></i>
                All Payments
            </NavLink>
        </li>
        <li>
            <NavLink
                className={({ isActive }) => isActive ? "active" : ""}
                to="/dashboard/admin/reports">
                <i className='text-danger  bi bi-flag icon'></i>
                Report
            </NavLink>
        </li>
    </ul>
)

export const GuestSidebarLinks = (
    <ul className="side-menu">
        <li>
            <NavLink
                className={({ isActive }) => isActive ? "active" : ""}
                to="/dashboard/guest/" >
                <i className="bi bi-grid icon"></i>
                Overview
            </NavLink>
        </li>
    </ul>
)
