import React, { createContext, useContext } from 'react';
import useWizardFormHook from '../hooks/useWizardForm';

const WizardContext = createContext();

export function useWizardContext() {
    return useContext(WizardContext);
}

export function WizardProvider({ children, initialState }) {
    const [wizard, setWizard] = useWizardFormHook(initialState);

    const goToNextStep = () => {
        if (wizard.currentStep < wizard.steps.length - 1) {
            const currentDiv = wizard.steps[wizard.currentStep];
            if (currentDiv.validate) {
                const { isValid, errors } = currentDiv.validate(
                    currentDiv.formData.Schema,
                    currentDiv.formData.data
                );
                if (!isValid) {
                    setWizard({ type: 'SET_CURRENT_STEP_AS_COMPLETED', payload: { validated: false } });
                    setWizard({ type: 'SET_ERORR_CURRENT_STEP', payload: { errors: errors } });
                    return;
                }
            }
            setWizard({ type: 'SET_ERORR_CURRENT_STEP', payload: { errors: null } });
            setWizard({ type: 'SET_CURRENT_STEP_AS_COMPLETED', payload: { validated: true } });
            setWizard({ type: 'SET_CURRENT_STEP', payload: wizard.currentStep + 1 });
            setWizard({ type: 'SET_CURRENT_DIV', payload: wizard.steps[wizard.currentStep] });
        }
    };

    const goToPreviousStep = () => {
        if (wizard.currentStep > 0) {
            setWizard({ type: 'SET_CURRENT_STEP', payload: wizard.currentStep - 1 });
            setWizard({ type: 'SET_CURRENT_DIV', payload: wizard.steps[wizard.currentStep] });
        }
    };

    const completed = (step) => {
        return wizard.steps[step].validated
    }
    const activeStep = (step) => step === wizard.currentStep
    const firstStep = wizard.currentStep === 0
    const lastStep = wizard.currentStep === wizard.steps.length - 1
    const continueStep = wizard.currentStep === wizard.steps.length - 2
    const subtmitForm = wizard.currentStep === wizard.steps.length - 2
    return (
        <WizardContext.Provider
            value={{ wizard, completed, firstStep, lastStep, continueStep, subtmitForm, activeStep, setWizard, goToNextStep, goToPreviousStep }}
        >
            {children}
        </WizardContext.Provider>
    );
}

