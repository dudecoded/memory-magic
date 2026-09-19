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

  // Isme poore game ke saare cards store honge
  const [cards, setCards] = useState([])

  // Player ne kitni baar do cards select kiye
  const [turns, setTurns] = useState(0)

  // Pehla selected card yahan store hoga
  const [choiceOne, setChoiceOne] = useState(null)

  // Doosra selected card yahan store hoga
  const [choiceTwo, setChoiceTwo] = useState(null)

  // Jab do cards check ho rahe hain,
  // tab naye card ko click karne se rokne ke liye
  const [disabled, setDisabled] = useState(false)

  // Game 50 seconds se start hoga
  const [timeLeft, setTimeLeft] = useState(50)

  // Ye batata hai ki game start hua hai ya nahi
  const [gameStarted, setGameStarted] = useState(false)

  // Ye batata hai ki time khatam ho gaya hai ya nahi
  const [gameOver, setGameOver] = useState(false)

  // Ye batata hai ki player ne game jeet liya hai ya nahi
  const [gameWon, setGameWon] = useState(false)


  // Jab Start Game ya New Game button dabega,
  // tab ye function poora deck dobara banayega
  const shuffleCards = () => {

    // Har Pokémon ki 2 copies banakar pair create kar rahe hain
    const pokemonPairs = [...pokemonCards, ...pokemonCards]

    // Pokémon pairs ke saath ek bomb aur ek time card add kar rahe hain
    const newDeck = [...pokemonPairs, ...specialCards]

    // Cards ko randomly shuffle kar rahe hain
    const shuffledCards = newDeck
      .sort(() => Math.random() - 0.5)
      .map((card) => ({

        // Original card ki information copy kar rahe hain
        ...card,

        // Har card ko ek unique ID de rahe hain
        // Is ID se hum identify karenge ki kaunsa card click hua
        id: Math.random(),

        // Starting mein saare cards closed rahenge
        flipped: false,

        // Starting mein koi Pokémon matched nahi hai
        matched: false,

        // Special card abhi use nahi hua hai
        // Bomb ya Time use hone ke baad ye true ho jayega
        used: false
      }))

    // Naya shuffled deck cards state mein store kar rahe hain
    setCards(shuffledCards)

    // New game ke liye moves reset
    setTurns(0)

    // Purane selected cards remove
    setChoiceOne(null)
    setChoiceTwo(null)

    // Cards ko click karne ki permission de rahe hain
    setDisabled(false)

    // Timer dobara 50 seconds se start hoga
    setTimeLeft(50)

    // Game start ho gaya
    setGameStarted(true)

    // Game over aur win dono reset
    setGameOver(false)
    setGameWon(false)
  }


  // Jab player kisi card par click karega
  const handleChoice = (card) => {

    // Agar abhi previous two cards check ho rahe hain,
    // toh naye card ko click nahi kar sakte
    if (disabled) return

    // Agar game khatam ya win ho chuka hai,
    // toh cards click nahi kar sakte
    if (gameOver || gameWon) return

    // Agar card already open hai, matched hai,
    // ya special card pehle use ho chuka hai,
    // toh usko dobara click nahi kar sakte
    if (card.flipped || card.matched || card.used) return


    // Click kiye hue card ko flipped true kar rahe hain
    // taaki uska front side dikhe
    setCards((currentCards) => {

      return currentCards.map((item) => {

        // Sirf wahi card flip hoga jiska ID clicked card ki ID ke equal hai
        if (item.id === card.id) {

          return {
            ...item,
            flipped: true
          }
        }

        // Baaki cards same rahenge
        return item
      })
    })


    // Agar pehla card select nahi hua hai,
    // toh clicked card ko first choice bana do
    if (choiceOne === null) {

      setChoiceOne(card)

    }

    // Agar first card already selected hai,
    // toh clicked card second choice banega
    else if (choiceTwo === null) {

      setChoiceTwo(card)

    }
  }


  // Jab player ne do cards select kar liye,
  // tab ye effect decide karega ki cards ka kya karna hai
  useEffect(() => {

    // Jab tak dono cards select nahi hote,
    // tab tak kuch nahi karna
    if (choiceOne === null || choiceTwo === null) {
      return
    }

    // Abhi dono selected cards check ho rahe hain,
    // isliye player ko aur card click karne se rok do
    setDisabled(true)

    // Do cards select karna ek move count hoga
    setTurns((prevTurns) => prevTurns + 1)


    // Agar dono mein se koi ek card Bomb hai
    if (choiceOne.type === "bomb" || choiceTwo.type === "bomb") {

      // Check kar rahe hain ki Bomb first card hai ya second card
      const bombCard =
        choiceOne.type === "bomb" ? choiceOne : choiceTwo

      // Bomb activate hone par 10 seconds minus honge
      setTimeLeft((time) => Math.max(0, time - 10))

      // Bomb ko 1 second tak visible rakhne ke baad
      // usko used mark karenge
      setTimeout(() => {

        setCards((currentCards) => {

          return currentCards.map((card) => {

            // Bomb card ko permanently used mark kar rahe hain
            // Iska matlab ye Bomb dobara activate nahi ho sakta
            if (card.id === bombCard.id) {

              return {
                ...card,
                flipped: false,
                used: true
              }
            }

            // Doosra selected card Pokémon ho sakta hai,
            // usko simply face-down kar denge
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

        // Purane selections clear kar rahe hain
        setChoiceOne(null)
        setChoiceTwo(null)

        // Ab player naye cards select kar sakta hai
        setDisabled(false)

      }, 1000)

      return
    }


    // Agar dono mein se koi ek card Time card hai
    if (choiceOne.type === "time" || choiceTwo.type === "time") {

      // Check kar rahe hain ki Time card first hai ya second
      const timeCard =
        choiceOne.type === "time" ? choiceOne : choiceTwo

      // Time card activate hone par 10 seconds add honge
      setTimeLeft((time) => time + 10)

      // 1 second tak card visible rahega
      setTimeout(() => {

        setCards((currentCards) => {

          return currentCards.map((card) => {

            // Time card ko used mark kar rahe hain
            // Isse player is Time card ko dobara use nahi kar sakta
            if (card.id === timeCard.id) {

              return {
                ...card,
                flipped: false,
                used: true
              }
            }

            // Doosra selected card face-down kar do
            if (card.id === choiceOne.id) {

              return {
                ...card,
                flipped: false
              }
            }

            return card
          })
        })

        // Purane selections clear
        setChoiceOne(null)
        setChoiceTwo(null)

        // Player dobara cards click kar sakta hai
        setDisabled(false)

      }, 1000)

      return
    }


    // Agar dono cards same Pokémon ke hain,
    // toh unko matched kar denge
    if (choiceOne.name === choiceTwo.name) {

      setCards((currentCards) => {

        return currentCards.map((card) => {

          // Dono selected cards ko matched true kar do
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


      // Thodi der baad selections clear karenge
      setTimeout(() => {

        setChoiceOne(null)
        setChoiceTwo(null)
        setDisabled(false)

      }, 500)

    }


    // Agar dono cards different hain
    else {

      // Cards ko 1 second tak visible rehne denge
      setTimeout(() => {

        setCards((currentCards) => {

          return currentCards.map((card) => {

            // Dono wrong cards ko dobara face-down kar do
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

        // Selected cards clear kar do
        setChoiceOne(null)
        setChoiceTwo(null)

        // Ab player naye cards select kar sakta hai
        setDisabled(false)

      }, 1000)
    }

  }, [choiceOne, choiceTwo])


  // Ye effect game ka countdown timer handle karta hai
  useEffect(() => {

    // Game start nahi hua hai,
    // toh timer start nahi hona chahiye
    if (!gameStarted) {
      return
    }

    // Agar player win ya game over kar chuka hai,
    // toh timer stop rahega
    if (gameOver || gameWon) {
      return
    }

    // Agar time 0 ho gaya,
    // toh game over kar do
    if (timeLeft <= 0) {

      setTimeLeft(0)
      setGameOver(true)

      // Game over hone ke baad cards disable kar do
      setDisabled(true)

      return
    }


    // Har 1 second mein timeLeft ko 1 se decrease karenge
    const timer = setInterval(() => {

      setTimeLeft((time) => time - 1)

    }, 1000)


    // Jab effect dobara chale ya component remove ho,
    // toh purana interval clear karna zaroori hai
    return () => clearInterval(timer)

  }, [gameStarted, timeLeft, gameOver, gameWon])


  // Ye effect check karta hai ki player ne saare Pokémon pairs match kiye ya nahi
  useEffect(() => {

    // Agar game mein cards hi nahi hain,
    // toh win check nahi karna
    if (cards.length === 0) {
      return
    }

    // Sirf Pokémon cards ko alag kar rahe hain
    // Bomb aur Time ko win condition mein include nahi karenge
    const pokemonOnly = cards.filter(
      (card) => card.type === "pokemon"
    )

    // Check kar rahe hain ki har Pokémon card matched hai ya nahi
    const allMatched = pokemonOnly.every(
      (card) => card.matched
    )

    // Agar saare Pokémon matched hain,
    // toh player win kar gaya
    if (allMatched) {

      setGameWon(true)

      // Win hone ke baad cards ko disable kar do
      setDisabled(true)
    }

  }, [cards])


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