import { createContext, useState } from 'react';
export const LoadingContext = createContext()
export const LoadingDispatchContext = createContext()

export const LoadingContextProvider = ({ children }) => {
    const [isLoadingState, setIsLoadingState] = useState({ isLoading: false, type: '', text: '' })

    return (
        <LoadingContext.Provider value={{ isLoadingState }}>
            <LoadingDispatchContext.Provider value={{ setIsLoadingState }}>
                {children}
            </LoadingDispatchContext.Provider>
        </LoadingContext.Provider>
    );
};