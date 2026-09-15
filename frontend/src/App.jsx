import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Movies from './pages/Movies';
import Watchlist from './pages/Watchlist';
import Profile from './pages/Profile';
import Navbar from './components/common/Navbar';

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen">

        <Navbar />

        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/watchlist' element={<Watchlist />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;