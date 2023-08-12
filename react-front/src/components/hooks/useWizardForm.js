import { useEffect, useReducer } from 'react';
import { wizardReducer } from '../reducers/wizard.reducers';

function useWizardFormHook(initialState) {
    const [state, dispatch] = useReducer(wizardReducer, {
        ...initialState
    });

    useEffect(() => {
        dispatch({ type: 'SET_CURRENT_DIV', payload: state.steps[state.currentStep] });
    }, [state.steps, state.currentStep])
    return [state, dispatch];

    // {
    //     backward: goToPreviousStep,
    //     forward: goToNextStep,
    //     upadateSteps: (steps) => {
    //         dispatch({ type: 'SET_STEPS', payload: steps });
    //     },
    //     steps: state.steps.length,
    //     activeStep: (stage) => stage - 1 === state.currentStep,
    //     completed: (stage) => {
    //         // state.steps[stage-1].validated
    //         // console.log(state.steps[stage - 1])
    //         return stage - 1 < state.currentStep
    //     },
    // }
}

export default useWizardFormHook;
