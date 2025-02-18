import { useState, useEffect, useRef } from 'react'
import SingleCard from '../singlecard/SingleCard'
import { useParams } from 'react-router-dom'
import './Game.css'
import Stopwatch from './Stopwatch'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'

const allCards = [
  { src: '/assets/BearEmoji.jpg', matched: false },
  { src: '/assets/CatEmoji.jpg', matched: false },
  { src: '/assets/CowEmoji.jpg', matched: false },
  { src: '/assets/FoxEmoji.jpg', matched: false },
  { src: '/assets/HamsterEmoji.jpg', matched: false },
  { src: '/assets/TigerEmoji.jpg', matched: false },
  { src: '/assets/PolarBearEmoji.jpg', matched: false },
  { src: '/assets/LionEmoji.jpg', matched: false },
  { src: '/assets/PandaEmoji.jpg', matched: false },
  { src: '/assets/RabbitEmoji.jpg', matched: false }
];

function Game() {
  const stopwatchRef = useRef(null);
  const { level } = useParams();
  const numCards = () => {
    switch (level) {
      case 'easy':
        return 6;
      case 'medium':
        return 8;
      case 'hard':
        return 10;
    }
  };
  const selectedCards = allCards.slice(0, numCards());
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [finalTime, setFinalTime] = useState(0);
  const { width, height } = useWindowSize()

  const shuffleCards = () => {
    const shuffledCards = [...selectedCards, ...selectedCards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random(), matched: false }));

    setCards(shuffledCards);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    setGameStart(true);
    setGameOver(false);
    setFinalTime(0);

    if (stopwatchRef?.current) {
      stopwatchRef?.current.resetTime();
    }
  };

  const shuffleWithoutReset = () => {
    setCards((prevCards) =>
      [...prevCards].sort(() => Math.random() - 0.5)
    );
  };

  const handleChoice = (card) => {
    if (!gameOver) {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
  };

  function resetTurn() {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.matched)) {
      if (stopwatchRef.current) {
        setFinalTime(stopwatchRef.current.time);
      }
      setGameStart(false);
      setGameOver(true);
    }
  }, [cards]);

  useEffect(() => {
    if (gameOver && finalTime > 0) {
      const saveScore = () => {
        const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
        const playerName = localStorage.getItem("playerName") || "Guest"
        const newEntry = { name: playerName, level, time: finalTime };
        leaderboard.push(newEntry);
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard))
      };

      saveScore();
    }
  }, [gameOver, finalTime]);

  useEffect(() => shuffleCards, [])

  return (
    <div className="game-container">
      {gameOver && <Confetti width={width} height={height} />}
      <div className="game">
        <div className={`card-grid ${level}`}>
          {cards.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
      </div>

      <div className="sidebar">
        <div className="button-container">
          <button className="newgame-btn" onClick={shuffleCards}>
            New Game
          </button>
          {turns >= 1 && (
            <button className="shuffle-btn" onClick={shuffleWithoutReset}>
              Shuffle
            </button>
          )}
        </div>
        <p>{turns > 0 && `Turns: ${turns}`}</p>
        <Stopwatch ref={stopwatchRef} gameStart={gameStart} gameOver={gameOver} setFinalTime={setFinalTime} />
        {gameOver && <p className="game-over">Game Over! You Won! 🥳</p>}
      </div>
    </div>
  );
}

export default Game;