import { useState } from 'react'
import './App.css'

const pokemonCards = [
  { src: "/component/pikachu.jpg", type: "pokemon", name: "pikachu" },
  { src: "/component/bulbasaur.jpg", type: "pokemon", name: "bulbasaur" },
  { src: "/component/charmander.jpg", type: "pokemon", name: "charmander" },
  { src: "/component/psyduck.jpg", type: "pokemon", name: "psyduck" },
  { src: "/component/jigglypuff.jpg", type: "pokemon", name: "jigglypuff" },
]

const specialCards = [
  { src: "/component/bomb.jpg", type: "bomb", name: "bomb" },
  { src: "/component/timer.avif", type: "time", name: "time" },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  // Shuffle cards
  const shuffleCards = () => {

    // Duplicate only Pokémon cards
    const pokemonPairs = [...pokemonCards, ...pokemonCards]

    // Add Bomb and Time only once
    const newDeck = [...pokemonPairs, ...specialCards]

    // Shuffle the complete deck
    const shuffledCards = newDeck
      .sort(() => Math.random() - 0.5)
      .map((card) => ({
        ...card,
        id: Math.random()
      }))

    setCards(shuffledCards)
    setTurns(0)
  }

  console.log(cards, turns)

  return (
    <div className="App">
      <h1>Memory Blast</h1>

      <button onClick={shuffleCards}>
        New Game
      </button>
    </div>
  )
}

export default App