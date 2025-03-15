const DEFAULT_STATE = Object.freeze({
    rows: 10,
    cols: 20,
    maxFood: 4,
    xPrev: null,
    yPrev: null,
    x: Math.floor(Math.random() * 10),
    y: Math.floor(Math.random() * 20),
    moves: Object.freeze({
        left: [0, -1],
        right: [0, +1],
        up: [-1, 0],
        down: [+1, 0]
    }),
    moveDirection: [0, 0],
    moveDirectionName: null,
    food: [],
    tail: []
});

const resetGame = () => {
    console.log("Game Resetting...")
    
    // Reset gameState to its initial state
    Object.assign(gameState, structuredClone(DEFAULT_STATE))

    // Clear stored state
    localStorage.setItem('gameState', JSON.stringify(gameState))

    // Clear UI elements dynamically (no reload needed)
    document.querySelectorAll('.player, .tail, .food').forEach(cell => {
        cell.classList.remove('player', 'tail', 'food');
    });

    document.body.dispatchEvent(new Event("restart"));
};

const loadState = () => {
    try {
        const savedState = localStorage.getItem('gameState')
        return savedState ? structuredClone(JSON.parse(savedState)) : structuredClone(DEFAULT_STATE)
    } catch (e) {
        console.warn("Corrupted game state detected. Resetting...")
        return structuredClone(DEFAULT_STATE)
    }
};

const saveState = () => {
    if (!gameState) return
    localStorage.setItem('gameState', JSON.stringify(gameState))
};

let gameState = loadState()

export { gameState, resetGame, saveState }