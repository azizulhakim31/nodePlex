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
            <Route path='/watchlist' element={<Watchlist />} />
            <Route path='/register' element={<Register />} />
            <Route path='/signin' element={<Signin />}/>
            <Route path='/profile' element={<Profile />} />
            <Route path='/search' element={<Search />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;