function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-[#0b0b11]">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1600&q=80')",
                }}
            />
            <div className="absolute inset-0 bg-linear-to-r from-[#0b0b11] via-[#0b0b11]/85 to-[#0b0b11]/40" />

            <div className="relative z-10 mx-auto flex min-h-[72vh] max-w-7xl items-center px-6 py-20">
                <div className="max-w-xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-red-300">
                        <span className="h-2 w-2 rounded-full bg-red-500" />
                        Featured movie
                    </div>

                    <h1 className="mt-6 text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-7xl">
                        Discover stories <span className="text-red-500">worth watching</span>
                    </h1>

                    <p className="mt-5 max-w-lg text-base text-gray-300 sm:text-lg">
                        Find the next big obsession with handpicked movies, trending picks, and your perfect watchlist.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <button className="rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-900/30 transition hover:-translate-y-0.5 hover:bg-red-500 active:translate-y-0">
                            Explore Movies
                        </button>

                        <button className="rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black">
                            Watch Trailer
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection