import { createContext, useContext } from 'react';
import { serverDataReducer } from '../reducers/serverData.reducers';
import useServerDataReducers from '../hooks/useServerDataReducers'
import { SearchProvider } from './search.context';
export const ServerDataContext = createContext()
export const ServerDataDispatchContext = createContext()

export function useServerData() {
    const { serverData } = useContext(ServerDataContext);
    return serverData;
}

export const ServerDataProvider = ({ children, role }) => {
    const [serverData, setServerData] = useServerDataReducers('[]', role, serverDataReducer);
    return (
        <ServerDataContext.Provider value={{ serverData }}>
            <ServerDataDispatchContext.Provider value={{ setServerData }}>
                <SearchProvider serverData={serverData}>
                    {children}
                </SearchProvider>
            </ServerDataDispatchContext.Provider>
        </ServerDataContext.Provider>
    );
};