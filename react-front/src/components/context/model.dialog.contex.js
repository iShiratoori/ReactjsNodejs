import React, { createContext, useEffect, useRef, useState } from 'react';

export const ModelContext = createContext();
export const DispatchModelContext = createContext();

export const ModelContextProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [model, setModel] = useState({
        type: null,
        context: null
    });
    const [data, setData] = useState(null);
    const modelRef = useRef(null);
    const openModel = (data, m) => {
        if (!m || !m.type || !m.context) {
            throw new Error('Please specify model type and Context before opening')
        }
        setModel(m)
        setData(data)
        setIsOpen(true)
    };

    const closeModel = () => {
        setModel({ type: null, context: null })
        setData(null)
        setIsOpen(false);
    };

    const delayModelClose = (time) => {
        setTimeout(() => {
            closeModel()
        }, time || 5000);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (modelRef.current && !modelRef.current.contains(event.target)) {
                closeModel();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);
    return (
        <ModelContext.Provider value={{ isOpen, data, model }}>
            <DispatchModelContext.Provider value={{ openModel, closeModel, modelRef, setModel, delayModelClose }}>
                {children}
            </DispatchModelContext.Provider>
        </ModelContext.Provider>
    );
};