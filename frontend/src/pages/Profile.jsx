import { FaUser } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

const Profile = () => {
    const { user } = useAuth()

    return (
        <div className="px-6 py-10">
            <div className="mx-auto max-w-3xl">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold">
                        My Profile
                    </h1>

                    <p className="mt-2 text-gray-400">
                        Manage your NodePlex account.
                    </p>
                </div>

                <div className="rounded-xl border border-gray-800 bg-[#181818] p-8">

                    <div className="mb-8 flex items-center gap-5">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600">
                            <FaUser className="text-2xl" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold">
                                {user?.name}
                            </h2>

                            <p className="text-gray-400">
                                {user?.email}
                            </p>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-6">
                        <p className="text-sm text-gray-500">
                            Account
                        </p>

                        <p className="mt-1 text-gray-300">
                            NodePlex Member
                        </p>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Profile