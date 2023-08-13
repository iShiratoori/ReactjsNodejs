import { useContext, useEffect, useState } from "react"
import { DispatchModelContext, ModelContext } from "../context/model.dialog.contex"
import Model from '../utils/Model'
import PateintForm from '../utils/PateintForm'
import { DeleteFormModel, EditFormModel } from "../utils/Crude"
import { getFullName } from "../helpers"
import { performAPIRequest } from "../../server/server"
import PatientList from "../utils/PatientList"
import { SearchContext } from "../context/search.context"
import { useServerDispatch } from "../context/data.context"
import { LoadingContext, LoadingDispatchContext } from "../context/loading.context"
import Loading from "../utils/Loading"

const EditPatient = ({ data }) => {
    const submitToServer = async (patient) => {
        try {
            const res = await performAPIRequest('api/admin/patients', 'PUT', {
                patient
            })
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Model open={true}>
            <EditFormModel title={'Editing Patient Details'}>
                <PateintForm patient={data} submitToServer={submitToServer} />
            </EditFormModel>
        </Model>
    )
}

const LinkToDenist = () => {
    // const { data } = useContext(ModelContext)
    return (
        <Model open={true}>
            <EditFormModel title='Linking Patient to Dentist'>
                <form>
                    <div className="p-6 space-y-6">
                        <div className="col-span-6 sm:col-span-3">
                            <label
                                htmlFor="first-name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Patient id</label>
                            <input
                                type="text"
                                name="first-name"
                                id="first-name"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Bonnie"
                                required />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label
                                htmlFor="first-name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Dentist Id</label>
                            <input
                                type="text"
                                name="first-name"
                                id="first-name"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Bonnie"
                                required />
                        </div>
                    </div>
                    <div className="flex justify-end items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
                        <button
                            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            type="submit">Link
                        </button>
                    </div>
                </form>
            </EditFormModel>
        </Model>
    )
}
const LinkToUser = () => {
    return (
        <Model
            open={true}>
            <DeleteFormModel>
                <div className="p-6 pt-0 text-center">
                    <svg className="w-16 h-16 mx-auto text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <h3 className="mt-5 mb-6 text-lg text-gray-500 dark:text-gray-400">
                        Linking patient To dentist?
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


const DeletePatient = () => {
    const { setServerData } = useServerDispatch();
    const { data } = useContext(ModelContext)
    const [isDeleted, setIsDeleted] = useState(false)
    const { delayModelClose } = useContext(DispatchModelContext)
    const { setIsLoadingState, dispatchLoading } = useContext(LoadingDispatchContext)

    const handleDeletion = async (e) => {
        e.preventDefault();
        setIsLoadingState({ isLoading: true, text: '', type: '' })
        try {
            const res = await performAPIRequest('api/admin/patients', 'Delete', {
                patientId: data._id
            })
            dispatchLoading()
            setServerData({ type: 'PATIENTS', data: res.patients })
            setIsDeleted(true)
            delayModelClose()
        } catch (error) {
            setIsDeleted(false)
            dispatchLoading()
            console.log(error)
        }
    }
    return (
        <Model open={true}>
            <DeleteFormModel isDeleted={isDeleted}>
                <div className="p-6 pt-0 text-center">
                    <svg className="w-16 h-16 mx-auto text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <h3 className="mt-5 text-lg text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this patient?
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
    if (model.model.type === 'edit' && model.model.context === 'patient') {
        return <EditPatient data={data} />
    }
    if (model.model.type === 'link-to-dentist' && model.model.context === 'patient') {
        return <LinkToDenist />
    }
    if (model.model.type === 'link-to-user' && model.model.context === 'patient') {
        return <LinkToUser />
    }
    if (model.model.type === 'delete' && model.model.context === 'patient') {
        return <DeletePatient />
    }
    return <h1>Sorry invalid model</h1>
}

const Patients = () => {
    const { data, handleSearch } = useContext(SearchContext)
    const { isOpen, model } = useContext(ModelContext);
    useEffect(() => {
        document.title = `${data.patients.originalData.length} Patients`;
        handleSearch('', 'patients')
        //eslint-disable-next-line
    }, [])
    return (
        <>
            {isOpen && <ModelToOpen model={model} />}
            <PatientList patients={data.patients} handleSearch={handleSearch} />
        </>
    )
}

export default Patients
