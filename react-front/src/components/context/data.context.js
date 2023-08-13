import { createContext, useContext } from 'react';
import { serverDataReducer } from '../reducers/serverData.reducers';
import useServerDataReducers from '../hooks/useServerDataReducers'
import { SearchProvider } from './search.context';
import Loading from '../utils/Loading';
import { LoadingContext } from './loading.context';
export const ServerDataContext = createContext()
export const ServerDataDispatchContext = createContext()

export function useServerData() {
    const context = useContext(ServerDataContext);
    if (!context) {
        throw new Error('useServerData must be used within  ServerDataProvider');
    }
    return context;
}
export function useServerDispatch() {
    const context = useContext(ServerDataDispatchContext);
    if (!context) {
        throw new Error('useServerDispatch must be used within  ServerDataProvider');
    }
    return context;
}
export const ServerDataProvider = ({ children, role }) => {
    const [serverData, setServerData] = useServerDataReducers(role, serverDataReducer);
    const { isLoadingState } = useContext(LoadingContext)

    return (
        <ServerDataContext.Provider value={{ serverData }}>
            <ServerDataDispatchContext.Provider value={{ setServerData }}>
                <SearchProvider serverData={serverData}>
                    {isLoadingState.isLoading && isLoadingState.type === 'server' ?
                        <Loading
                            size={'sm'}
                            text={isLoadingState.text}
                            type={isLoadingState.type} />
                        : children}
                </SearchProvider>
            </ServerDataDispatchContext.Provider>
        </ServerDataContext.Provider>
    );
};