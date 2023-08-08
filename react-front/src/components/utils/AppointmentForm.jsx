import React from 'react'
import useInput from '../hooks/useInput'

const appointSchema = {
  appointment: {
    pateintId: '',
    dentistId: '',
    type: '',
    date: '',
    time: '',
  }
}


const AppointmentForm = ({ submitForm }) => {
  const [newappoinment, handleNewAppoinmentChange] = useInput(appointSchema.appointment)
  const handleSubmit = (e) => {
    e.preventDefault()
    submitForm(newappoinment)
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="p-6 space-y-6">
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="pateintId"
            id="pateintId"
            value={newappoinment.pateintId}
            onChange={handleNewAppoinmentChange}
            className="block py-2.5 px-0 w-full font-semibold text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required />
          <label
            htmlFor="pateintId"
            className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Patient ID</label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="dentistId"
            id="title"
            value={newappoinment.dentistId}
            onChange={handleNewAppoinmentChange}
            className="block py-2.5 px-0 w-full font-semibold text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required />
          <label
            htmlFor="dentistId"
            className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Dentist ID</label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="type"
            id="type"
            value={newappoinment.type}
            onChange={handleNewAppoinmentChange}
            className="block py-2.5 px-0 w-full font-semibold text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required />
          <label
            htmlFor="type"
            className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Type</label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="date"
            name="date"
            id="date"
            value={newappoinment.date}
            onChange={handleNewAppoinmentChange}
            className="block py-2.5 px-0 w-full font-semibold text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required />
          <label
            htmlFor="date"
            className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Date</label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="time"
            name="time"
            id="time"
            value={newappoinment.time}
            onChange={handleNewAppoinmentChange}
            className="block py-2.5 px-0 w-full font-semibold text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required />
          <label
            htmlFor="time"
            className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Time</label>
        </div>
      </div>
      <div className="flex justify-end items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
        <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="submit">Save</button>
      </div>
    </form>
  )
}

export default AppointmentForm
