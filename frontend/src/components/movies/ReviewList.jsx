import { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { getMovieReviews } from '../../services/reviewService'

const ReviewList = ({ movieId, refreshKey }) => {
    const [data, setData] = useState({
        reviews: [],
        count: 0,
        averageRating: 0,
    })

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        let active = true

        const fetchReviews = async () => {
            setLoading(true)
            setError('')

            try {
                const result = await getMovieReviews(movieId)

                if (active) {
                    setData(result)
                }
            } catch {
                if (active) {
                    setError('Unable to load reviews.')
                }
            } finally {
                if (active) {
                    setLoading(false)
                }
            }
        }

        fetchReviews()

        return () => {
            active = false
        }
    }, [movieId, refreshKey])

    return (
        <section className="mt-10">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-2xl font-bold">
                    Community Reviews ({data.count})
                </h2>

                {data.count > 0 && (
                    <p className="flex items-center gap-2 text-gray-300">
                        <FaStar className="text-yellow-400" />
                        {data.averageRating}/10 average
                    </p>
                )}
            </div>

            {loading ? (
                <p className="text-gray-400">Loading reviews...</p>
            ) : error ? (
                <p className="text-red-400">{error}</p>
            ) : data.reviews.length === 0 ? (
                <div className="rounded-lg border border-gray-800 bg-[#181818] p-6 text-gray-400">
                    No reviews yet. Be the first to share your thoughts!
                </div>
            ) : (
                <div className="space-y-4">
                    {data.reviews.map((review) => (
                        <article
                            key={review._id}
                            className="rounded-lg border border-gray-800 bg-[#181818] p-5"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <h3 className="font-semibold">
                                    {review.userName}
                                </h3>

                                <span className="flex items-center gap-2 text-sm text-yellow-400">
                                    <FaStar />
                                    {review.rating}/10
                                </span>
                            </div>

                            <p className="mt-3 whitespace-pre-wrap text-gray-300">
                                {review.comment}
                            </p>

                            <p className="mt-4 text-xs text-gray-500">
                                {new Date(review.updatedAt).toLocaleDateString()}
                            </p>
                        </article>
                    ))}
                </div>
            )}
        </section>
    )
}

export default ReviewList