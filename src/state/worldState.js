class WorldState {

    constructor() {
        this.state = {
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
        }
    }

    getState = () => {
        return Object.freeze(this.state)
    }

    resetGame = () => {
        console.log("Game Resetting...")
    
        // Reset gameState to its initial state
        Object.assign(gameState, structuredClone(this.getState()))
    
        // Clear stored state
        localStorage.setItem('gameState', JSON.stringify(gameState))
    
        // Clear UI elements dynamically (no reload needed)
        document.querySelectorAll('.player, .tail, .food').forEach(cell => {
            cell.classList.remove('player', 'tail', 'food');
        });
    
        document.body.dispatchEvent(new Event("restart"));  
    }

    loadState = () => {
        try {
            const savedState = localStorage.getItem('gameState')
            return savedState ? structuredClone(JSON.parse(savedState)) : structuredClone(this.getState())
        } catch (e) {
            console.warn("Corrupted game state detected. Resetting...")
            return structuredClone(this.getState())
        }
    };

    saveState = () => {
        if (!gameState) return
        localStorage.setItem('gameState', JSON.stringify(gameState))
    };
}



const worldState = new WorldState()
let gameState = worldState.loadState()
let resetGame = worldState.resetGame()
let saveState = worldState.saveState()

export { gameState, resetGame, saveState }