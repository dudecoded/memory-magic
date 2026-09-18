import { useState, useEffect } from 'react'
import './App.css'

const pokemonCards = [
  { src: "/component/pikachu.jpg", type: "pokemon", name: "pikachu" },
  { src: "/component/Bulbasaur.jpg", type: "pokemon", name: "bulbasaur" },
  { src: "/component/charmander.jpg", type: "pokemon", name: "charmander" },
  { src: "/component/Psyduck.jpg", type: "pokemon", name: "psyduck" },
  { src: "/component/jigglypuff.jpg", type: "pokemon", name: "jigglypuff" },
]

const specialCards = [
  { src: "/component/bomb.jpg", type: "bomb", name: "bomb" },
  { src: "/component/timer.avif", type: "time", name: "time" },
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  // Ye store karega ki player ne pehla card kaunsa select kiya
  const [choiceOne, setChoiceOne] = useState(null)

  // Ye store karega ki player ne doosra card kaunsa select kiya
  const [choiceTwo, setChoiceTwo] = useState(null)

  // Jab 2 cards check ho rahe honge tab clicking ko rokne ke liye
  const [disabled, setDisabled] = useState(false)

  // Game 50 seconds se start hoga
  const [timeLeft, setTimeLeft] = useState(50)

  // Game start hua hai ya nahi
  const [gameStarted, setGameStarted] = useState(false)

  // Game khatam hua ya nahi
  const [gameOver, setGameOver] = useState(false)

  // Player jeeta ya nahi
  const [gameWon, setGameWon] = useState(false)


  // =========================
  // SHUFFLE CARDS
  // =========================

  const shuffleCards = () => {

    // Sirf Pokémon cards ko duplicate karenge
    // Isse 5 pairs = 10 Pokémon cards milenge
    const pokemonPairs = [...pokemonCards, ...pokemonCards]

    // Ab Bomb aur Time ko sirf ek-ek baar add karenge
    // Total = 10 Pokémon + Bomb + Time = 12 cards
    const newDeck = [...pokemonPairs, ...specialCards]

    // Cards ko shuffle kar rahe hain
    const shuffledCards = newDeck
      .sort(() => Math.random() - 0.5)
      .map((card) => ({
        ...card,

        // Har card ko unique ID denge
        id: Math.random(),

        // Starting mein saare cards face-down honge
        flipped: false,

        // Starting mein koi card matched nahi hai
        matched: false
      }))

    // Shuffled cards ko state mein store karna
    setCards(shuffledCards)

    // Moves ko 0 se start karna
    setTurns(0)

    // Purani choices reset karna
    setChoiceOne(null)
    setChoiceTwo(null)

    // Cards ko click karne dena
    setDisabled(false)

    // Timer ko 50 seconds par reset karna
    setTimeLeft(50)

    // Game start ho gaya
    setGameStarted(true)

    // Game over/win ko reset karna
    setGameOver(false)
    setGameWon(false)
  }


  // =========================
  // CARD CLICK
  // =========================

  const handleChoice = (card) => {

    // Agar cards check ho rahe hain
    // toh user ko click nahi karne denge
    if (disabled) return

    // Agar card already flip hai
    // toh usko dobara click nahi kar sakte
    if (card.flipped) return

    // Agar card already match ho chuka hai
    // toh usko dobara click nahi kar sakte
    if (card.matched) return

    // Selected card ko flip karna
    setCards((currentCards) => {

      return currentCards.map((item) => {

        if (item.id === card.id) {
          return {
            ...item,
            flipped: true
          }
        }

        return item
      })
    })


    // Agar pehla card select nahi hua hai
    // toh current card ko first choice bana do
    if (!choiceOne) {
      setChoiceOne(card)
    }

    // Agar pehla card already select hai
    // toh current card ko second choice bana do
    else {
      setChoiceTwo(card)
    }
  }


  // =========================
  // CHECK CARDS
  // =========================

  useEffect(() => {

    // Jab tak dono cards select nahi hote
    // tab tak kuch nahi karna
    if (!choiceOne || !choiceTwo) {
      return
    }

    // Ab temporarily clicking disable kar do
    setDisabled(true)

    // 2 cards select karna = 1 move
    setTurns((prevTurns) => prevTurns + 1)


    // =========================
    // AGAR FIRST CARD BOMB HAI
    // =========================

    if (choiceOne.type === "bomb") {

      // 10 seconds kam kar do
      setTimeLeft((time) => Math.max(0, time - 10))

      // Thoda time bomb ko dikhane ke liye
      setTimeout(() => {

        setCards((currentCards) => {

          return currentCards.map((card) => {

            // Bomb card ko face-down kar do
            if (card.id === choiceOne.id) {
              return {
                ...card,
                flipped: false
              }
            }

            return card
          })

        })

        // Choices reset
        setChoiceOne(null)
        setChoiceTwo(null)

        // Dobara clicking allow
        setDisabled(false)

      }, 1000)

      return
    }


    // =========================
    // AGAR SECOND CARD BOMB HAI
    // =========================

    if (choiceTwo.type === "bomb") {

      // 10 seconds kam kar do
      setTimeLeft((time) => Math.max(0, time - 10))

      setTimeout(() => {

        setCards((currentCards) => {

          return currentCards.map((card) => {

            if (card.id === choiceTwo.id) {
              return {
                ...card,
                flipped: false
              }
            }

            return card
          })

        })

        setChoiceOne(null)
        setChoiceTwo(null)
        setDisabled(false)

      }, 1000)

      return
    }


    // =========================
    // AGAR FIRST CARD TIME HAI
    // =========================

    if (choiceOne.type === "time") {

      // 10 seconds add kar do
      setTimeLeft((time) => time + 10)

      setTimeout(() => {

        setCards((currentCards) => {

          return currentCards.map((card) => {

            if (card.id === choiceOne.id) {
              return {
                ...card,
                flipped: false
              }
            }

            return card
          })

        })

        setChoiceOne(null)
        setChoiceTwo(null)
        setDisabled(false)

      }, 1000)

      return
    }


    // =========================
    // AGAR SECOND CARD TIME HAI
    // =========================

    if (choiceTwo.type === "time") {

      // 10 seconds add kar do
      setTimeLeft((time) => time + 10)

      setTimeout(() => {

        setCards((currentCards) => {

          return currentCards.map((card) => {

            if (card.id === choiceTwo.id) {
              return {
                ...card,
                flipped: false
              }
            }

            return card
          })

        })

        setChoiceOne(null)
        setChoiceTwo(null)
        setDisabled(false)

      }, 1000)

      return
    }


    // =========================
    // NORMAL POKEMON MATCH
    // =========================

    // Dono cards ka name same hai
    // toh ye matching pair hai
    if (choiceOne.name === choiceTwo.name) {

      setCards((currentCards) => {

        return currentCards.map((card) => {

          // Dono matching cards ko matched bana do
          if (
            card.id === choiceOne.id ||
            card.id === choiceTwo.id
          ) {

            return {
              ...card,
              matched: true
            }

          }

          return card
        })

      })


      // Choices reset
      setTimeout(() => {

        setChoiceOne(null)
        setChoiceTwo(null)

        // Dobara click karne dena
        setDisabled(false)

      }, 500)

    }


    // =========================
    // NO MATCH
    // =========================

    else {

      // 1 second tak dono cards visible rahenge
      setTimeout(() => {

        setCards((currentCards) => {

          return currentCards.map((card) => {

            // Dono selected cards ko face-down kar do
            if (
              card.id === choiceOne.id ||
              card.id === choiceTwo.id
            ) {

              return {
                ...card,
                flipped: false
              }

            }

            return card
          })

        })


        // Choices reset
        setChoiceOne(null)
        setChoiceTwo(null)

        // Dobara cards click karne dena
        setDisabled(false)

      }, 1000)

    }

  }, [choiceOne, choiceTwo])


  // =========================
  // TIMER
  // =========================

  useEffect(() => {

    // Game start nahi hua toh timer mat chalao
    if (!gameStarted) {
      return
    }

    // Agar game already over ya won hai
    // toh timer stop rahega
    if (gameOver || gameWon) {
      return
    }

    // Agar time 0 ho gaya
    // toh game over
    if (timeLeft <= 0) {
      setGameOver(true)
      setDisabled(true)
      return
    }

    // Har 1 second mein time ko 1 kam karo
    const timer = setInterval(() => {

      setTimeLeft((time) => time - 1)

    }, 1000)


    // Purana timer remove kar do
    // warna multiple timers chalne lagenge
    return () => clearInterval(timer)

  }, [gameStarted, timeLeft, gameOver, gameWon])


  // =========================
  // CHECK WIN
  // =========================

  useEffect(() => {

    // Agar game start hi nahi hua
    // toh win check nahi karna
    if (cards.length === 0) {
      return
    }

    // Sirf Pokémon cards ko check kar rahe hain
    // Bomb aur Time pair nahi hain
    const allMatched = cards
      .filter((card) => card.type === "pokemon")
      .every((card) => card.matched)


    // Agar saare 10 Pokémon cards matched hain
    // toh player win kar gaya
    if (allMatched) {

      setGameWon(true)
      setDisabled(true)

    }

  }, [cards])


  // =========================
  // DISPLAY
  // =========================

  return (
    <div className="App">

      <h1>Memory magic</h1>


      {/* Timer aur moves */}

      <div className="game-info">

        <div>
          Time: <strong>{timeLeft}s</strong>
        </div>

        <div>
          Moves: <strong>{turns}</strong>
        </div>

      </div>


      {/* New Game button */}

      <button onClick={shuffleCards}>
        {gameStarted ? "New Game" : "Start Game"}
      </button>


      {/* Win message */}

      {gameWon && (
        <h2>
          🎉 You Won!
        </h2>
      )}


      {/* Game over message */}

      {gameOver && (
        <h2>
          💣 Game Over!
        </h2>
      )}


      {/* Cards */}

      <div className="card-grid">

        {cards.map((card) => (

          <div
            className={`card ${
              card.flipped || card.matched ? "flipped" : ""
            }`}
            key={card.id}
            onClick={() => handleChoice(card)}
          >

            <div className="card-inner">


              {/* Card ka front/image */}

              <div className="card-front">

                <img
                  src={card.src}
                  alt={card.name}
                />

              </div>


              {/* Card ka back */}

              <div className="card-back">
                ?
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

export default App