import useInput from '../hooks/useInput'

const PatientForm = ({ patient, submitToServer }) => {
    const [name, handleNameChange] = useInput(patient.name);
    const [address, handleAddressChange] = useInput(patient.address[0]);
    // const [contacts, handleContactsChange] = useInput(patient.contacts);

    const handleSubmit = async (e) => {
        e.preventDefault()
        submitToServer({ name, address })
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-6">
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={name.title}
                        onChange={handleNameChange}
                        className="block py-2.5 px-0 w-full font-semibold text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required />
                    <label
                        htmlFor="title"
                        className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >Title</label>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="text"
                            name="firstName"
                            id="first-name"
                            value={name.firstName}
                            onChange={handleNameChange}
                            className="block py-2.5 px-0 w-full font-semibold text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" " required />
                        <label
                            htmlFor="first-name"
                            className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >First Name</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="text"
                            name="lastName"
                            id="last-name"
                            value={name.lastName}
                            onChange={handleNameChange}
                            className="block py-2.5 px-0 w-full font-semibold text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" " required />
                        <label
                            htmlFor="last-name"
                            className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >Last name</label>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="text"
                            name="addressL1"
                            id="addressL1"
                            value={address.addressL1}
                            onChange={handleAddressChange}
                            className="block py-2.5 px-0 w-full font-semibold text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required />
                        <label
                            htmlFor="addressL1"
                            className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >Address Line 1</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="text"
                            name="addressL2"
                            id="addressL2"
                            value={address.addressL2}
                            onChange={handleAddressChange}
                            className="block py-2.5 px-0 w-full font-semibold text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="" />
                        <label
                            htmlFor="addressL2"
                            className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >Address Line 2</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="text"
                            name="postCode"
                            id="postCode"
                            value={address.postCode}
                            onChange={handleAddressChange}
                            className="block py-2.5 px-0 w-full font-semibold text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=""
                            required />
                        <label
                            htmlFor="postCode"
                            className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >Postcode</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="text"
                            name="country"
                            id="country"
                            value={address.country}
                            onChange={handleAddressChange}
                            className="block py-2.5 px-0 w-full font-semibold text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=""
                            required />
                        <label
                            htmlFor="country"
                            className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >Country</label>
                    </div>
                </div>
            </div>
            <div className="flex justify-end items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
                <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="submit">Save all</button>
            </div>
        </form>
    )
}

export default PatientForm
