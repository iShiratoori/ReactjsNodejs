import useDropdown from "../hooks/useDropdown"
import { getFullName } from "../helpers"
import { DispatchModelContext } from "../context/model.dialog.contex"
import { useContext } from "react"

const List = ({ appointment }) => {
    const { openModel } = useContext(DispatchModelContext);
    const [dropdown, toggleDropdown, dropdownRef] = useDropdown()
    const dropdownClass = dropdown ? 'z-10 absolute my-7 text-base shadow-2xl list-none bg-white divide-y divide-gray-100 rounded-lg  w-44 dark:bg-gray-700' : 'hidden';
    const handleModelOpening = (type, context) => {
        openModel(appointment, {
            type: type,
            context: context
        })
    }
    return (
        <tr
            className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <p className="ms-4">{getFullName(appointment.patient.name)}</p>
            </th>
            <td className="px-6 py-4">
                {appointment.status}
            </td>
            <td className="px-6 py-4">
                {appointment.time}
            </td>
            <td className="px-6 py-4">
                {appointment.patient.contacts.phone}
            </td>
            <td className="px-6 py-4">
                {appointment.type}
            </td>
            <td className="px-6 py-4">
                {getFullName(appointment.dentist.name)}
            </td>
            <td className="px-6 py-4">
                <div className="flex justify-end px-4 pt-4">
                    <button onClick={() => toggleDropdown()} type="button">
                        <i className="bi bi-three-dots-vertical"></i>
                    </button>

                    <div ref={dropdownRef} className={dropdownClass}>
                        <ul aria-labelledby="dropdownButton">
                            <li>
                                <button
                                    type="button"
                                    className="w-full py-1  text-gray-700 hover:bg-[#0C5FCD] hover:text-white   dark:text-gray-200"
                                >Edit
                                </button>
                                <button
                                    type="button"
                                    className="w-full py-1  text-gray-700 hover:bg-[#0C5FCD] hover:text-white   dark:text-gray-200"
                                >Pretosize
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleModelOpening('delete', 'appointment')}
                                    className="w-full py-1  text-red-500 hover:bg-red-500 hover:text-white"
                                >Delete
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </td>

        </tr>
    )
}


const AppointmentList = ({ appointments, data }) => {
    const { openModel } = useContext(DispatchModelContext);

    const handleModelOpening = (type, context) => {
        openModel('', {
            type: type,
            context: context
        })
    }
    return (
        <>
            <div className="flex justify-end items-center">
                <div className="bg-white dark:bg-gray-700  px-3">
                    <button onClick={() => handleModelOpening('new', 'appointment')} type="button">
                        <i className="bi bi-calendar-plus"></i>
                    </button>
                </div>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            PATIENT
                        </th>
                        <th scope="col" className="px-6 py-3">
                            STATUS
                        </th>
                        <th scope="col" className="px-6 py-3">
                            APPOINTMENT
                        </th>
                        <th scope="col" className="px-6 py-3">
                            PHONE
                        </th>
                        <th scope="col" className="px-6 py-3">
                            TYPE
                        </th>
                        <th scope="col" className="px-6 py-3">
                            DOCTOR
                        </th>
                        <th scope="col" >

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <List key={appointment._id} appointment={appointment} id={appointment._id} />
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default AppointmentList
