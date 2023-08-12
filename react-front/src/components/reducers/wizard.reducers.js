
const returnUpdatedStep = (state, stepIndex, updatedProperties) => {
    const updatedSteps = [...state.steps];
    updatedSteps[stepIndex] = {
        ...updatedSteps[stepIndex],
        ...updatedProperties,
    };
    return updatedSteps;
};

export function wizardReducer(state, action) {
    switch (action.type) {
        case 'UPDATE_FORM_DATA':
            const { formData } = action.payload;
            const updatedSteps = returnUpdatedStep(state, state.currentStep, {
                formData: {
                    ...state.steps[state.currentStep].formData,
                    ...formData,
                },
            });
            return { ...state, steps: updatedSteps };
        case 'SET_STEPS':
            return { ...state, steps: action.payload };
        case 'SET_ERORR_CURRENT_STEP':
            const stepError = returnUpdatedStep(state, state.currentStep, action.payload);
            return { ...state, steps: stepError };
        case 'SET_CURRENT_STEP':
            return { ...state, currentStep: action.payload };
        case 'SET_CURRENT_DIV':
            return { ...state, currentDiv: action.payload };
        case 'SET_CURRENT_STEP_AS_COMPLETED':
            const updateStepAsCompleted = returnUpdatedStep(state, state.currentStep, action.payload);

            return { ...state, steps: updateStepAsCompleted };
        default:
            return state;
    }
}