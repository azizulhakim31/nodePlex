import { useEffect, useState } from 'react'
import { FaStar, FaTrash } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import { deleteReview, getMovieReviews } from '../../services/reviewService'

const ReviewList = ({ movieId, refreshKey, onReviewDeleted }) => {
    const { user } = useAuth()
    const [data, setData] = useState({
        reviews: [],
        count: 0,
        averageRating: 0,
    })

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [deleteError, setDeleteError] = useState('')
    const [deletingReviewId, setDeletingReviewId] = useState('')

    const handleDelete = async (reviewId) => {
        if (!window.confirm('Delete your review? This action cannot be undone.')) {
            return
        }

        setDeletingReviewId(reviewId)
        setDeleteError('')

        try {
            await deleteReview(movieId)

            if (typeof onReviewDeleted === 'function') {
                await onReviewDeleted()
            }
        } catch (error) {
            setDeleteError(
                error.response?.data?.message ||
                'Unable to delete your review.'
            )
        } finally {
            setDeletingReviewId('')
        }
    }

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

            {deleteError && (
                <p className="mb-4 text-sm text-red-400">{deleteError}</p>
            )}

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

                            {user && String(review.user) === String(user.id) && (
                                <button
                                    type="button"
                                    onClick={() => handleDelete(review._id)}
                                    disabled={Boolean(deletingReviewId)}
                                    aria-label="Delete your review"
                                    className="mt-4 inline-flex items-center gap-2 text-sm text-red-400 transition hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <FaTrash />
                                    {deletingReviewId ? 'Deleting...' : 'Delete review'}
                                </button>
                            )}
                        </article>
                    ))}
                </div>
            )}
        </section>
    )
}

export default ReviewList