import { useState, useEffect } from "react";
import "./Leaderboard.css";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [sortType, setSortType] = useState('time');
  const sortArray = type => {
    console.log("Type", type)
    const newLeaderboard = [...leaderboard]
    if (type === "name") {
      const sortByName = newLeaderboard.sort((a, b) => {
        if (a.name < b.name) return -1
        else if (a.name > b.name) return 1
        else return 0;
      }
      )
      console.log("After Sorting: ", sortByName)
      setLeaderboard([...sortByName])
    }
    else if (type === "level") {
      const sortByLevel = newLeaderboard.sort((a, b) => {
        if (a.level < b.level) return -1
        else if (a.level > b.level) return 1
        else return 0;
      }
      )
      setLeaderboard([...sortByLevel])
      console.log("After Sorting: ", sortByLevel)
    }
    else {
      const sortedScores = newLeaderboard.sort((a, b) => a.time - b.time);
      setLeaderboard([...sortedScores])
      console.log("After Sorting: ", sortedScores)
    }
  };

  useEffect(() => {
    sortArray(sortType)
  }, [sortType])

  useEffect(() => {
    console.log("Soritnf Result: ", leaderboard)
  }, [leaderboard])

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem("leaderboard")) || [];
    const sortedScores = storedScores.sort((a, b) => a.time - b.time);
    console.log("Sorted Scores initial: ", sortedScores)
    setLeaderboard(sortedScores);
  }, []);

  return (
    <div className="leaderboard">
      <h1>Leaderboard 🏆</h1>
      <div className="sort-section">
        <label>Sort By:</label>
        <select onChange={(e) => setSortType(e.target.value)}>
          <option value="time">Time</option>
          <option value="name">Name</option>
          <option value="level">Level</option>
        </select>
      </div>
      {leaderboard.length === 0 ? (
        <p>No scores yet. Start playing!</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Level</th>
              <th>Time (s)</th>
            </tr>
          </thead>
          <tbody>
            {
              leaderboard?.map((entry, index) => (
                <tr key={index} id={index}>
                  <td>{index + 1}</td>
                  <td>{entry?.name}</td>
                  <td>{entry?.level?.charAt(0).toUpperCase() + entry?.level?.slice(1)}</td>
                  <td>{entry?.time}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;
