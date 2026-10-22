import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService"
import { updateProfile as saveProfile } from "../services/userService"

import { FaBookmark, FaCalendarAlt, FaComment, FaFilm, FaPen, FaStar, FaTimes } from "react-icons/fa"
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
    const { updateUser } = useAuth()
    const [dashboard, setDashboard] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [saving, setSaving] = useState(false)
    const [profileError, setProfileError] = useState("")

    useEffect(() => {
        let active = true

        const loadDashboard = async () => {
            try {
                const data = await getDashboard()

                if (active) {
                    setDashboard(data)
                }
            }
            catch (error) {
                if (active) {
                    setError(
                        error.response?.data?.message || "Could not load your dashboard."
                    )
                }
            }
            finally {
                if (active) {
                    setLoading(false)
                }
            }
        }

        loadDashboard()

        return () => {
            active = false
        }
    }, [])

    if (loading) {
        return (
            <div className="px-6 py-16 text-center text-gray-400">
                Loading your dashboard...
            </div>
        )
    }

    if (error || !dashboard) {
        return (
            <div className="mx-auto max-w-3xl px-6 py-16 text-center">
                <p className="text-red-400">
                    {error || "Dashboard unavaiable."}
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-5 rounded-md bg-red-600 px-5 py-2 font-semibold hover:bg-red-700">
                    Try Again
                </button>
            </div>
        )
    }

    const { user, watchlistCount, reviewCount, averageRating, reviews } = dashboard

    const joinedDate = user.joinedAt ? new Date(user.joinedAt).toLocaleDateString(undefined, {
        month: "long",
        year: "numeric"
    }) : "NodePlex member"

    const stats = [
        {
            label: "Watchlist Movies",
            value: watchlistCount,
            icon: FaBookmark
        },
        {
            label: "Reviews Written",
            value: reviewCount,
            icon: FaComment
        },
        {
            label: "Average Rating",
            value: `${averageRating}/10`,
            icon: FaStar
        },
    ]

    const openProfileEditor = () => {
        setName(user.name)
        setEmail(user.email)
        setProfileError("")
        setIsEditing(true)
    }

    const handleProfileSubmit = async (event) => {
        event.preventDefault()
        setProfileError("")
        setSaving(true)

        try {
            const updatedUser = await saveProfile({ name, email })
            setDashboard((currentDashboard) => ({
                ...currentDashboard,
                user: { ...currentDashboard.user, ...updatedUser }
            }))
            updateUser(updatedUser)
            setIsEditing(false)
        }
        catch (error) {
            setProfileError(
                error.response?.data?.message || "Could not update your profile."
            )
        }
        finally {
            setSaving(false)
        }
    }

    return (
        <div className="min-h-screen px-6 py-10">
            <div className="mx-auto max-w-7xl">

                <section className="relative overflow-hidden rounded-2xl border border-gray-800 bg-linear-to-br from-[#292020] via-[#181818] to-[#111] p-8 sm:p-10">
                    <button
                        type="button"
                        onClick={openProfileEditor}
                        aria-label="Edit profile"
                        title="Edit profile"
                        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-300 transition hover:border-red-500 hover:text-white"
                    >
                        <FaPen aria-hidden="true" />
                    </button>
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-red-600 text-3xl font-bold">
                            {user.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div>
                            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-red-400">
                                Your nodeplex
                            </p>
                            <h1 className="text-3xl font-bold sm:text-4xl">
                                {user.name}
                            </h1>
                            <p className="mt-2 text-gray-400">
                                {user.email}
                            </p>
                            <p className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                                <FaCalendarAlt />
                                Member since     {joinedDate}
                            </p>
                        </div>
                    </div>
                </section>

                {isEditing && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-8"
                        onMouseDown={(event) => {
                            if (event.target === event.currentTarget && !saving) {
                                setIsEditing(false)
                            }
                        }}
                    >
                        <section
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="edit-profile-title"
                            className="w-full max-w-md rounded-2xl border border-gray-700 bg-[#181818] p-6 shadow-2xl"
                        >
                            <div className="mb-6 flex items-center justify-between">
                                <h2 id="edit-profile-title" className="text-xl font-bold">
                                    Edit profile
                                </h2>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    disabled={saving}
                                    aria-label="Close profile editor"
                                    className="rounded p-2 text-gray-400 transition hover:text-white disabled:opacity-50"
                                >
                                    <FaTimes aria-hidden="true" />
                                </button>
                            </div>

                            <form onSubmit={handleProfileSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="profile-name" className="mb-2 block text-sm font-medium text-gray-300">
                                        Name
                                    </label>
                                    <input
                                        id="profile-name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                        className="w-full rounded-md border border-gray-700 bg-[#111] px-4 py-3 text-white outline-none focus:border-red-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="profile-email" className="mb-2 block text-sm font-medium text-gray-300">
                                        Email
                                    </label>
                                    <input
                                        id="profile-email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        className="w-full rounded-md border border-gray-700 bg-[#111] px-4 py-3 text-white outline-none focus:border-red-500"
                                    />
                                </div>

                                {profileError && (
                                    <p role="alert" className="text-sm text-red-400">
                                        {profileError}
                                    </p>
                                )}

                                <div className="flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        disabled={saving}
                                        className="rounded-md border border-gray-700 px-4 py-2 text-gray-300 transition hover:border-gray-500 disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="rounded-md bg-red-600 px-4 py-2 font-semibold transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {saving ? "Saving..." : "Save changes"}
                                    </button>
                                </div>
                            </form>
                        </section>
                    </div>
                )}

                <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {stats.map((stat) => {
                        const Icon = stat.icon

                        return (
                            <div
                                key={stat.label}
                                className="rounded-xl border border-gray-800 bg-[#181818] p-6"
                            >
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-400">
                                        {stat.label}
                                    </p>

                                    <Icon className="text-xl text-red-500" />
                                </div>

                                <p className="mt-4 text-3xl font-bold">
                                    {stat.value}
                                </p>
                            </div>
                        )
                    })}
                </section>

                <section className="mt-10">
                    <h2 className="mb-5 text-2xl font-bold">
                        Quick Actions
                    </h2>

                    <div className="flex gap-3 flex-wrap">
                        <Link
                            to="/watchlist" className="flex items-center gap-2 rounded-md bg-red-600 px-5 py-3 font-semibold transition hover:bg-red-700">
                            <FaBookmark />
                            My Watchlist
                        </Link>

                        <Link
                            to="/movies" className="flex items-center gap-2 rounded-md border border-gray-700 px-5 py-3 font-semibold transition hover:border-gray-500">
                            <FaFilm />
                            Discover Movies
                        </Link>
                    </div>
                </section>

                <section className="mt-10">
                    <h2 className="mb-5 text-2xl font-bold">
                        My Recent Reviews
                    </h2>

                    {reviews.length === 0 ? (
                        <div className="rounded-xl border border-gray-800 bg-[#181818] p-8 text-center">
                            <FaStar className="mx-auto text-3xl text-gray-600" />

                            <h3 className="mt-4 text-lg font-semibold">
                                No reviews yet
                            </h3>

                            <p className="mt-2 text-gray-400">
                                Rate a movie and share your thoughts to see your reviews here.
                            </p>

                            <Link
                                to="/movies"
                                className="mt-5 inline-block text-red-400 hover:text-red-300"
                            >
                                Explore movies →
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {reviews.map((review) => (
                                <article
                                    key={review._id}
                                    className="rounded-xl border border-gray-800 bg-[#181818] p-5 hover:scale-102 transition"
                                >
                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <Link
                                            to={`/movies/${review.movieId}`}
                                            className="font-bold transition hover:text-red-400"
                                        >
                                            {review.movieTitle
                                                ? review.movieTitle
                                                : 'Title unavailable'}
                                        </Link>

                                        <span className="flex items-center gap-2 text-sm text-yellow-400">
                                            <FaStar />
                                            {review.rating}/10
                                        </span>
                                    </div>

                                    <p className="mt-3 whitespace-pre-wrap leading-7 text-gray-300">
                                        {review.comment}
                                    </p>

                                    <p className="mt-4 text-xs text-gray-500">
                                        Updated{' '}
                                        {new Date(review.updatedAt).toLocaleDateString()}
                                    </p>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Profile;