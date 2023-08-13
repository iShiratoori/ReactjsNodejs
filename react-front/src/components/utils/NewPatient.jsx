import { memo, useEffect, useState } from 'react';
import Wizard from './Wizard/Wizard';
import useInput from '../hooks/useInput';
import { patientSchema } from '../utils/Schema';
import { WizardProvider, useWizardContext } from '../context/wizard.context';
import { performAPIRequest } from '../../server/server';
import { useServerDispatch } from '../context/data.context';
const Joi = require('joi');
const IntitialFormData = {
    patient: {
        name: {
            title: '',
            firstName: '',
            lastName: '',
        },
        dob: '',
        gender: '',
        contacts: {
            phone: '',
            email: '',
        },
        address: {
            addressL1: '',
            addressL2: '',
            postCode: '',
            country: '',
        },
        image: {
            public_id: '',
            url: '',
        }
    },

}





const StageOne = () => {
    const { wizard, setWizard } = useWizardContext()
    const [name, handleNameChange] = useInput(wizard.currentDiv.formData.data.patient.name);
    const [contacts, handleContactsChange] = useInput(wizard.currentDiv.formData.data.patient.contacts);
    const [address, handleAddressChange] = useInput(wizard.currentDiv.formData.data.patient.address);
    const [gender, handleGenderChange] = useState(wizard.currentDiv.formData.data.patient.gender);
    const [dob, handleDOBChange] = useState(wizard.currentDiv.formData.data.patient.dob);
    // const [image, setimage] = useState({})
    useEffect(() => {
        setWizard({
            type: 'UPDATE_FORM_DATA',
            payload: {
                formData: {
                    data: {
                        patient: {
                            name, contacts, address, gender, dob
                        }
                    },
                }
            },
        });
    }, [name, contacts, address, gender, dob, setWizard])

    const isErrorTitle = wizard.currentDiv.errors && wizard.currentDiv.errors.title
    const isErrorFirstName = wizard.currentDiv.errors && wizard.currentDiv.errors.firstName
    const isErrorLastName = wizard.currentDiv.errors && wizard.currentDiv.errors.lastName
    const isErrorGender = wizard.currentDiv.errors && wizard.currentDiv.errors.gender
    const isErrorDOB = wizard.currentDiv.errors && wizard.currentDiv.errors.dob
    const isErrorPhoneNumber = wizard.currentDiv.errors && wizard.currentDiv.errors.phone
    const isErrorEmail = wizard.currentDiv.errors && wizard.currentDiv.errors.email
    const isErrorAddressL1 = wizard.currentDiv.errors && wizard.currentDiv.errors.addressL1
    const isErrorPostCode = wizard.currentDiv.errors && wizard.currentDiv.errors.postCode
    const isErrorCountry = wizard.currentDiv.errors && wizard.currentDiv.errors.country


    const inputClassNames = 'h-10 border mt-1 rounded px-4 w-full bg-gray-50 font-medium'
    const errorClassName = 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
    const errorlabelClassName = 'block mb-2 text-sm font-medium text-red-700 dark:text-red-500'

    return (
        <>
            <div className="md:col-span-5">
                <label htmlFor="title" className={isErrorTitle && errorlabelClassName}>Title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={name.title}
                    onChange={handleNameChange}
                    className={isErrorTitle ? errorClassName : inputClassNames}
                    required />
            </div>
            {isErrorTitle && <p className="mb-2 text-sm text-red-600 dark:text-red-500 font-medium">{wizard.currentDiv.errors.title}</p>}
            <div className="md:col-span-5">
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div>
                        <label htmlFor="firstName" className={isErrorFirstName && errorlabelClassName}>First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={name.firstName}
                            onChange={handleNameChange}
                            className={isErrorFirstName ? errorClassName : inputClassNames}
                            required />
                        {isErrorFirstName && <p className="mb-2 text-sm text-red-600 dark:text-red-500 font-medium">{wizard.currentDiv.errors.firstName}</p>}
                    </div>
                    <div>
                        <label htmlFor="firstName" className={isErrorLastName && errorlabelClassName}>Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            value={name.lastName}
                            onChange={handleNameChange}
                            className={isErrorLastName ? errorClassName : inputClassNames}
                            required />
                        {isErrorLastName && <p className="mb-2 text-sm text-red-600 dark:text-red-500 font-medium">{wizard.currentDiv.errors.lastName}</p>}
                    </div>
                </div>
            </div>
            <div className="md:col-span-5">
                <div className="grid md:grid-cols-2 md:gap-6 mt-3">
                    <div>
                        <label htmlFor="gender" className={isErrorGender && errorlabelClassName}>Gender</label>
                        <input
                            type="text"
                            name="gender"
                            id="gender"
                            value={gender}
                            onChange={(e) => handleGenderChange(e.target.value)}
                            className={isErrorGender ? errorClassName : inputClassNames}
                            required />
                        {isErrorGender && <p className="mb-2 text-sm text-red-600 dark:text-red-500 font-medium">{wizard.currentDiv.errors.gender}</p>}
                    </div>
                    <div>
                        <label htmlFor="dob" className={isErrorDOB && errorlabelClassName}>DOB</label>
                        <input
                            type="date"
                            name="dob"
                            id="dob"
                            value={dob}
                            onChange={(e) => handleDOBChange(e.target.value)}
                            className={isErrorDOB ? errorClassName : inputClassNames}
                            required />
                        {isErrorDOB && <p className="mb-2 text-sm text-red-600 dark:text-red-500 font-medium">{wizard.currentDiv.errors.dob}</p>}
                    </div>
                </div>
            </div>
            <div className="md:col-span-5">
                <label htmlFor="phone">Contacts</label>
                <div className="grid md:grid-cols-2 md:gap-6 mt-3">
                    <div>
                        <label htmlFor="phone" className={isErrorPhoneNumber && errorlabelClassName}>Phone Number</label>
                        <input
                            type="number"
                            name="phone"
                            id="phone"
                            value={contacts.phone}
                            onChange={handleContactsChange}
                            className={isErrorPhoneNumber ? errorClassName : inputClassNames}
                            required />
                        {isErrorPhoneNumber && <p className="mb-2 text-sm text-red-600 dark:text-red-500 font-medium">{wizard.currentDiv.errors.phone}</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className={isErrorEmail && errorlabelClassName}>Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={contacts.email}
                            onChange={handleContactsChange}
                            className={isErrorEmail ? errorClassName : inputClassNames}
                            required /> {isErrorEmail && <p className="mb-2 text-sm text-red-600 dark:text-red-500 font-medium">{wizard.currentDiv.errors.email}</p>}
                    </div>
                </div>
            </div>

            <div className="md:col-span-5">
                <label htmlFor="address">Address</label>
                <div className="grid md:grid-cols-2 md:gap-6 mt-3">
                    <div>
                        <label htmlFor="addressL1" className={isErrorAddressL1 && errorlabelClassName}
                        >Address Line 1</label>
                        <input
                            type="text"
                            name="addressL1"
                            id="addressL1"
                            value={address.addressL1}
                            onChange={handleAddressChange}
                            className={isErrorAddressL1 ? errorClassName : inputClassNames}
                            required
                        /> {isErrorAddressL1 && <p className="mb-2 text-sm text-red-600 dark:text-red-500 font-medium">{wizard.currentDiv.errors.addressL1}</p>}

                    </div>
                    <div>
                        <label htmlFor="addressL2" >Address Line 2</label>
                        <input
                            type="text"
                            name="addressL2"
                            id="addressL2"
                            value={address.addressL2}
                            onChange={handleAddressChange}
                            className={inputClassNames} />
                    </div>
                    <div className="">
                        <label htmlFor="postCode" className={isErrorPostCode && errorlabelClassName}>Postcode</label>
                        <input
                            type="text"
                            name="postCode"
                            id="postCode"
                            value={address.postCode}
                            onChange={handleAddressChange}
                            className={isErrorPostCode ? errorClassName : inputClassNames}
                            placeholder="" />
                        {isErrorPostCode && <p className="mb-2 text-sm text-red-600 dark:text-red-500 font-medium">{wizard.currentDiv.errors.postCode}</p>}
                    </div>
                    <div className="">
                        <label htmlFor="country" className={isErrorCountry && errorlabelClassName}>Country</label>
                        <input
                            type="text"
                            name="country"
                            id="country"
                            value={address.country}
                            onChange={handleAddressChange}
                            className={isErrorCountry ? errorClassName : inputClassNames}
                            placeholder="" />
                        {isErrorCountry && <p className="mb-2 text-sm text-red-600 dark:text-red-500 font-medium">{wizard.currentDiv.errors.country}</p>}
                    </div>
                </div>
            </div>
        </>)
}
const questions = [
    "Blood refused by the Blood Transfusion Service?",
    "A bad reaction to general or local anaesthetic?",
    "A joint replacement or other implant?",
    "Allergies to any medicines(e.g. penicillin),substances (e.g. latex/rubber or foods)?",
    "Hay fever or eczema?",
    "Bronchitis, asthma or other chest condition?",
    "Fainting attacks, giddiness, blackouts, epilepsy?",
    "Muscle problems (e.g.myopathy, dystrophy, paralysis)?",
    "Heart problems (e.g. angina, blood pressure problems or stroke)?",
    "Diabetes(or does anyone in yourfamily)?",
    "Neurological(nerve) diseases(e.g. ‘neuropathies’,MS etc.)?Arthritis?",
    "Bruising or persistent bleeding following injury,tooth extraction orsurgery?",
    "Any infectious diseases(includingHIV, hepatitis, TB)?",
    "Stomach ulcers/hiatus hernia/indigestion?",
    // Add more questions here
];
const questionSchema = Joi.object({
    questions: Joi.array().items(
        Joi.object().keys({
            question: Joi.string().required(),
            value: Joi.boolean().required()
        })
    )
});

function useToggleForm(questions) {
    const [formData, setFormData] = useState(questions);
    const handleToggleChange = (e) => {
        setFormData((prevData) => {
            const updatedData = prevData.map(item => {
                if (item.question === e.target.name) {
                    return { ...item, value: !item.value };
                }
                return item;
            });
            return updatedData;
        });
    };

    return [formData, handleToggleChange];
}
const StageTwo = () => {
    const { wizard, setWizard } = useWizardContext()
    const [formData, handleToggleChange] = useToggleForm(wizard.currentDiv.formData.data.questions);
    useEffect(() => {
        setWizard({
            type: 'UPDATE_FORM_DATA',
            payload: {
                formData: {
                    data: {
                        questions: formData
                    },
                }
            },
        });
    }, [formData]);
    return (<>
        <div className="md:col-span-5 mt-5">
            <div className="p-4 mx-auto">
                {formData.map((q, index) => (
                    <label key={index} htmlFor={`question_${index}`} className={'flex items-center justify-between my-2'}>
                        {q.question}
                        <div className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                id={`question_${index}`}
                                name={q.question}
                                checked={formData[index].value}
                                onChange={handleToggleChange}
                                className="sr-only peer" />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <span className="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300">{formData[index].value ? 'Yes' : 'No'}</span>
                        </div>
                    </label>
                ))}
            </div>
        </div >
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
    const { wizard, setWizard } = useWizardContext()
    const { setServerData } = useServerDispatch();

    useEffect(() => {
        setWizard({ type: 'SET_CURRENT_STEP_AS_COMPLETED', payload: { validated: true } });
        setServerData({ type: 'PATIENTS', data: wizard.currentDiv.formData.data.patients })
        //eslint-disable-next-line
    }, [])
    return (
        <div className="md:col-span-5 mt-20 text-center">
            <p> New pateint successfully registered  </p>
        </div>
    )
}

const NewPatient = () => {
    const objectifyQuestions = Object.fromEntries(questions.map((question) => [question, '']))
    const stringFyQUestion = Object.entries(objectifyQuestions).map(([question, value]) => ({ question, value }));
    const validate = (Schema, data) => {
        const { error } = Schema.validate(data);
        if (!error) {
            return { isValid: true, errors: null }
        }
        const Errors = {};
        for (const item of error.details) {
            Errors[item.path[item.path.length - 1]] = item.message;
        }

        return { isValid: false, errors: Errors }
    }
    const initialState = {
        headers: ['Personal details', 'Medical History', 'Recap', 'Finish'],
        steps: [{
            step: <StageOne />,
            formData: {
                Schema: patientSchema,
                data: IntitialFormData
            },
            validate: validate,
            validated: false,
        },
        {
            step: <StageTwo />,
            formData: {
                Schema: questionSchema,
                data: {
                    questions: [...stringFyQUestion]
                }
            },
            validate: validate,
            validated: false,
        },
        {
            step: <StageThree />,
            formData: {},
            validated: false,
        },
        {
            step: <Finish />,
            formData: {},
            validated: false,
        }],
        currentStep: 0,
        currentDiv: '',
        isSubmitted: false,
    }
    useEffect(() => {
        document.title = 'New Patient Form';
        //eslint-disable-next-line
    }, [])
    const submitToServer = async (newPatient) => {
        const res = await performAPIRequest('api/admin/patients', 'POST', newPatient)
        return res
    }
    return (
        <WizardProvider initialState={initialState}>
            <Wizard submitToServer={submitToServer} />
        </WizardProvider>
    )
}

export default memo(NewPatient)
