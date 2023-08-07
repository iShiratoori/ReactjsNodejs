import { createContext, useState } from 'react';

export const ErrorContext = createContext();
export const DispatchErrorContext = createContext();
export const ErrorContextProdiver = ({ children }) => {
    const [hasError, setHasError] = useState(null);

    const dispatchError = (error) => {
        setHasError(error);
    };

    return (
        <ErrorContext.Provider value={{ hasError }}>
            <DispatchErrorContext.Provider value={{ dispatchError }}>
                {children}
            </DispatchErrorContext.Provider>
        </ErrorContext.Provider>
    );
};
