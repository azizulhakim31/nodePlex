# NodePlex

NodePlex is a movie discovery app for browsing and searching movies, reading and writing reviews, and keeping a personal watchlist.

## Features

- Browse trending and popular movies
- Search movies and view movie details
- Create an account and sign in
- Write reviews and manage a watchlist

## Tech stack

- Frontend: React and Vite
- Backend: Node.js, Express, and MongoDB
- Movie data: The Movie Database (TMDB)

## Getting started

### Requirements

- Node.js and npm
- A MongoDB database

### Configure the backend

Create `backend/.env` with the following values:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
JWT_EXPIRES_IN=7d
TMDB_BASE_URL=https://api.themoviedb.org/3
```

### Install dependencies

In a terminal, install the backend dependencies:

```bash
cd backend
npm install
```

In another terminal, install the frontend dependencies:

```bash
cd frontend
npm install
```

### Run the app

Start the backend from the `backend` directory:

```bash
npm run dev
```

Start the frontend from the `frontend` directory:

```bash
npm run dev
```

Open the local URL printed by Vite in your browser. The frontend currently connects to the backend at `http://localhost:5000/api`.
