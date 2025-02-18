import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = document.forms['homeForm'];
    const name = form.name.value;
    const level = form.level.value;

    if (!name) {
      alert('Please enter valid details');
      return;

    }

    const formattedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    localStorage.setItem("playerName", formattedName);

    navigate(`/game/${level}`);
  };

  return (
    <div className="home-container">
      <div className="content">
        <form name="homeForm" onSubmit={handleSubmit} className="form-container">
          <label>Name:</label>
          <input type="text" name="name" required maxLength={25} placeholder="Enter your name" />

          <label>Difficulty Level:</label>
          <select name="level">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <div className="button-group">
            <button type="submit" className="submit-btn">Start</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;