import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Game from './Game/Game.jsx';
import NotFound from './NotFound';
import Home from './Home/Home.jsx';
import Leaderboard from './leaderboard/Leaderboard.jsx'
import './index.css'

function App() {
  return (
    <Router>
      <nav className="navbar">
        <h2>Magic Match</h2>
        <div className="nav-links">
          <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
          <Link to="/" className="nav-link">Home</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:level" element={<Game />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;