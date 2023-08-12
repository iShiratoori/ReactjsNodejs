import { getFullName } from "../helpers"
import { useContext, useEffect } from "react"
import { DispatchModelContext, ModelContext } from "../context/model.dialog.contex"
import DentistForm from "../utils/DentistForm"
import Model from "../utils/Model"
import { DeleteFormModel, EditFormModel } from "../utils/Crude"
import { performAPIRequest } from "../../server/server"
import DentistList from '../utils/DentistList'
import { SearchContext } from "../context/search.context"
import { useServerDispatch } from "../context/data.context"

const EditDentist = ({ data }) => {
    return (
        <Model open={true} >
            <EditFormModel title='Editing Dentist Details'>
                <DentistForm dentist={data} />
            </EditFormModel>
        </Model>
    )
}

const LinkToPatient = () => {
    return (
        <Model
            open={true}
            title='Linking Patient to Dentist' >
        </Model>
    )
}


const LinkToUser = () => {
    return (
        <Model
            open={true}>
            <DeleteFormModel>
                <div className="p-6 pt-0 text-center">
                    <svg className="w-16 h-16 mx-auto text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <h3 className="mt-5 mb-6 text-lg text-gray-500 dark:text-gray-400">
                        Linking dentist To patient?
                    </h3>
                    <button
                        type="submit"
                        lassName="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2 dark:focus:ring-red-800">
                        Yes, I'm sure
                    </button>
                    <button
                        type="button"
                        className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700" data-modal-toggle="delete-user-modal">
                        No, cancel
                    </button>
                </div>
            </DeleteFormModel>
        </Model>
    )
}

const DeleteDentist = () => {
    const { setServerData } = useServerDispatch();
    const { data } = useContext(ModelContext)
    const { closeModel } = useContext(DispatchModelContext)
    const handleDeletion = async (e) => {
        e.preventDefault();
        try {
            const res = await performAPIRequest('api/admin/dentists', 'Delete', {
                dentistId: data._id
            })
            setServerData({ type: 'DENTISTS', data: res.dentists })
            closeModel()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Model open={true}>
            <DeleteFormModel>
                <div className="p-6 pt-0 text-center">
                    <svg className="w-16 h-16 mx-auto text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <h3 className="mt-5 mb-6 text-lg text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this dentist?
                    </h3>
                    <h3 className="mt-3 text-lg text-gray-500 dark:text-gray-400">
                        Name: {getFullName(data.name)}
                    </h3>
                    <h3 className="mb-6 text-lg text-gray-500 dark:text-gray-400">
                        Id: {data._id}
                    </h3>
                    <form onSubmit={handleDeletion}>
                        <button
                            type="submit"
                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2 dark:focus:ring-red-800">
                            Yes, I'm sure
                        </button>
                        <button
                            type="button"
                            className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700" data-modal-toggle="delete-user-modal">
                            No, cancel
                        </button>
                    </form>
                </div>
            </DeleteFormModel>
        </Model>
    )
}

const ModelToOpen = (model) => {
    const { data } = useContext(ModelContext);
    if (model.model.type === 'edit' && model.model.context === 'dentist') {
        return <EditDentist data={data} />
    }
    if (model.model.type === 'link-to-patient' && model.model.context === 'dentist') {
        return <LinkToPatient />
    }
    if (model.model.type === 'link-to-user' && model.model.context === 'dentist') {
        return <LinkToUser />
    }
    if (model.model.type === 'delete' && model.model.context === 'dentist') {
        return <DeleteDentist />
    }
    return <h1>Sorry invalid model</h1>
}


const Dentists = () => {
    const { data, handleSearch } = useContext(SearchContext)
    const { isOpen, model } = useContext(ModelContext);

    useEffect(() => {
        document.title = `${data.dentists.originalData.length} Dentists`;
        handleSearch('', 'dentists')
        //eslint-disable-next-line
    }, [])

    return (
        <>
            {isOpen && <ModelToOpen model={model} />}
            <DentistList dentists={data.dentists} handleSearch={handleSearch} />
        </>
    )
}

export default Dentists