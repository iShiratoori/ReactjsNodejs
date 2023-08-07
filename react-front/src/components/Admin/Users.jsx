import { useContext } from "react"
import { ServerDataContext } from "../context/data.context"

const UsersList = ({ users }) => {
    return (

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Username
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Role
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr
                            key={user._id}
                            className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <img className="w-24 h-24 mb-2 rounded-full shadow-lg" src={user.image.url} alt={`User ${user.username}`} />
                                <p className="ms-4">{user.username}</p>
                            </th>
                            <td className="px-6 py-4">
                                {user.email}
                            </td>
                            <td className="px-6 py-4">
                                {user.hasPermission.map((rol, i) => (
                                    <p
                                        key={rol._id}
                                    >{rol.role}</p>
                                ))}
                            </td>
                            <td className="px-6 py-4">
                                {user.status}
                            </td>
                            <td className="px-6 py-4">
                                ...
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}

const Users = () => {
    const { serverData } = useContext(ServerDataContext)
    if (serverData) {
        const users = serverData.users
        return (
            <UsersList users={users} />
        )
    }
    return (
        <div>
            <h1>Empty</h1>
        </div>
    )
}

export default Users
