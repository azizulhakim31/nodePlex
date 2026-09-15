import { FaStar } from "react-icons/fa";

const MovieCard = ({ movie }) => {
    return (
      <div className="group overflow-hidden rounded-lg bg-slate-900 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      
      {/* Poster */}
      <div className="relative aspect-2/3 overflow-hidden">
        <img
          src={movie.image}
          alt={movie.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Rating */}
        <div className="absolute right-2 top-2 flex items-center gap-1 rounded bg-black/80 px-2 py-1 text-xs">
          <FaStar className="text-yellow-400" />
          <span>{movie.rating}</span>
        </div>
      </div>

      {/* Movie information */}
      <div className="p-3">
        <h3 className="truncate font-semibold">
          {movie.title}
        </h3>

        <div className="mt-1 flex justify-between text-sm text-gray-400">
          <span>{movie.year}</span>
          <span>{movie.genre}</span>
        </div>
      </div>

    </div>
    );
};

export default MovieCard;