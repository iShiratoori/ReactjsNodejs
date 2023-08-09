import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterUser, uploadFileToServer } from '../server/server';
import { LoadingContext, LoadingDispatchContext } from '../components/context/loading.context';
import Loading from '../components/utils/Loading'

const Register = () => {
    const navigate = useNavigate();

    const { isLoadingState } = useContext(LoadingContext)
    const { setIsLoadingState } = useContext(LoadingDispatchContext)

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isRegistered, setIsRegistered] = useState(null);

    const [image, setImage] = useState({});
    const handleFileChange = async (e) => {
        setError(null)
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        const file = formData.get('file')
        const fileSizeInMB = file.size / (1024 * 1024)
        if (fileSizeInMB > 5) {
            setIsLoadingState({ isLoading: false, type: '', text: '' })
            setError({
                type: 'image',
                text: 'Image size is exceeded the limit 5mb'
            })
            return;
        }
        setIsLoadingState({ isLoading: true, type: `size: ${fileSizeInMB.toFixed(2)} MB`, text: 'uploading your image wait please' })
        const data = await uploadFileToServer('upload', 'POST', formData)
        setImage({
            public_id: data.filename,
            url: data.path,
        })
        setIsLoadingState({ isLoading: false, type: '', text: '' })
    };

    useEffect(() => {
        if (isRegistered) {
            return navigate('/login');
        };
        //eslint-disable-next-line
    }, [isRegistered]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoadingState({ isLoading: true, type: '', text: '' })
        setError(null)
        try {
            const userData = { username, email, password, image };
            const res = await RegisterUser(userData, 'api/register');
            setIsLoadingState({ isLoading: false, type: '', text: '' })
            setIsRegistered(res.message)
        } catch (error) {
            setIsLoadingState({ isLoading: false, type: '', text: '' })
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
                            Register for an account
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
                            <div className="relative z-0 w-full mb-6 group">
                                <input
                                    type="file"
                                    name="profileImage"
                                    id="profileImage"
                                    onChange={handleFileChange}
                                    className="block py-2.5 px-0 w-full font-semibold text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder="" />
                                <label
                                    htmlFor="profileImage"
                                    className={`${error && error.type === 'image' ? errorlabelClassName : 'peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'}`}>
                                    {`${error && error.type === 'image' ? error.text : 'Profile Image'}`}</label>
                            </div>
                            {isLoadingState.isLoading
                                ? <Loading
                                    size={'sm'}
                                    text={isLoadingState.text}
                                    type={isLoadingState.type}
                                /> :
                                (
                                    <button
                                        type="submit"
                                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        Register</button>
                                )}
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
