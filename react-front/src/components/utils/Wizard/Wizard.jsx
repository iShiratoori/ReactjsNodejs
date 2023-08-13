import { Link } from 'react-router-dom'
import { useWizardContext } from '../../context/wizard.context';
import { useContext, useEffect } from 'react';
import { LoadingContext, LoadingDispatchContext } from '../../context/loading.context';
import Loading from '../Loading';
const Wizard = ({ submitToServer }) => {
    const { isLoadingState } = useContext(LoadingContext)
    const { setIsLoadingState, dispatchLoading } = useContext(LoadingDispatchContext)
    const { wizard, setWizard, firstStep, completed, activeStep, lastStep, continueStep, subtmitForm, goToNextStep, goToPreviousStep } = useWizardContext()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoadingState({ isLoading: true, text: 'Registering', type: 'New Patient' })
        goToNextStep()
        const res = await submitToServer(wizard.steps[0].formData.data)
        setWizard({
            type: 'UPDATE_FORM_DATA',
            payload: {
                formData: {
                    data: res,
                }
            },
        });
        dispatchLoading()
    }

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
                    <div className="flex justify-between mt-auto">
                        {wizard.headers.map((header, index) => (
                            <div
                                key={index}
                                className={`stepper-item  ${completed(index) ? 'completed' : activeStep(index) ? 'active' : ''}`}>
                                <div className="step-counter">{index + 1}</div>
                                <div className="text-center">{header}</div>
                            </div>
                        ))}
                    </div><div className='grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3'>
                        {/* {errors && <p className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">{errors.patient}</p>} */}
                        {isLoadingState.isLoading ?
                            <div className="md:col-span-5 mt-20 text-center">
                                <Loading
                                    size={'sm'}
                                    text={isLoadingState.text}
                                    type={isLoadingState.type} />
                            </div>
                            : wizard.currentDiv.step}
                    </div>

                    <div className='flex justify-end mt-5'>
                        {!firstStep && <button type='button' onClick={goToPreviousStep} className='bg-gray-500 text-white font-semibold py-3 px-5 mx-3 rounded-md'>Previous</button>}
                        {!lastStep &&
                            <>
                                {!continueStep && <button type='button' onClick={goToNextStep} className='bg-[#4438CA] text-white font-semibold py-3 px-5 mx-3 rounded-md'>Continue</button>}
                                {subtmitForm && <button type='submit' className='bg-[#4438CA] text-white font-semibold py-3 px-5 mx-3 rounded-md'>Submit</button>}
                            </>
                        }
                    </div>
                </div>
            </div>
        </form >
    )
}


export default Wizard 
