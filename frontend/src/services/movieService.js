import api from "./api"

export const getTrendingMovies = async () => {
    const response = await api.get("/movies/trending")

    return response.data.movies
}

export const getPopularMovies = async () => {
    const response = await api.get("/movies/popular")

    return response.data.movies
}