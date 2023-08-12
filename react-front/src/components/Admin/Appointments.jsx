import { useContext, useEffect } from "react"
import { useServerData, useServerDispatch } from "../context/data.context"
import { DispatchModelContext, ModelContext } from "../context/model.dialog.contex"
import AppointmentList from "../utils/AppointmentList"
import Model from "../utils/Model"
import AppointmentForm from "../utils/AppointmentForm"
import { DeleteFormModel, EditFormModel } from "../utils/Crude"
import { performAPIRequest } from "../../server/server"

const NewAppointment = () => {
    const submitForm = (data) => {
        console.log('submitting', data)
    }
    return (
        <Model open={true} >
            <EditFormModel title='Creating New Appoinment'>
                <AppointmentForm submitForm={submitForm} />
            </EditFormModel>
        </Model>
    )
}

const DeleteModel = () => {
    const { setServerData } = useServerDispatch();
    const { data } = useContext(ModelContext)
    const { closeModel } = useContext(DispatchModelContext)
    const deleteAppointment = async (e) => {
        e.preventDefault()
        const res = await performAPIRequest('api/admin/appointments', 'Delete', {
            appointmentId: data._id
        })
        setServerData({ type: 'APPOINTMENTS', data: res.appointments })
        closeModel()
    }
    return (
        <Model open={true}>
            <DeleteFormModel>
                <div className="p-6 pt-0 text-center">
                    <svg className="w-16 h-16 mx-auto text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <h3 className="mt-5 mb-6 text-lg text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this appointment?
                    </h3>
                    <h3 className="mb-6 text-lg text-gray-500 dark:text-gray-400">
                        Id: {data._id}
                    </h3>
                    <form onSubmit={deleteAppointment}>
                        <button
                            type="submit"
                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2 dark:focus:ring-red-800">
                            Yes, I'm sure
                        </button>
                        <button
                            onClick={() => closeModel()}
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
    if (model.model.type === 'new' && model.model.context === 'appointment') {
        return <NewAppointment data={data} />
    } if (model.model.type === 'delete' && model.model.context === 'appointment') {
        return <DeleteModel />
    }
    return <h1>Sorry invalid model</h1>
}


const Appointments = () => {
    const { serverData } = useServerData()
    const { isOpen, model } = useContext(ModelContext);
    useEffect(() => {
        document.title = `${serverData.appointments.length} Appointments`
        //eslint-disable-next-line
    }, [])
    if (serverData) {
        const appointments = serverData.appointments
        if (appointments.length) {
            return (
                <>
                    {isOpen && <ModelToOpen model={model} />}
                    <AppointmentList appointments={appointments} />
                </>
            )
        }
        return (
            <p className="mt-2 text-center text-red-600 dark:text-red-500">
                <span className="font-medium">Sorry i can't find any Appointments </span>
            </p>
        )
    }
    return (
        <div>
            <h1>there is no server</h1>
        </div>
    )
}

export default Appointments
