import { useContext } from "react";
import { DispatchModelContext } from "../context/model.dialog.contex";

import { LoadingContext } from "../context/loading.context"
import Loading from './Loading'

export const EditFormModel = ({ children, title }) => {
    const { isLoadingState } = useContext(LoadingContext)
    const { closeModel } = useContext(DispatchModelContext);
    return (
        <div className="relative w-full h-full max-w-2xl px-4 md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
                    <h3 className="text-xl font-semibold dark:text-white">{title}</h3>
                    <button
                        onClick={() => closeModel()}
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <svg
                            className="w-5 h-5"
                            fillRule="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd">
                            </path>
                        </svg>
                    </button>
                </div>
                {isLoadingState.isLoading ? (
                    <div className="py-[100px]">
                        <Loading
                            text={isLoadingState.text}
                            type={isLoadingState.type}
                        />
                    </div>
                ) : (
                    children
                )}
            </div>
        </div>
    )
}


export const DeleteFormModel = ({ children }) => {
    const { closeModel } = useContext(DispatchModelContext);
    const { isLoadingState } = useContext(LoadingContext)
    return (
        <div className="relative w-full h-full max-w-md px-4 md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                <div className="flex justify-end p-2">
                    <button
                        onClick={() => closeModel()}
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"></path></svg>
                    </button>
                </div>
                {isLoadingState.isLoading ? (
                    <div className="py-[100px]">
                        <Loading
                            variant={'danger'}
                            text={isLoadingState.text}
                            type={isLoadingState.type}
                        />
                    </div>
                ) : (
                    children
                )}
            </div>
        </div>
    )
}