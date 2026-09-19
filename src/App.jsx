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

  // Pehla selected card
  const [choiceOne, setChoiceOne] = useState(null)

  // Doosra selected card
  const [choiceTwo, setChoiceTwo] = useState(null)

  // Jab 2 cards check ho rahe hain tab click rokna
  const [disabled, setDisabled] = useState(false)

  // Timer 50 seconds se start hoga
  const [timeLeft, setTimeLeft] = useState(50)

  // Game start hua hai ya nahi
  const [gameStarted, setGameStarted] = useState(false)

  // Game over hua ya nahi
  const [gameOver, setGameOver] = useState(false)

  // Game jeeta ya nahi
  const [gameWon, setGameWon] = useState(false)


  
  // SHUFFLE / NEW GAME


  const shuffleCards = () => {

    // Pokémon ko duplicate karke pairs bana rahe hain
    const pokemonPairs = [...pokemonCards, ...pokemonCards]

    // Bomb aur Time sirf ek-ek baar
    const newDeck = [...pokemonPairs, ...specialCards]

    // Cards shuffle kar rahe hain
    const shuffledCards = newDeck
      .sort(() => Math.random() - 0.5)
      .map((card) => ({
        ...card,

        // Har card ki unique ID
        id: Math.random(),

        // Starting mein card closed hai
        flipped: false,

        // Starting mein koi pair matched nahi hai
        matched: false
      }))

    setCards(shuffledCards)

    // Sab kuch reset
    setTurns(0)
    setChoiceOne(null)
    setChoiceTwo(null)
    setDisabled(false)

    // Timer reset
    setTimeLeft(50)

    setGameStarted(true)
    setGameOver(false)
    setGameWon(false)
  }


 
  // CARD CLICK


  const handleChoice = (card) => {

    // Agar cards check ho rahe hain
    // toh koi aur card click nahi kar sakte
    if (disabled) return

    // Agar game over ya won hai
    // toh card click nahi kar sakte
    if (gameOver || gameWon) return

    // Agar card already open hai
    // toh usko dobara click nahi karna
    if (card.flipped || card.matched) return


    // Card ko flip karo
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


    // Agar first card abhi select nahi hua
    if (choiceOne === null) {

      setChoiceOne(card)

    }

    // Agar first card already selected hai
    else if (choiceTwo === null) {

      setChoiceTwo(card)

    }
  }



  // CHECK TWO CARDS


  useEffect(() => {

    // Jab tak dono cards select nahi hue
    // tab tak yahan se return
    if (choiceOne === null || choiceTwo === null) {
      return
    }

    // Ab player ko aur cards click nahi karne denge
    setDisabled(true)

    // Ek move complete hua
    setTurns((prevTurns) => prevTurns + 1)


    
    // BOMB


    if (choiceOne.type === "bomb" || choiceTwo.type === "bomb") {

      // Bomb kis card mein hai wo find karo
      const bombCard =
        choiceOne.type === "bomb" ? choiceOne : choiceTwo

      // 10 seconds minus
      setTimeLeft((time) => Math.max(0, time - 10))

      // Bomb ko thodi der dikhne do
      setTimeout(() => {

        setCards((currentCards) => {

          return currentCards.map((card) => {

            if (card.id === bombCard.id) {

              return {
                ...card,
                flipped: false
              }

            }

            // Agar doosra card Pokémon tha
            // usko bhi face-down kar do
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

        // Choices clear
        setChoiceOne(null)
        setChoiceTwo(null)

        // Ab cards dobara click kar sakte hain
        setDisabled(false)

      }, 1000)

      return
    }


    // TIME CARD


    if (choiceOne.type === "time" || choiceTwo.type === "time") {

      // Time card find karo
      const timeCard =
        choiceOne.type === "time" ? choiceOne : choiceTwo

      // 10 seconds add
      setTimeLeft((time) => time + 10)

      setTimeout(() => {

        setCards((currentCards) => {

          return currentCards.map((card) => {

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

        setChoiceOne(null)
        setChoiceTwo(null)
        setDisabled(false)

      }, 1000)

      return
    }


  
    // NORMAL POKEMON MATCH


    if (choiceOne.name === choiceTwo.name) {

      // Dono cards same Pokémon hain
      // isliye unko matched bana do
      setCards((currentCards) => {

        return currentCards.map((card) => {

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


      // Selection clear
      setTimeout(() => {

        setChoiceOne(null)
        setChoiceTwo(null)
        setDisabled(false)

      }, 500)

    }


 
    // WRONG MATCH
  

    else {

      // 1 second tak cards visible rahenge
      setTimeout(() => {

        setCards((currentCards) => {

          return currentCards.map((card) => {

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

        // Selection clear
        setChoiceOne(null)
        setChoiceTwo(null)

        // Ab next cards choose kar sakte hain
        setDisabled(false)

      }, 1000)
    }

  }, [choiceOne, choiceTwo])


  // TIMER


  useEffect(() => {

    // Game start nahi hua toh timer mat chalao
    if (!gameStarted) {
      return
    }

    // Game over/win hone par timer stop
    if (gameOver || gameWon) {
      return
    }

    // Time khatam
    if (timeLeft <= 0) {

      setTimeLeft(0)
      setGameOver(true)
      setDisabled(true)

      return
    }


    // Har 1 second mein 1 second kam
    const timer = setInterval(() => {

      setTimeLeft((time) => time - 1)

    }, 1000)


    // Purana timer remove karo
    return () => clearInterval(timer)

  }, [gameStarted, timeLeft, gameOver, gameWon])



  // CHECK WIN


  useEffect(() => {

    // Game start hone se pehle check nahi karna
    if (cards.length === 0) {
      return
    }

    // Sirf Pokémon cards check karenge
    const pokemonOnly = cards.filter(
      (card) => card.type === "pokemon"
    )

    // Check karo kya saare Pokémon matched hain
    const allMatched = pokemonOnly.every(
      (card) => card.matched
    )

    if (allMatched) {

      setGameWon(true)
      setDisabled(true)

    }

  }, [cards])


    // DISPLAY
  

  return (
    <div className="App">

      <h1>Memory magic</h1>


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
  )
}

export default App