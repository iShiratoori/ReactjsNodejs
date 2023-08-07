import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterUser } from '../server/server';

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isRegistered, setIsRegistered] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            if (isRegistered) {
                return navigate('/login');
            }
        }, 3000);
    }, [isRegistered, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null)
        try {
            const userData = { username, email, password };
            const res = await RegisterUser(userData, 'api/register');
            setIsRegistered(res.message)
        } catch (error) {
            const type = error.text.includes('username') ? 'username' : error.text.includes('Email') ? 'email' : 'unknown';
            setError({
                type: type,
                text: error.text
            })
        }

    };

    const className = `bg-gray-50 border border-grey-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`
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
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4 md:space-y-6"
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className={`${error && error.type === 'email' ? errorlabelClassName : 'block mb-2 text-sm font-medium text-gray-900 dark:text-white'}`}>
                                    Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                    className={error && error.type === 'email' ? errorClassName : className}
                                    required
                                />
                                {error &&
                                    error.type === 'email' ?
                                    (
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                                            <span class="font-medium">Oh, snapp!</span> {error.text}.
                                        </p>
                                    ) : ''
                                }
                            </div>
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="username"
                                    className={error && error.type === 'username' ? errorClassName : className}
                                    required
                                />
                                {error &&
                                    error.type === 'username' ?
                                    (
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                                            <span class="font-medium">Oh, snapp!</span> {error.text}.
                                        </p>
                                    ) : ''
                                }
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={className}
                                    required />
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Register</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Have an account already?
                                <Link
                                    to="/login"
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    Sign in</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
