import { useState } from 'react';

function useWizardFormHook(initialSteps, validate) {
    const [steps, setSteps] = useState(initialSteps);
    const [currentStep, setCurrentStep] = useState(0);

    const goToNextStep = () => {
        if (currentStep < steps.length - 1) {
            // const {err}= validate()
            // if(err) return  
            setCurrentStep(currentStep + 1);
        }
    };

    const goToPreviousStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return {
        backward: goToPreviousStep,
        forward: goToNextStep,
        steps: steps.length,
        currentStep,
        currentDiv: steps[currentStep],
        firstStep: currentStep + 1 === 1,
        lastStep: currentStep + 1 === steps.length,
        activeStep: (stage) => {
            return stage - 1 === currentStep
        },
        completed: (stage) => {
            return stage - 1 < currentStep
        }
    };
}


export default useWizardFormHook;
