import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();
export const DispatchThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme }}>
            <DispatchThemeContext.Provider value={{ toggleTheme }}>
                {children}
            </DispatchThemeContext.Provider>
        </ThemeContext.Provider>
    )
};

