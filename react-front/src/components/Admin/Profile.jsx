import { useSession } from '../context/session.context'

const Profile = () => {
    const { session } = useSession()
    return (
        <div className='dark:text-gray-500'>
            <p>Your Details</p>
            <div className='flex flex-col'>
                <div className='mx-auto'>
                    <div className='text-center'>
                        <img src={session.user.image.url}
                            className='w-36 h-36 rounded-full'
                        />
                        <span>@{session.user.username}</span>
                    </div>
                </div>
                <div className='mx-auto'>
                    <div>
                        <label>Email</label>
                        <div className='mt-3'>
                            <input
                                value={session.user.email}
                                disabled
                                className='p-2 rounded-xl w-full'
                                placeholder='Enter You Email'
                            />
                        </div>
                    </div>
                    <form className='flex flex-col'>
                        <label className='font-bold'>Change Password</label>
                        <div className='mt-3'>
                            <input
                                className='p-2 rounded-xl'
                                placeholder='Old password'
                            />
                        </div>
                        <div className='mt-3'>
                            <input
                                className='p-2 rounded-xl'
                                placeholder='New password'
                            />
                        </div>
                        <div className='mt-3'>
                            <input
                                className='p-2 rounded-xl'
                                placeholder='Enter new password again'
                            />
                        </div>
                        <button disabled className='ms-auto m-3 px-3 py-2 bg-blue-500 text-white rounded-xl disabled:bg-blue-300 disabled:cursor-not-allowed'>save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profile
