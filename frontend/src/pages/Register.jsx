import { FaFilm } from "react-icons/fa"
const Register = () => {
    return (
        <div className="flex min-h-[calc(100vh-73px)] items-center justify-center px-6">
            <div className="w-full max-w-md rounded-xl border border-gray-800 bg-[#181818] p-8">
                <div className="mb-8 text-center">
                    <div className="mb-4 flex justify-center">
                        <FaFilm className="text-4xl text-red-500" />
                    </div>

                    <h1 className="text-3xl font-bold">
                        Create Account
                    </h1>

                    <p className="mt-2 text-gray-400">
                        Join NodePlex and build your movie collection
                    </p>
                </div>

                <form className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm text-gray-300">Name</label>

                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full rounded-md border border-gray-700 bg-[#111] px-4 py-3 text-white outline-none transition focus:border-red-500"
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm text-gray-300">Email</label>

                        <input
                            type="text"
                            placeholder="youremail@example.com"
                            className="w-full rounded-md border border-gray-700 bg-[#111] px-4 py-3 text-white outline-none transition focus:border-red-500"
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm text-gray-300">Password</label>

                        <input
                            type="password"
                            placeholder="At least 6 characters"
                            className="w-full rounded-md border border-gray-700 bg-[#111] px-4 py-3 text-white outline-none transition focus:border-red-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-red-600 py-3 font-semibold transition hover:bg-red-700"
                    >
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;