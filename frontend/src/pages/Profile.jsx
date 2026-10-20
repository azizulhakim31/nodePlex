import { useEffect, useState } from "react";

import { FaBookmark, FaComment, FaStar } from "react-icons/fa"

const Profile = () => {
    const [dashboard, setDashboard] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

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

    return (
        <div>

        </div>
    );
};

export default Profile;