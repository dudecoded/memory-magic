import { useEffect, useState } from "react";
import {
  RotateCcw,
  Trophy,
} from "lucide-react";
import "./App.css";
import Sidebar from "./components/Sidebar";

// Normal Pokémon cards
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

  // Do selected cards
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  // Cards check hone tak clicking rokta hai
  const [disabled, setDisabled] = useState(false);

  // Timer
  const [timeLeft, setTimeLeft] = useState(50);

  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // High score localStorage se load hoga
  const [highScore, setHighScore] = useState(() => {
    const savedScore = localStorage.getItem("memoryMagicHighScore");

    return savedScore ? Number(savedScore) : null;
  });

  // New game start karo
  const shuffleCards = () => {
    const normalCards = [
      ...pokemonCards,
      ...pokemonCards,
    ];

    // Special cards
    const specialCards = [
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
    ];

    // Cards shuffle + unique ID
    const shuffledCards = [
      ...normalCards,
      ...specialCards,
    ]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({
        ...card,
        id: Math.random(),
        flipped: false,
        matched: false,

        // Special card already use hui hai ya nahi
        used: false,
      }));

    setCards(shuffledCards);

    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);

    // Timer hamesha 50 se start
    setTimeLeft(50);

    setGameStarted(true);
    setGameOver(false);
    setGameWon(false);
    setDisabled(false);
  };

  // Card click hone par
  const handleChoice = (card) => {
    // Invalid clicks ignore karo
    if (
      disabled ||
      card.flipped ||
      card.matched ||
      card.used ||
      gameOver ||
      gameWon
    ) {
      return;
    }

    // Card flip karo
    setCards((currentCards) =>
      currentCards.map((item) =>
        item.id === card.id
          ? {
              ...item,
              flipped: true,
            }
          : item
      )
    );

    // Special card ko immediately used mark karo
    // taaki dobara select na ho sake
    if (card.special) {
      setCards((currentCards) =>
        currentCards.map((item) =>
          item.id === card.id
            ? {
                ...item,
                flipped: true,
                used: true,
              }
            : item
        )
      );
    }

    // First card
    if (!choiceOne) {
      setChoiceOne(card);
    }

    // Second card
    else if (!choiceTwo) {
      setChoiceTwo(card);
    }
  };

  // Do cards select hone ke baad check karo
  useEffect(() => {
    if (!choiceOne || !choiceTwo) {
      return;
    }

    setDisabled(true);

    // Har pair ek move count hoga
    setTurns((previousTurns) => previousTurns + 1);

    // Bomb card
    if (
      choiceOne.special === "bomb" ||
      choiceTwo.special === "bomb"
    ) {
      setTimeLeft((previousTime) =>
        Math.max(0, previousTime - 10)
      );

      setTimeout(() => {
        setCards((currentCards) =>
          currentCards.map((card) => {
            // Used special card ko flipped rehne do
            if (card.used) {
              return card;
            }

            return {
              ...card,
              flipped: false,
            };
          })
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
      // 50 se upar kabhi nahi jayega
      setTimeLeft((previousTime) =>
        Math.min(50, previousTime + 10)
      );

      setTimeout(() => {
        setCards((currentCards) =>
          currentCards.map((card) => {
            if (card.used) {
              return card;
            }

            return {
              ...card,
              flipped: false,
            };
          })
        );

        setChoiceOne(null);
        setChoiceTwo(null);
        setDisabled(false);
      }, 800);

      return;
    }

    // Same Pokémon mila
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
    }

    // Match nahi hua
    else {
      setTimeout(() => {
        setCards((currentCards) =>
          currentCards.map((card) => {
            // Used special cards ko hide mat karo
            if (card.used) {
              return card;
            }

            return {
              ...card,
              flipped: false,
            };
          })
        );

        setChoiceOne(null);
        setChoiceTwo(null);
        setDisabled(false);
      }, 800);
    }
  }, [choiceOne, choiceTwo]);

  // Timer
  useEffect(() => {
    if (!gameStarted || gameOver || gameWon) {
      return;
    }

    // Time khatam
    if (timeLeft <= 0) {
      setTimeLeft(0);
      setGameOver(true);
      setDisabled(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previousTime) =>
        Math.max(0, previousTime - 1)
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, timeLeft, gameOver, gameWon]);

  // Check karo game complete hua ya nahi
  useEffect(() => {
    if (cards.length === 0) {
      return;
    }

    // Sirf Pokémon cards ko check karo
    const pokemonCardsOnly = cards.filter(
      (card) => !card.special
    );

    const allMatched = pokemonCardsOnly.every(
      (card) => card.matched
    );

    if (allMatched) {
      setGameWon(true);
      setDisabled(true);

      // Current score ko high score se compare karo
      if (
        highScore === null ||
        turns < highScore
      ) {
        setHighScore(turns);
        localStorage.setItem(
          "memoryMagicHighScore",
          turns
        );
      }
    }
  }, [cards]);

  // High score button click
  const showHighScore = () => {
    if (highScore === null) {
      alert("No high score yet. Complete a game first!");
    } else {
      alert(`🏆 High Score: ${highScore} moves`);
    }
  };

  return (
    <div className="app-layout">

      <Sidebar onNewGame={shuffleCards} />

      <main className="main-content">
        <div className="App">

          {/* Main heading */}
          <div className="hero-heading">
            <p className="hero-small-text">
              POKÉMON MEMORY GAME
            </p>

            <h1>
              <span>MEMORY</span>
              <span>MAGIC</span>
            </h1>

            <p className="hero-description">
              Match. Remember. Win.
            </p>
          </div>

          {/* Timer aur moves */}
          <div className="game-info">

            <div className="game-stat">
              <span className="stat-label">
                TIME
              </span>

              <strong>
                {timeLeft}s
              </strong>
            </div>

            <div className="game-stat">
              <span className="stat-label">
                MOVES
              </span>

              <strong>
                {turns}
              </strong>
            </div>

          </div>

          {/* Game buttons */}
          <div className="game-actions">

            <button
              className="game-button new-game-button"
              onClick={shuffleCards}
            >
              <RotateCcw size={17} />

              {gameStarted
                ? "New Game"
                : "Start Game"}
            </button>

            <button
              className="game-button high-score-button"
              onClick={showHighScore}
            >
              <Trophy size={17} />

              High Score
            </button>

          </div>

          {/* Win message */}
          {gameWon && (
            <div className="game-message">
              🎉 You Won!
            </div>
          )}

          {/* Game over */}
          {gameOver && (
            <div className="game-message">
              💣 Game Over!
            </div>
          )}

          {/* Cards */}
          <div
            className="card-grid"
            style={{
              justifyContent: "center",
            }}
          >
            {cards.map((card) => (
              <div
                className={`card ${
                  card.flipped || card.matched
                    ? "flipped"
                    : ""
                } ${
                  card.used ? "used-card" : ""
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