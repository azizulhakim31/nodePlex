import api from "./api"

export const getMovieReviews = async (movieId) => {
    const response = await api.get(`/reviews/${movieId}`)
    return response.data
}

export const saveReview = async (reviewData) => {
    const response = await api.post("/reviews", reviewData)
    return response.data
}