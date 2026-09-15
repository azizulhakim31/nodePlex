import MovieSection from "../components/movies/MovieSection";
import movies from "../utils/movieData";

const Home = () => {
    return (
        <div className="px-6 py-10">
            <MovieSection
                title="Trending Now"
                movies={movies.slice(0, 6)} />
                
            <MovieSection
                title="Popular Movies"
                movies={[...movies].reverse()} />

        </div>
    );
};

export default Home;