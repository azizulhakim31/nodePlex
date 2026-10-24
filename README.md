# NodePlex

NodePlex is a movie discovery application where users can explore trending and popular movies, search for titles, read and write reviews, and manage a personal watchlist.

Live demo: [node-plex.vercel.app](https://node-plex.vercel.app)

## Features

- Browse popular and trending movies
- Search movies and explore movie details
- Register and sign in
- Add and manage movies in a personal watchlist
- Rate movies and write reviews
- Responsive interface for different screen sizes

## Tech stack

- Frontend: [React](https://react.dev/), [Vite](https://vite.dev/), [Tailwind CSS](https://tailwindcss.com/), and [Axios](https://axios-http.com/)
- Backend: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [MongoDB](https://www.mongodb.com/), [Mongoose](https://mongoosejs.com/), and [JSON Web Tokens](https://jwt.io/)
- Movie data: [The Movie Database (TMDB)](https://www.themoviedb.org/) ([API documentation](https://developer.themoviedb.org/docs))
- Deployment: [Vercel](https://vercel.com/) (frontend), [Render](https://render.com/) (backend), and [MongoDB Atlas](https://www.mongodb.com/atlas) (database)

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) and npm
- A [MongoDB Atlas](https://www.mongodb.com/atlas) database or [local MongoDB](https://www.mongodb.com/try/download/community) instance
- [TMDB API](https://developer.themoviedb.org/docs) access configured for the backend

### Clone the repository

```bash
git clone https://github.com/azizulhakim31/nodePlex.git
cd nodePlex
```

Alternatively, use the repository's [GitHub page](https://github.com/azizulhakim31/nodePlex) to browse or download the source.

### Configure the backend

Create `backend/.env` with the following settings. Use the exact variable names shown, as they are read by the backend:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
JWT_EXPIRES_IN=7d
TMDB_BASE_URL=https://api.themoviedb.org/3
```

Configure any TMDB credentials required by your backend setup. Keep secrets in environment variables and never commit `.env` files.

### Install dependencies

In a terminal, install and start the backend:

```bash
cd backend
npm install
npm run dev
```

In a second terminal, install and start the frontend:

```bash
cd frontend
npm install
npm run dev
```

The backend listens on the port configured by `PORT` (5000 in the example). The frontend defaults to `http://localhost:5000/api`. To use another API base URL, create `frontend/.env` and set:

```env
VITE_API_URL=http://localhost:5000/api
```

Open the local URL printed by Vite in your browser.

## Deployment

NodePlex uses [Vercel](https://vercel.com/) for the frontend, [Render](https://render.com/) for the backend API, and [MongoDB Atlas](https://www.mongodb.com/atlas) for the database. See the [Vercel environment variable documentation](https://vercel.com/docs/environment-variables) to configure `VITE_API_URL` to point to the deployed API base URL, including the `/api` path. Configure backend secrets in [Render environment settings](https://docs.render.com/configure-environment-variables) and the database connection in [MongoDB Atlas](https://www.mongodb.com/atlas). Redeploy the frontend after changing its environment variables.

## Project structure

```text
nodePlex/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── dashboardController.js
│   │   ├── movieController.js
│   │   ├── reviewController.js
│   │   ├── userController.js
│   │   └── watchlistController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Review.js
│   │   ├── User.js
│   │   └── Watchlist.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── dashboardRoutes.js
│   │   ├── movieRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── userRoutes.js
│   │   └── watchlistRoutes.js
│   ├── services/
│   │   └── tmdbService.js
│   ├── dns-fix.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   └── movies/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .gitignore
├── LICENSE
└── README.md
```

## Security notes

- Keep `.env` files out of version control.
- Store production secrets in Render's environment settings.
- Configure production API URLs through Vercel environment variables.
- Restrict MongoDB Atlas network access to the required sources.

## License

This project is licensed under the [MIT License](./LICENSE).

## Author

Developed as a personal full-stack movie discovery project.
