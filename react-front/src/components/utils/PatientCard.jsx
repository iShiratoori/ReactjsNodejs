import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { DispatchModelContext } from "../context/model.dialog.contex";
import useDropdown from '../hooks/useDropdown';
import { getFormatedDate } from '../helpers';

const Card = ({ patient, name, dob, img, id }) => {
    const { openModel } = useContext(DispatchModelContext);
    const [isDropdownOpen, toggleDropdown, dropdownRef] = useDropdown()

    const handleModelOpening = (type, context) => {
        openModel(patient, {
            type: type,
            context: context
        })
    }

    const dropdownClass = isDropdownOpen ? 'z-10 absolute my-7 text-base shadow-2xl list-none bg-white divide-y divide-gray-100 rounded-lg  w-44 dark:bg-gray-700' : 'hidden';
    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-end px-4 pt-4">
                <button
                    onClick={() => toggleDropdown()}
                    className=" text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5">
                    <span className="sr-only">Open dropdown</span>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 3">
                        <path
                            d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                    </svg>
                </button>
                <div ref={dropdownRef} className={dropdownClass}>
                    <ul className="pt-3" aria-labelledby="dropdownButton">
                        <li>
                            <button
                                onClick={() => {
                                    handleModelOpening('edit', 'patient')
                                }}
                                className="w-full py-2  text-gray-700 hover:bg-[#0C5FCD] hover:text-white   dark:text-gray-200"
                            >Edit</button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleModelOpening('link-to-dentist', 'patient')}
                                className="w-full py-2  text-gray-700 hover:bg-[#0C5FCD] hover:text-white   dark:text-gray-200"
                            >Link to a dentist</button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleModelOpening('link-to-user', 'patient')}
                                className="w-full py-2  text-gray-700 hover:bg-[#0C5FCD] hover:text-white   dark:text-gray-200"
                            >Link to a user</button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleModelOpening('delete', 'patient')}
                                className="w-full py-2  text-red-500 hover:bg-red-600 hover:text-white"
                            >Delete</button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col items-center pb-10">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={img} alt={`Patient ${name}`} />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{getFormatedDate(dob)}</span>
                <div className="flex mt-4 space-x-3 md:mt-6">
                    <Link
                        to={id}
                        className="inline-flex items-center px-4 py-2 font-medium text-center text-white bg-[#00CC88] rounded-lg hover:bg-[#238f6b]  focus:ring-4 focus:outline-none dark:bg-[#238f6b] dark:hover:bg-[#00CC88]">
                        View details
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Card
