const axios = require("axios");

const tmdbApi = axios.create({
    baseURL: process.env.TMDB_BASE_URL,
    headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        Accept: "application/json"
    }
})

const getTrendingMovies = async () => {
    const response = await tmdbApi.get("/trending/movie/week")

    return response.data.results
}

const getPopularMovies = async () => {
    const response = await tmdbApi.get("/movie/popular")

    return response.data.results
}

const searchMovies = async (query) => {
    const response = await tmdbApi.get("/search/movie", {
        params: {
            query: query
        }
    })
    return response.data.results
}

module.exports = {
    getTrendingMovies,
    getPopularMovies,
    searchMovies
}