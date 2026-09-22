# 🧠 Memory Magic

A Pokémon-themed memory matching game built with **React** and **Vite**.

🔗 **Live Demo:** https://memory-magic-sage.vercel.app/

## 🎮 About the Project

Memory Magic is a browser-based memory card game where the player matches pairs of Pokémon cards before the timer runs out.

The project was built to practice React fundamentals such as:

- Components
- `useState`
- `useEffect`
- Event handling
- Conditional rendering
- Array methods
- Local Storage
- CSS animations and responsive layouts

## ✨ Features

- 🃏 Pokémon memory matching game
- ⏱️ 50-second countdown timer
- 💣 Bomb card — removes 10 seconds
- ⏰ Time card — adds 10 seconds
- 🔒 Bomb and Time cards can only be used once per game
- 🏆 High score system
- 💾 High score saved using `localStorage`
- 🔄 New Game button
- 🎉 Win and Game Over states
- 📱 Responsive card layout
- 🎨 Pokémon-inspired dark UI
- 📌 Sidebar navigation
- ⚡ Built with React and Vite

## 🕹️ How to Play

1. Start a new game.
2. Click two cards to reveal them.
3. Try to find matching Pokémon pairs.
4. Matching cards remain revealed.
5. Non-matching cards flip back.
6. Use the special cards carefully:
   - **Bomb:** decreases the timer by 10 seconds.
   - **Time:** increases the timer by 10 seconds, up to a maximum of 50 seconds.
7. Match all Pokémon pairs before the timer reaches zero.
8. Complete the game using as few moves as possible to improve your high score.

## 🏆 High Score

The high score is based on the **fewest moves used to complete a game**.

The score is stored in the browser using:

```js
localStorage
```

This means the high score remains available even after refreshing the page.

## 🛠️ Tech Stack

- **React**
- **JavaScript**
- **Vite**
- **CSS**
- **Lucide React**
- **Local Storage**
- **Vercel** for deployment

## 📁 Project Structure

```text
memory-magic/
│
├── public/
│   └── component/
│       ├── pikachu.jpg
│       ├── Bulbasaur.jpg
│       ├── charmander.jpg
│       ├── Psyduck.jpg
│       ├── jigglypuff.jpg
│       ├── bomb.jpg
│       └── timer.avif
│
├── src/
│   ├── components/
│   │   └── Sidebar.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── package.json
└── README.md
```

## 🚀 Run Locally

Clone the repository:

```bash
git clone <your-repository-url>
```

Move into the project folder:

```bash
cd memory-magic
```

Install dependencies:

```bash
npm install
```

Install Lucide React if it is not already installed:

```bash
npm install lucide-react
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown by Vite in your browser.

## 🧩 Main React Concepts Used

### `useState`

Used to manage:

- Cards
- Moves
- Selected cards
- Timer
- Game status
- High score

### `useEffect`

Used for:

- Checking selected card pairs
- Running the countdown timer
- Checking the win condition
- Updating the high score

### Props

The sidebar receives the `shuffleCards` function from `App.jsx`:

```jsx
<Sidebar onNewGame={shuffleCards} />
```

This allows the sidebar's **New Game** option to restart the game.

### Local Storage

The high score is stored in the browser:

```js
localStorage.setItem(
  "memoryMagicHighScore",
  turns
);
```

## 🎯 Future Improvements

Possible additions for future versions:

- Multiple difficulty levels
- More Pokémon cards
- Sound effects
- Background music
- Best time leaderboard
- Player profiles
- Multiple themes
- Animated win screen
- Mobile-specific improvements
- Online leaderboard

## 👨‍💻 Author

Built as a React project to practice frontend development and interactive UI design.

## 🌐 Live Project

**Memory Magic:** https://memory-magic-sage.vercel.app/
