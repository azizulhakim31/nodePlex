import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Movies from './pages/Movies';
import Watchlist from './pages/Watchlist';
import Profile from './pages/Profile';
import Navbar from './components/common/Navbar';
import Search from './pages/Search';
import MovieDetails from './pages/MovieDetails';
import Register from './pages/Register';
import Signin from './pages/Signin';
import ProtectedRoute from './components/common/ProtectedRoute';

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen">

        <Navbar />

        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/movies/:id' element={<MovieDetails />} />
            <Route path='/register' element={<Register />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/search' element={<Search />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/watchlist" element={<Watchlist />} />
            </Route>

          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;