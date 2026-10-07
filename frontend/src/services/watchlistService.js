import api from "./api"

export const getWatchlist = async () => {
    const response = await api.get("/watchlist")

    return response.data.movies
}

export const addToWatchlist = async (movie) => {
    const response = await api.post("/watchlist", movie)

    return response.data.movies
}
export const removeFromWatchlist = async (movieId) => {
    const response = await api.delete(`/watchlist/${movieId}`)

    return response.data.movies
}