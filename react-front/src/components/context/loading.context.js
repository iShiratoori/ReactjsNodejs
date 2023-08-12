import { createContext, useState } from 'react';
export const LoadingContext = createContext()
export const LoadingDispatchContext = createContext()

export const LoadingContextProvider = ({ children }) => {
    const [isLoadingState, setIsLoadingState] = useState({ isLoading: false, type: '', text: '' })

    const dispatchLoading = () => {
        setTimeout(() => {
            setIsLoadingState({ isLoading: false, type: '', text: '' })
        }, 1000);
    }

    return (
        <LoadingContext.Provider value={{ isLoadingState }}>
            <LoadingDispatchContext.Provider value={{ setIsLoadingState, dispatchLoading }}>
                {children}
            </LoadingDispatchContext.Provider>
        </LoadingContext.Provider>
    );
};