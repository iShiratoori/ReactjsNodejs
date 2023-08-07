import { useContext, useEffect, useReducer, useState } from 'react'
import { performAPIRequest } from '../../server/server';
// import { LoadingDispatchContext } from "@/components/contexts/loading.context";
import { DispatchErrorContext, ErrorContext } from '../context/error.context'

function useServerDataReducers(API, role, reducer) {
    // const { setIsLoadingState } = useContext(LoadingDispatchContext)
    const { hasError } = useContext(ErrorContext)
    const { dispatchError } = useContext(DispatchErrorContext)
    const [data, setData] = useState(null);
    const [state, dispatch] = useReducer(reducer, data);


    useEffect(() => {
        const waitServer = async () => {
            // setIsLoadingState({ isLoading: true, text: 'Fetching data from', type: 'server', })
            try {
                const d = await performAPIRequest(`api/${role}`, 'GET');
                setData(d);
                // setIsLoadingState({ isLoading: false, type: '', text: '' })
            } catch (error) {
                // setIsLoadingState({ isLoading: false, type: '', text: '' })
                dispatchError(error)
            }
        }
        waitServer()
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (hasError) {
            throw new Error(hasError)
        }
    }, [hasError])

    useEffect(() => {
        dispatch({ type: 'update', data: data })
    }, [data]);

    return [state, dispatch];
}

export default useServerDataReducers