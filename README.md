# 🐍 JavaScript Snake Game

A **vanilla JavaScript** implementation of the classic **Snake Game**, featuring modular architecture, persistent game state, and dynamic grid rendering.

## 🚀 Features
- 🕹 **Arrow Key Controls**: Move the snake with **Arrow Keys**.
- 💾 **State Persistence**: Saves progress using `localStorage`.
- 🟢 **Dynamic Grid Creation**: No hardcoded HTML elements.
- 🛑 **Tail Collision Detection**: Ends the game if the snake bites itself.
- 🍏 **Random Food Spawning**: Food appears in an unoccupied space.
- 🎯 **Edge Wrapping**: Snake moves from one side to the other.
- 🔁 **Restart Without Page Reload**: Game resets dynamically without refreshing.

## 📂 Project Structure
```
📦 Snake-Game
├── 📜 index.html          # Main HTML file
├── 🎨 src/
│   ├── 📝 defaultState.js # Manages game state and persistence
│   ├── 🕹 eventListeners.js # Handles keyboard and restart events
│   ├── 🐍 playerBehavior.js # Handles movement, food, and tail logic
│   ├── 🌍 world.js         # Creates and renders the game grid
│   ├── 🎮 main.js          # Bootstrap script, initializes the game
│   ├── 🎨 style.css        # Game styling
```

## 🎮 How to Play
1. **Start the Game**: The game automatically begins on page load.
2. **Move the Snake**: Use `Arrow Keys` to move.
3. **Eat the Food**: Grow by consuming food (`red blocks`).
4. **Avoid Your Tail**: The game ends if you collide with yourself.
5. **Restart the Game**: Click the `Restart Game` button.

## 📜 Installation
Clone this repository and run it locally.
```bash
git clone https://github.com/yourusername/snake-game.git
cd snake-game
open index.html
```

## 🛠 Customization
### 🔹 Change Grid Size
Modify `defaultState.js`:
```js
const DEFAULT_STATE = {
    rows: 15, // Change to your desired row count
    cols: 30, // Change to your desired column count
};
```

### 🔹 Change Game Speed
Modify `main.js`:
```js
const startGameLoop = () => {
    gameInterval = setInterval(() => {
        movePlayer(gameState.moveDirectionName);
    }, 150); // Adjust for speed (Lower = Faster)
};
```

## 🤖 Future Improvements
- **[ ] Score System** 🏆
- **[ ] Sound Effects** 🔊
- **[ ] Mobile Touch Support** 📱
- **[ ] Multiplayer Mode** 🎮

## 📄 License
This project is licensed under the **MIT License**.

🚀 Built with **JavaScript, HTML, and CSS**. Enjoy coding! 🐍

