import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { saveReview } from '../../services/reviewService'

const ReviewForm = ({ movieId, movieTitle, onReviewSaved }) => {
    const { user } = useAuth()

    const [rating, setRating] = useState('8')
    const [comment, setComment] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setRating('8')
        setComment('')
        setMessage('')
        setError('')
    }, [movieId])

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!user) {
            setError('Please sign in to submit a review.')
            return
        }

        setLoading(true)
        setError('')
        setMessage('')

        try {
            await saveReview({
                movieId: Number(movieId),
                movieTitle,
                rating: Number(rating),
                comment,
            })

            setMessage('Your review has been saved!')
            setComment('')

            if (typeof onReviewSaved === 'function') {
                await onReviewSaved()
            }
        } catch (error) {
            setError(
                error.response?.data?.message ||
                'Unable to save your review.'
            )
        } finally {
            setLoading(false)
        }
    }

    if (!user) {
        return (
            <div className="rounded-lg border border-gray-800 bg-[#181818] p-5">
                <p className="text-gray-300">
                    Sign in to rate and review this movie.
                </p>
            </div>
        )
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-lg border border-gray-800 bg-[#181818] p-5"
        >
            <div>
                <label className="mb-2 block font-medium">
                    Your rating
                </label>

                <select
                    value={rating}
                    onChange={(event) => setRating(event.target.value)}
                    className="rounded-md border border-gray-700 bg-[#111] px-4 py-3 text-white outline-none focus:border-red-500"
                >
                    {Array.from({ length: 10 }, (_, index) => index + 1)
                        .reverse()
                        .map((value) => (
                            <option key={value} value={value}>
                                {value} / 10
                            </option>
                        ))}
                </select>
            </div>

            <div>
                <label className="mb-2 block font-medium">
                    Your review
                </label>

                <textarea
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    placeholder="What did you think of this movie?"
                    maxLength={500}
                    rows={4}
                    required
                    className="w-full resize-y rounded-md border border-gray-700 bg-[#111] px-4 py-3 text-white outline-none focus:border-red-500"
                />

                <p className="mt-1 text-right text-xs text-gray-500">
                    {comment.length}/500
                </p>
            </div>

            {error && (
                <p className="text-sm text-red-400">{error}</p>
            )}

            {message && (
                <p className="text-sm text-green-400">{message}</p>
            )}

            <button
                type="submit"
                disabled={loading || !comment.trim()}
                className="rounded-md bg-red-600 px-5 py-3 font-semibold transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading ? 'Saving...' : 'Submit Review'}
            </button>
        </form>
    )
}

export default ReviewForm