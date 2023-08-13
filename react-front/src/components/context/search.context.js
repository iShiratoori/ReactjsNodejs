import React, { createContext, useContext, useState } from 'react';
import { getFullName } from '../helpers';
import { useEffect } from 'react';
import { LoadingDispatchContext } from './loading.context';

export const SearchContext = createContext();

export const SearchProvider = ({ children, serverData }) => {
    const [data, setSearchQueries] = useState({
        patients: { searchResult: '', originalData: [] },
        dentists: { searchResult: '', originalData: '' },
        users: '',
        appointments: '',
        payments: ''
    });
    const { setIsLoadingState, dispatchLoading } = useContext(LoadingDispatchContext);

    useEffect(() => {
        if (serverData) {
            setIsLoadingState({ isLoading: true, type: 'server', text: 'please wait filtering data' })
            setSearchQueries({
                patients: { searchResult: serverData.patients, originalData: serverData.patients },
                dentists: { searchResult: serverData.dentists, originalData: serverData.dentists },
                users: { searchResult: serverData.users, originalData: serverData.users },
                // appointments: { originalData: serverData.appointments },
                // payments: { originalData: serverData.payments }
            })
        }
        dispatchLoading()
        //eslint-disable-next-line
    }, [serverData])

    const handleSearch = (query, category) => {
        let filteredResults = [];
        switch (category) {
            case 'patients':
                if (data.patients.originalData) {
                    filteredResults = data.patients.originalData.filter(patient =>
                        getFullName(patient.name).toLowerCase().includes(query.toLowerCase())
                    );
                }
                setSearchQueries((prevState => ({
                    ...prevState,
                    patients: { searchResult: filteredResults, originalData: data.patients.originalData }
                })));
                break;
            case 'dentists':
                if (data.dentists.originalData) {
                    filteredResults = data.dentists.originalData.filter(dentist =>
                        getFullName(dentist.name).toLowerCase().includes(query.toLowerCase())
                    );
                }
                setSearchQueries((prevState => ({
                    ...prevState,
                    dentists: { searchResult: filteredResults, originalData: data.dentists.originalData }
                })));
                break;
            case 'users':
                if (data.users.originalData) {
                    filteredResults = data.users.originalData.filter(user =>
                        getFullName(user.name).toLowerCase().includes(query.toLowerCase())
                    );
                }
                setSearchQueries((prevState => ({
                    ...prevState,
                    users: { searchResult: filteredResults, originalData: data.users.originalData }
                })));
                break;
            // case 'appointments':
            //     filteredResults = appointments.filter(appointment =>
            //   // Implement your appointment search logic here
            // );
            //     break;
            // case 'payments':
            //     filteredResults = payments.filter(payment =>
            //   // Implement your payment search logic here
            // );
            //     break;
            default:
                break;
        }
    };

    return (
        <SearchContext.Provider value={{ data, setSearchQueries, handleSearch }}>
            {children}
        </SearchContext.Provider>
    );
};
