import MovieCard from "./MovieCard";

const MovieSection = ({ title, movies = { movies } }) => {
    return (
        <div className="px-6 py-8">

            <div className="mx-auto max-w-7xl">
                <h2 className="mb-5 text-2xl font-bold">
                    {title}
                </h2>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default MovieSection;