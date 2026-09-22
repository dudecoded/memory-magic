import { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";

const pokemonCards = [
  {
    name: "Pikachu",
    src: "/component/pikachu.jpg",
  },
  {
    name: "Bulbasaur",
    src: "/component/Bulbasaur.jpg",
  },
  {
    name: "Charmander",
    src: "/component/charmander.jpg",
  },
  {
    name: "Psyduck",
    src: "/component/Psyduck.jpg",
  },
  {
    name: "Jigglypuff",
    src: "/component/jigglypuff.jpg",
  },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const [disabled, setDisabled] = useState(false);

  const [timeLeft, setTimeLeft] = useState(50);

  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // Shuffle cards and start a new game
  const shuffleCards = () => {
    const shuffledCards = [
      ...pokemonCards,
      ...pokemonCards,
      {
        name: "Bomb",
        src: "/component/bomb.jpg",
        special: "bomb",
      },
      {
        name: "Time",
        src: "/component/timer.avif",
        special: "time",
      },
    ]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({
        ...card,
        id: Math.random(),
        flipped: false,
        matched: false,
      }));

    setCards(shuffledCards);

    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);

    setTimeLeft(50);

    setGameStarted(true);
    setGameOver(false);
    setGameWon(false);

    setDisabled(false);
  };

  // Handle card selection
  const handleChoice = (card) => {
    if (
      disabled ||
      card.flipped ||
      card.matched ||
      gameOver ||
      gameWon
    ) {
      return;
    }

    // Flip the selected card
    setCards((currentCards) =>
      currentCards.map((item) =>
        item.id === card.id
          ? { ...item, flipped: true }
          : item
      )
    );

    if (!choiceOne) {
      setChoiceOne(card);
    } else if (!choiceTwo) {
      setChoiceTwo(card);
    }
  };

  // Compare two selected cards
  useEffect(() => {
    if (!choiceOne || !choiceTwo) {
      return;
    }

    setDisabled(true);
    setTurns((previousTurns) => previousTurns + 1);

    // Bomb card
    if (
      choiceOne.special === "bomb" ||
      choiceTwo.special === "bomb"
    ) {
      setTimeLeft((previousTime) => Math.max(0, previousTime - 10));

      setTimeout(() => {
        setCards((currentCards) =>
          currentCards.map((card) => ({
            ...card,
            flipped: false,
          }))
        );

        setChoiceOne(null);
        setChoiceTwo(null);
        setDisabled(false);
      }, 800);

      return;
    }

    // Time card
    if (
      choiceOne.special === "time" ||
      choiceTwo.special === "time"
    ) {
      setTimeLeft((previousTime) => previousTime + 10);

      setTimeout(() => {
        setCards((currentCards) =>
          currentCards.map((card) => ({
            ...card,
            flipped: false,
          }))
        );

        setChoiceOne(null);
        setChoiceTwo(null);
        setDisabled(false);
      }, 800);

      return;
    }

    // Matching Pokémon
    if (choiceOne.name === choiceTwo.name) {
      setCards((currentCards) =>
        currentCards.map((card) =>
          card.name === choiceOne.name
            ? {
                ...card,
                matched: true,
                flipped: true,
              }
            : card
        )
      );

      setChoiceOne(null);
      setChoiceTwo(null);
      setDisabled(false);
    } else {
      // Not a match
      setTimeout(() => {
        setCards((currentCards) =>
          currentCards.map((card) => ({
            ...card,
            flipped: false,
          }))
        );

        setChoiceOne(null);
        setChoiceTwo(null);
        setDisabled(false);
      }, 800);
    }
  }, [choiceOne, choiceTwo]);

  // Countdown timer
  useEffect(() => {
    if (!gameStarted || gameOver || gameWon) {
      return;
    }

    if (timeLeft <= 0) {
      setGameOver(true);
      setDisabled(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previousTime) => previousTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, timeLeft, gameOver, gameWon]);

  // Check if player won
  useEffect(() => {
    if (cards.length === 0) {
      return;
    }

    const pokemonCardsOnly = cards.filter(
      (card) => !card.special
    );

    const allMatched = pokemonCardsOnly.every(
      (card) => card.matched
    );

    if (allMatched) {
      setGameWon(true);
      setDisabled(true);
    }
  }, [cards]);

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <Sidebar onNewGame={shuffleCards} />

      {/* Main game area */}
      <main className="main-content">
        <div className="App">

          <h1>Memory Magic</h1>

          <div className="game-info">
            <div>
              Time: <strong>{timeLeft}s</strong>
            </div>

            <div>
              Moves: <strong>{turns}</strong>
            </div>
          </div>

          <button onClick={shuffleCards}>
            {gameStarted ? "New Game" : "Start Game"}
          </button>

          {gameWon && (
            <h2>🎉 You Won!</h2>
          )}

          {gameOver && (
            <h2>💣 Game Over!</h2>
          )}

          <div className="card-grid">
            {cards.map((card) => (
              <div
                className={`card ${
                  card.flipped || card.matched
                    ? "flipped"
                    : ""
                }`}
                key={card.id}
                onClick={() => handleChoice(card)}
              >
                <div className="card-inner">

                  <div className="card-front">
                    <img
                      src={card.src}
                      alt={card.name}
                    />
                  </div>

                  <div className="card-back">
                    ?
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;