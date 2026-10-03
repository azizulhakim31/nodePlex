import { Link } from 'react-router-dom'
import { FaFilm } from 'react-icons/fa'

const Login = () => {
    return (
        <div className="flex min-h-[calc(100vh-73px)] items-center justify-center px-6">

            <div className="w-full max-w-md rounded-xl border border-gray-800 bg-[#181818] p-8">

                <div className="mb-8 text-center">

                    <div className="mb-4 flex justify-center">
                        <FaFilm className="text-4xl text-red-500" />
                    </div>

                    <h1 className="text-3xl font-bold">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-gray-400">
                        Sign in to continue to NodePlex
                    </p>

                </div>

                <form className="space-y-5">

                    <div>
                        <label className="mb-2 block text-sm text-gray-300">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full rounded-md border border-gray-700 bg-[#111] px-4 py-3 text-white outline-none transition focus:border-red-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-gray-300">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full rounded-md border border-gray-700 bg-[#111] px-4 py-3 text-white outline-none transition focus:border-red-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-red-600 py-3 font-semibold transition hover:bg-red-700"
                    >
                        Sign In
                    </button>

                </form>

                <p className="mt-6 text-center text-sm text-gray-400">
                    Don't have an account?{' '}
                    <Link
                        to="/register"
                        className="text-red-500 hover:text-red-400"
                    >
                        Create one
                    </Link>
                </p>

            </div>

        </div>
    )
}

export default Login