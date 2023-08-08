import { useContext, useState } from 'react'
import { DispatchModelContext, ModelContext } from '../context/model.dialog.contex';
import Model from '../utils/Model';
import { EditFormModel } from '../utils/Crude';

const LinkExistingData = () => {
    const [id, setId] = useState('')
    const { closeModel } = useContext(DispatchModelContext);
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(id)
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-6">
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="text"
                        name="id"
                        id="id"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        className="block py-2.5 px-0 w-full font-semibold text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required />
                    <label
                        htmlFor="title"
                        className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >Id</label>
                </div>
            </div>
            <div className='flex justify-end items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700'>
                <button
                    type="submit"
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2 dark:focus:ring-red-800">
                    Connect
                </button>
                <button
                    onClick={() => closeModel()}
                    type="button"
                    className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700" data-modal-toggle="delete-user-modal">
                    No, cancel
                </button>
            </div>
        </form>
    )
}


const ModelToOpen = (model) => {
    if (model.model.type === 'connect-existing-data' && model.model.context === 'guest') {
        return <Model open={true} >
            <EditFormModel title='Link existing data with user account'>
                <LinkExistingData />
            </EditFormModel>
        </Model>
    }
    return <h1>Sorry invalid model</h1>
}

const Overview = () => {
    const { isOpen, model } = useContext(ModelContext);
    const { openModel } = useContext(DispatchModelContext);
    const handleModelOpening = (type, context) => {
        openModel('', {
            type: type,
            context: context
        })
    }
    return (
        <>
            {isOpen && <ModelToOpen model={model} />}
            <div className="flex justify-center items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">

                <button className="mx-3 text-white bg-primary-700 hover:bg-primary-800   font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700"
                    type="button">I am new Patient</button>
                <button className="mx-3 text-white bg-gray-500 hover:bg-gray-600  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-500 dark:hover:bg-gray-700 "
                    type="button" onClick={() => handleModelOpening('connect-existing-data', 'guest')}>Connect me existing data</button>

            </div>
        </>


    )
}

export default Overview
