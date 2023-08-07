import { Link } from 'react-router-dom'
import useWizardFormHook from '../hooks/useWizardFrom';


const StageOne = () => {
    const inputClassNames = 'h-10 border mt-1 rounded px-4 w-full bg-gray-50 font-medium'
    return (
        <>
            <div className="md:col-span-5">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    className={inputClassNames}
                    required />
            </div>
            <div className="md:col-span-5">
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div>
                        <label htmlFor="firstName" >First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            className={inputClassNames}
                            required />
                    </div>
                    <div>
                        <label htmlFor="firstName" >Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            className={inputClassNames}
                            required />
                    </div>
                </div>
            </div>
            <div className="md:col-span-5">
                <div className="grid md:grid-cols-2 md:gap-6 mt-3">
                    <div>
                        <label htmlFor="gender" >Gender</label>
                        <input
                            type="number"
                            name="gender"
                            id="gender"
                            className={inputClassNames}
                            required />
                    </div>
                    <div>
                        <label htmlFor="dob" >DOB</label>
                        <input
                            type="date"
                            name="dob"
                            id="dob"
                            className={inputClassNames}
                            required />
                    </div>
                </div>
            </div>
            <div className="md:col-span-5">
                <label htmlFor="phone">Contacts</label>
                <div className="grid md:grid-cols-2 md:gap-6 mt-3">
                    <div>
                        <label htmlFor="phone" >Phone Number</label>
                        <input
                            type="number"
                            name="phone"
                            id="phone"
                            className={inputClassNames}
                            required />
                    </div>
                    <div>
                        <label htmlFor="email" >Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className={inputClassNames}
                            required />
                    </div>
                </div>
            </div>

            <div className="md:col-span-5">
                <label htmlFor="address">Address</label>
                <div className="grid md:grid-cols-2 md:gap-6 mt-3">
                    <div>
                        <label htmlFor="addressL1" >Address Line 1</label>
                        <input
                            type="text"
                            name="addressL1"
                            id="addressL1"
                            className={inputClassNames} />
                    </div>
                    <div>
                        <label htmlFor="addressL2" >Address Line 2</label>
                        <input
                            type="text"
                            name="addressL2"
                            id="addressL2"
                            className={inputClassNames} />
                    </div>
                    <div className="">
                        <label htmlFor="postCode" >Postcode</label>
                        <input
                            type="text"
                            name="postCode"
                            id="postCode"
                            className={inputClassNames}
                            placeholder="" />
                    </div>
                    <div className="">
                        <label htmlFor="country" >Country</label>
                        <input
                            type="text"
                            name="country"
                            id="country"
                            className={inputClassNames}
                            placeholder="" />
                    </div>
                </div>
            </div>
        </>)
}

const StageTwo = () => {
    // const inputClassNames = 'h-10 border mt-1 rounded px-4 w-full bg-gray-50 font-medium'
    return (<>
        <div className="md:col-span-5 mt-20 text-center">
            <label htmlFor="" className='font-bold text-[40px]'>Pateint Medical history goes here</label>
        </div>
    </>)
}
const StageThree = () => {
    // const inputClassNames = 'h-10 border mt-1 rounded px-4 w-full bg-gray-50 font-medium'
    return (<>
        <div className="md:col-span-5 mt-20 text-center">
            <label htmlFor="" className='font-bold text-[40px]'>Recap goes here</label>
        </div>
    </>)
}

const Finish = () => {
    // const inputClassNames = 'h-10 border mt-1 rounded px-4 w-full bg-gray-50 font-medium'
    return (<>
        <div className="md:col-span-5 mt-20 text-center">
            <label htmlFor="" className='font-bold text-[40px]'>Finished</label>
        </div>
    </>)
}

const NewPatient = () => {
    const { backward, forward, /*currentStep, */ currentDiv, firstStep, lastStep, completed, activeStep } = useWizardFormHook([
        <StageOne />,
        <StageTwo />,
        <StageThree />,
        <Finish />
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('submitting')
    }
    // const stage = {
    //     completed: 'bg-blue-600 text-white rounded-full p-2 inline-block',
    //     active: '',
    //     default: 'border rounded-full border-gray-500 p-2 inline-block'
    // }
    return (
        <form onSubmit={handleSubmit}>
            <div className='mt-3 flex-col justify-center items-center'>
                <div className='bg-white dark:bg-gray-800 dark:text-white border-b p-2 flex items-center '>
                    <Link to={'/dashboard/admin/patients'}>
                        <div className='text-[30px]'><i className="bi bi-arrow-left-short"></i></div>
                    </Link>
                    <div>Registering Patient</div>
                </div>
                <div className='bg-white dark:bg-gray-800 dark:text-white rounded shadow-lg p-4 px-4 md:p-8 mb-6'>
                    <div className="stepper-wrapper">
                        <div className={`stepper-item  ${completed(1) ? 'completed' : activeStep(1) ? 'active' : ''}`}>
                            <div className="step-counter">1</div>
                            <div className="step-name">Personal Details</div>
                        </div>
                        <div className={`stepper-item  ${completed(2) ? 'completed' : activeStep(2) ? 'active' : ''}`}>
                            <div className="step-counter">2</div>
                            <div className="step-name">Medical History</div>
                        </div>
                        <div className={`stepper-item  ${completed(3) ? 'completed' : activeStep(3) ? 'active' : ''}`}>
                            <div className="step-counter">3</div>
                            <div className="step-name">Recap</div>
                        </div>
                        <div className={`stepper-item  ${completed(4) ? 'completed' : activeStep(4) ? 'active' : ''}`}>
                            <div className="step-counter">4</div>
                            <div className="step-name">Finish</div>
                        </div>
                    </div>
                    <div className='grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3'>
                        {currentDiv}
                    </div>
                    <div className='flex justify-end mt-5'>
                        {!firstStep && <button type='button' onClick={backward} className='bg-gray-500 text-white font-semibold py-3 px-5 mx-3 rounded-md'>Previous</button>}
                        {!lastStep && <button type='button' onClick={forward} className='bg-[#4438CA] text-white font-semibold py-3 px-5 mx-3 rounded-md'>Continue</button>}
                    </div>
                </div>
            </div>

        </form >
    )
}

export default NewPatient
