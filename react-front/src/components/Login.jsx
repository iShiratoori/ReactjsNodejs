import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSession } from '../components/context/session.context';
import { LoadingContext, LoadingDispatchContext } from '../components/context/loading.context';
import Loading from '../components/utils/Loading'
const Login = () => {
    const { session, login } = useSession();
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null);
    // const [isLogged, setIsLogged] = useState(null);
    const { isLoadingState } = useContext(LoadingContext)
    const { setIsLoadingState } = useContext(LoadingDispatchContext)
    useEffect(() => {
        if (session) {
            return navigate(`/dashboard/${session.role}/`);
        }
        //eslint-disable-next-line
    }, [session])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoadingState({ isLoading: true, type: '', text: '' })
        setError(null)
        try {
            const userData = { username, password }
            const res = await login(userData);
            if (res) {
                // setIsLogged('You are logged successfully')
            }
            setIsLoadingState({ isLoading: false, type: '', text: '' })
        } catch (err) {
            setError(err.message)
        }
    };

    const className = "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    const errorClassName = 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
    const errorlabelClassName = 'block mb-2 text-sm font-medium text-red-700 dark:text-red-500'
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link
                    to="/"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    dentalClinic
                </Link>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        {error &&
                            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                                <span class="font-medium"> {error} </span>
                            </p>
                        }
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4 md:space-y-6"
                        >
                            <div>
                                <label
                                    htmlFor="username"
                                    className={`${error ? errorlabelClassName : 'block mb-2 text-sm font-medium text-gray-900 dark:text-white'}`}>
                                    Your Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="username"
                                    className={error ? errorClassName : className}
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className={`${error ? errorlabelClassName : 'block mb-2 text-sm font-medium text-gray-900 dark:text-white'}`}>
                                    Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={error ? errorClassName : className}
                                    required />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="remember"
                                            className="text-gray-500 dark:text-gray-300">
                                            Remember me</label>
                                    </div>
                                </div>
                                <Link
                                    to="/forget-password"
                                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    Forgot password?</Link>
                            </div>
                            {isLoadingState.isLoading
                                ? <Loading /> :
                                (
                                    <button
                                        type="submit"
                                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        Sign in</button>
                                )
                            }
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
