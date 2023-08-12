import PatientCard from "./PatientCard"
import { getFullName } from "../helpers"
import { Link } from "react-router-dom"

const PatientList = ({ patients }) => {
    return (
        <>
            <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4">
                {patients.map((patient) => (
                    <PatientCard
                        patient={patient}
                        id={patient._id}
                        name={(getFullName(patient.name))}
                        dob={patient.dob}
                        img={patient.image.url}
                        key={patient._id}
                    />
                ))}
            </div>
        </>
    )
}

const Search = ({ patients, handleSearch }) => {
    const handleonChangeSearch = (e) => {
        handleSearch(e.target.value, 'patients')
    }

    return (
        <>
            <div className="mx-3 my-3">
                <div className="flex items-center">
                    <input id="exact-match"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded   dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="exact-match" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Exact Match</label>
                </div>
                <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="search"
                        onChange={handleonChangeSearch}
                        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                    <button
                        // onClick={() => handleSearch(searchQuery, 'patients')}
                        type="submit"
                        className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2">Search</button>
                </div>
            </div >
            <div className="flex justify-end mt-3">
                <Link to="new" className="flex  bg-[#00CC88] hover:bg-[#238f6b]  text-white font-bold py-2 px-2 rounded-lg shadow-2xl">
                    <div className="flex">
                        <div className="me-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-file-plus" viewBox="0 0 16 16">
                                <path d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5V6z" />
                                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
                            </svg>
                        </div>
                        <span>Add Patient</span>
                    </div>
                </Link>
            </div>
            <div className="mt-3">
                {patients.searchResult.length ?
                    <PatientList
                        patients={patients.searchResult} /> : (
                        <p className="mt-2 text-center text-red-600 dark:text-red-500">
                            <span className="font-medium">Sorry i can't find any patient </span>
                        </p>
                    )
                }
            </div>
        </>

    )
}

export default Search
